#!/usr/bin/env node
/**
 * ralph-auto-guide.mjs (Phase 2)
 *
 * smartdata network 자매 자동 가이드 발행 인프라.
 * Anthropic Claude API 호출 → JSON 응답 → TSX 템플릿 조립 → 파일 작성 →
 * 품질 게이트 사전 검증.
 *
 * **이 스크립트는 git/gh 작업을 직접 수행하지 않습니다.** 워크플로
 * (`.github/workflows/auto-guide-cron.yml`)가 산출 파일을 받아 브랜치
 * 생성·커밋·PR 발행을 담당. 운영자가 30분 검수 후 머지.
 *
 * 사용:
 *   ANTHROPIC_API_KEY=... node scripts/ralph-auto-guide.mjs [--dry-run]
 *   ANTHROPIC_API_KEY=... node scripts/ralph-auto-guide.mjs --topic july-vat-and-tax-withholding
 *
 * 출력 (stdout, JSON):
 *   { "status": "generated", "slug": "...", "filePath": "...", "title": "..." }
 *   { "status": "skipped", "reason": "..." }
 *   { "status": "failed", "error": "..." }
 *
 * 정책 근거:
 *  - src/app/about/page.tsx §"자동 가이드 발행 프로세스"
 *  - CLAUDE.md §"자동 가이드 발행 정책"
 *  - NETWORK 7 에이전트 합의 (2026-05-10)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateGuideContent } from './check-guide-quality.mjs';

const REPO_ROOT = process.cwd();
const SITE = 'https://calculatorhost.com';

// Claude API 모델 — Sonnet 4.6 (콘텐츠 작성 최적, Opus 대비 비용 ↓).
// 학습 컷오프는 매월 갱신되므로 세율 hallucination 위험 → 시스템 프롬프트에서
// 세율·법조항 직접 인용 금지 강제 (운영자가 SSoT 상수에서 직접 인용).
const MODEL = 'claude-sonnet-4-6';
const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

// ─────────────────────────────────────────────────────────────
// 시즌 캘린더 — ralph-seasonal-guide.mjs SEASONAL_GUIDES 와 동기 유지
// ─────────────────────────────────────────────────────────────
const SEASONAL_GUIDES = {
  1: { slug: 'january-vehicle-tax-prepayment', title: '자동차세 연납 6.4% 할인 가이드', published: true },
  2: { slug: 'february-tax-refund-tracking', title: '연말정산 환급 추적 완벽 가이드', published: true },
  3: { slug: 'march-corporate-tax', title: '법인세 신고 가이드', published: true },
  4: [
    { slug: 'april-vat-preliminary-q1', title: '부가세 1차 예정신고 가이드', published: true },
    { slug: 'april-comprehensive-property-tax-exclusion', title: '종부세 합산배제 특례', published: true },
  ],
  5: { slug: 'may-comprehensive-income-tax', title: '5월 종합소득세 신고 완벽 가이드', published: true },
  6: { slug: 'june-property-tax', title: '재산세 1차 납부 완벽 가이드', published: true },
  7: { slug: 'july-vat-and-tax-withholding', title: '7월 부가세 확정신고·연말정산 사전점검', published: false },
  8: { slug: 'august-capital-gains-tax-review', title: '양도세 절세 5가지 체크리스트', published: false },
  9: { slug: 'september-property-tax-second', title: '재산세 2차 납부 및 세대 합산 확인', published: false },
  10: { slug: 'october-vat-q3-preliminary', title: '부가세 3차 예정신고 가이드', published: false },
  11: { slug: 'november-year-end-tax-prep', title: '2026년 연말정산 완벽 준비', published: false },
  12: { slug: 'december-capital-gains-tax-deadline', title: '12월 말 양도세 비과세 조건 최종 확인', published: false },
};

// ─────────────────────────────────────────────────────────────
// 슬러그 sanitize — 영문 케밥케이스만 허용
// ─────────────────────────────────────────────────────────────
export function sanitizeSlug(input) {
  if (typeof input !== 'string') return '';
  return input
    .toLowerCase()
    .replace(/[가-힣]/g, '') // 한글 제거
    .replace(/[^a-z0-9-]+/g, '-') // 허용 외 문자를 - 로
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─────────────────────────────────────────────────────────────
// 시즌 캘린더에서 다음 미발행 토픽 선정
// 우선순위: (1) 현재 월 미발행 → (2) 미래 월 중 가장 빠른 미발행
// ─────────────────────────────────────────────────────────────
export function pickNextUnpublishedTopic(now = new Date()) {
  const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const currentMonth = koreaTime.getMonth() + 1;

  const allEntries = [];
  for (let i = 0; i < 12; i++) {
    const m = ((currentMonth - 1 + i) % 12) + 1;
    const e = SEASONAL_GUIDES[m];
    if (!e) continue;
    const guides = Array.isArray(e) ? e : [e];
    for (const g of guides) {
      const filePath = resolve(REPO_ROOT, `src/app/guide/${g.slug}/page.tsx`);
      // 캘린더상 published 또는 디스크에 이미 존재 → 스킵
      if (g.published || existsSync(filePath)) continue;
      allEntries.push({ slug: g.slug, title: g.title, month: m });
    }
  }
  return allEntries[0] ?? null;
}

// ─────────────────────────────────────────────────────────────
// 시스템 프롬프트 — 모든 호출 공통 (prompt caching 적격)
// ─────────────────────────────────────────────────────────────
export function buildSystemPrompt() {
  return `당신은 한국 calculatorhost.com (YMYL 카테고리, 금융·세금·부동산 무료 계산기 사이트) 의
시즌별 가이드 작성 보조자입니다. 운영자(김준혁, 스마트데이터샵)가 발행 전 30분
실질 검토를 수행합니다. 당신의 출력은 그 초안입니다.

# 핵심 제약 (모두 준수 — 위반 시 머지 차단)

1. **본문 길이**: 사용자에게 실질적으로 도움 되는 분량 (한국어 2,000자+).
2. **금지 표현**: 다음 어휘·표현 절대 사용 금지 — 투자 권유 / 수익 보장 / 원금 보장
   / 확정 절세 / 100% 절세 / 국내 1위 / 국내 유일 / 최고의 절세 / 절대 안전 /
   "반드시 이득" / "무조건" / "확정수익".
3. **세율·법조항 직접 인용 금지**:
   - 구체 세율 % (6%, 15%, 4.5% 등) 직접 명시 금지.
   - 법조항 § 번호 (소득세법 §55, 지방세법 §92 등) 직접 명시 금지.
   - 위 내용이 필요하면 "관련 세율은 calculatorhost 의 {계산기명} 에서 확인" 또는
     "최신 세율은 국세청 공식 자료 참조" 로 대체. 세율 수치·§번호는 운영자가 발행 전
     SSoT 상수(\`src/lib/constants/tax-rates-{year}.ts\`) 에서 직접 인용하여 추가합니다.
4. **외부 권위 링크 ≥ 2 개 의무**: 본문에 다음 도메인 화이트리스트에서 최소 2 개 인용
   (URL 형태): hometax.go.kr / nts.go.kr / moef.go.kr / wetax.go.kr / law.go.kr /
   bok.or.kr / fss.or.kr / nhis.or.kr / nps.or.kr / kosis.kr.
5. **실제 거래 예시 금액 신중**: 5,000만 원·1억 원 같은 금액은 사례·시나리오 표기로만
   사용 (실제 신고 금액으로 오해되지 않도록).

# 한국어 톤·스타일

- 중립 전문 신뢰형 (블로거 X, 공무원 X). "~합니다" / "~입니다" 위주.
- 과장·낚시성 표현 금지. 2~3 문장 단위 단락.
- "탐험"·"여정"·"흥미진진" 같은 AI 티 표현 금지.

# 출력 형식 (반드시 준수)

다음 JSON 스키마로만 응답합니다. \`\`\`json 코드펜스 안에 단일 JSON 객체.
어떤 추가 설명·인사·후기도 포함하지 마세요.

{
  "title": "...",                       // 60자 이내, "{토픽} {연도} | calculatorhost" 형식
  "description": "...",                 // 80~155자, 첫 문장에 결론
  "keywords": ["..."],                  // 4~7 개 (한국어)
  "leadParagraph": "...",               // 100~200자, 본문 도입 (data-speakable)
  "sections": [                         // 4~6 개 본문 섹션
    {
      "heading": "...",                 // h2 제목
      "paragraphs": ["...", "..."]      // 1~3 개 단락
    }
  ],
  "faq": [                              // 5~8 개 Q&A
    { "question": "...", "answer": "..." }
  ],
  "conclusion": "...",                  // 1~2 단락 마무리
  "authorityLinks": [                   // 화이트리스트 도메인만, 최소 2 개
    { "url": "https://www.hometax.go.kr/...", "label": "국세청 홈택스" }
  ]
}

# 잊지 말 것
- 자동 발행 가이드 = 초안. 운영자가 세율·§번호·금액 수동 보강.
- AI 보조 작성 표기·면책조항 footer는 스크립트 템플릿이 자동 추가하므로 본문 sections 에
  포함하지 마세요.
- JSON 외 다른 텍스트 출력 금지.`;
}

// ─────────────────────────────────────────────────────────────
// 사용자 프롬프트 — 토픽별
// ─────────────────────────────────────────────────────────────
export function buildUserPrompt(topic) {
  const today = new Date().toISOString().slice(0, 10);
  return `다음 토픽으로 가이드 초안을 작성하세요.

- 슬러그(URL): /guide/${topic.slug}/
- 제목 가이드라인: ${topic.title}
- 대상 월: ${topic.month}월 (시즌별)
- 작성일(dateModified 용): ${today}
- 사이트 컨텍스트: 한국 거주자 대상, 모바일 최적, 무료, 회원가입 불필요

위 시스템 프롬프트의 모든 제약을 준수하여 JSON 만 출력하세요.`;
}

// ─────────────────────────────────────────────────────────────
// Claude API 호출 (prompt caching 적격 — system 블록 캐시)
// ─────────────────────────────────────────────────────────────
async function callClaudeApi({ system, user }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length < 20) {
    throw new Error('ANTHROPIC_API_KEY 환경변수 미설정 또는 무효');
  }
  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: [
        {
          type: 'text',
          text: system,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '<no body>');
    throw new Error(`Claude API ${response.status}: ${errText.slice(0, 500)}`);
  }
  const data = await response.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== 'string' || text.length === 0) {
    throw new Error('Claude API 응답에 text 필드 없음');
  }
  return { text, usage: data.usage };
}

// ─────────────────────────────────────────────────────────────
// JSON 응답 추출 (코드펜스 또는 raw JSON 모두 지원)
// ─────────────────────────────────────────────────────────────
export function extractJsonFromResponse(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  return JSON.parse(raw.trim());
}

// ─────────────────────────────────────────────────────────────
// JSON → TSX 템플릿 조립
// ─────────────────────────────────────────────────────────────
export function assembleTsxFromJson(slug, json) {
  const safeSlug = sanitizeSlug(slug);
  const url = `${SITE}/guide/${safeSlug}/`;
  const datePublished = new Date().toISOString().slice(0, 10);

  // 섹션 → JSX
  const sectionsJsx = json.sections
    .map(
      (s) => `              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">${escape(s.heading)}</h2>
${s.paragraphs.map((p) => `                <p className="leading-relaxed text-text-secondary">${escape(p)}</p>`).join('\n')}
              </section>`,
    )
    .join('\n\n');

  // 권위 링크 → JSX
  const authorityJsx = json.authorityLinks
    .map(
      (l) => `                  <li>
                    <a
                      href="${escape(l.url)}"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      ${escape(l.label)}
                    </a>
                  </li>`,
    )
    .join('\n');

  // FAQ array → JS literal
  const faqJs = json.faq
    .map(
      (f) => `  {
    question: ${jsString(f.question)},
    answer: ${jsString(f.answer)},
  },`,
    )
    .join('\n');

  return `// [revenue-lever: traffic+indexing] — 자동 발행 가이드는 트래픽·색인 표면 동시 증가 (북극성 룰).
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { FaqSection } from '@/components/calculator/FaqSection';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrl } from '@/lib/network/main-backref';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = ${jsString(url)};
const DATE_PUBLISHED = ${jsString(datePublished)};
const DATE_MODIFIED = ${jsString(datePublished)};

export const metadata: Metadata = {
  title: ${jsString(json.title)},
  description:
    ${jsString(json.description)},
  keywords: ${JSON.stringify(json.keywords)},
  alternates: { canonical: URL },
  openGraph: {
    title: ${jsString(json.title)},
    description: ${jsString(json.description)},
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
${faqJs}
];

export default function GuidePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: ${jsString(json.title)} },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: ${jsString(json.title)},
    description: ${jsString(json.description)},
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ${JSON.stringify(json.keywords)},
  });
  const webPageLd = buildWebPageJsonLd({
    name: ${jsString(json.title)},
    description: ${jsString(json.description)},
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: ${jsString(json.title)} },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가이드 · ${datePublished}</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">${escape(json.title)}</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  ${escape(json.leadParagraph)}
                </p>
              </header>

${sectionsJsx}

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-2">
                <h2 className="text-2xl font-semibold text-text-primary">마무리</h2>
                <p className="leading-relaxed text-text-secondary">${escape(json.conclusion)}</p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처</h2>
                <ul className="space-y-2 text-sm">
${authorityJsx}
                </ul>
              </section>

              <ShareButtons title={${jsString(json.title)}} url={URL} />

              {/* 관련 자원 — 내부 링크 mesh (북극성 룰: 고립 페이지 차단, 토픽 클러스터 형성) */}
              <section aria-label="관련 자원" className="card space-y-2">
                <h2 className="text-lg font-semibold">관련 자원</h2>
                <ul className="space-y-1 text-sm">
                  <li>→ <Link href="/guide/" className="text-primary-600 hover:underline dark:text-primary-500">가이드 모음 (전체)</Link></li>
                  <li>→ <Link href="/glossary/" className="text-primary-600 hover:underline dark:text-primary-500">용어사전 (28개 용어)</Link></li>
                  <li>→ <Link href="/" className="text-primary-600 hover:underline dark:text-primary-500">홈 — 31개 계산기</Link></li>
                </ul>
              </section>

              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('tax')} />

              <section
                aria-label="작성 방식 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>작성 방식</strong>: 본 가이드는 Anthropic Claude AI 의 보조로 자동 초안이 생성되었으며,
                  운영자(김준혁, 스마트데이터샵)가 발행 전 법조항·세율·중복 콘텐츠를 검수하여 발행했습니다.
                  최종 검증일: ${datePublished}.
                </p>
                <p>
                  본 가이드는 참고용이며 법적 효력이 없습니다. 실제 세무·금융 처리는 세무사·국세청 등
                  공식 채널 안내를 받으시기 바랍니다. 세율·법조항 정확값은 calculatorhost 의 계산기 페이지
                  또는 국세청 공식 자료에서 최신값을 확인하세요.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
`;
}

// 안전한 JSX 텍스트 escape (간단)
function escape(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// JS 문자열 리터럴로 안전 변환
function jsString(str) {
  return JSON.stringify(typeof str === 'string' ? str : String(str ?? ''));
}

// ─────────────────────────────────────────────────────────────
// CLI entry
// ─────────────────────────────────────────────────────────────
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  (async () => {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const topicArgIdx = args.indexOf('--topic');
    const explicitSlug = topicArgIdx >= 0 ? args[topicArgIdx + 1] : null;

    let topic = null;
    if (explicitSlug) {
      // 명시 슬러그 모드 — 캘린더에서 매칭
      for (const m of Object.keys(SEASONAL_GUIDES)) {
        const e = SEASONAL_GUIDES[m];
        const guides = Array.isArray(e) ? e : [e];
        const found = guides.find((g) => g.slug === explicitSlug);
        if (found) {
          topic = { ...found, month: Number(m) };
          break;
        }
      }
      if (!topic) {
        console.log(JSON.stringify({ status: 'failed', error: `토픽 미발견: ${explicitSlug}` }));
        process.exit(1);
      }
    } else {
      topic = pickNextUnpublishedTopic();
    }

    if (!topic) {
      console.log(JSON.stringify({ status: 'skipped', reason: '미발행 시즌 토픽 없음' }));
      process.exit(0);
    }

    const filePath = resolve(REPO_ROOT, `src/app/guide/${topic.slug}/page.tsx`);
    if (existsSync(filePath)) {
      console.log(JSON.stringify({ status: 'skipped', reason: `이미 존재: ${topic.slug}` }));
      process.exit(0);
    }

    if (dryRun) {
      console.log(
        JSON.stringify({ status: 'dry-run', topic, model: MODEL, willWriteTo: filePath }, null, 2),
      );
      process.exit(0);
    }

    try {
      const system = buildSystemPrompt();
      const user = buildUserPrompt(topic);
      const { text, usage } = await callClaudeApi({ system, user });
      const json = extractJsonFromResponse(text);
      const tsx = assembleTsxFromJson(topic.slug, json);

      // 사전 품질 게이트 — RED 면 파일 생성 안 함
      const qualityResult = validateGuideContent(tsx);
      if (qualityResult.overall === 'red') {
        console.log(
          JSON.stringify(
            {
              status: 'failed',
              error: 'pre-write quality gate RED',
              failures: qualityResult.failures,
            },
            null,
            2,
          ),
        );
        process.exit(2);
      }

      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, tsx, 'utf8');

      console.log(
        JSON.stringify(
          {
            status: 'generated',
            slug: topic.slug,
            title: topic.title,
            month: topic.month,
            filePath,
            quality: qualityResult.overall,
            usage,
          },
          null,
          2,
        ),
      );
      process.exit(0);
    } catch (err) {
      console.log(JSON.stringify({ status: 'failed', error: String(err?.message ?? err) }));
      process.exit(1);
    }
  })();
}

// ─────────────────────────────────────────────────────────────
// 타입 export (테스트용)
// ─────────────────────────────────────────────────────────────
/**
 * @typedef {Object} GuideJsonResponse
 * @property {string} title
 * @property {string} description
 * @property {string[]} keywords
 * @property {string} leadParagraph
 * @property {{heading: string, paragraphs: string[]}[]} sections
 * @property {{question: string, answer: string}[]} faq
 * @property {string} conclusion
 * @property {{url: string, label: string}[]} authorityLinks
 */
