#!/usr/bin/env node
/**
 * 가이드·계산기 메타데이터 정합성 사전 검증 (CI 게이트).
 *
 * 검증 항목 (harness §4-1 자동화 가능):
 * - title 60자 이내
 * - description 80~155자
 * - keywords 5~10개
 * - canonical trailing slash
 * - JSON-LD helper 호출 확인 (가이드: Article+Breadcrumb+WebPage+FAQPage+Speakable / 계산기: 위 6종)
 *
 * 위반 시 exit 1.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractMetadataBody,
  extractQuotedField,
  extractKeywordsCount as countKeywords,
  resolveCanonical,
  displayLength,
} from './meta-parser-core.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function listFilesRecursive(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) listFilesRecursive(abs, out);
    else if (entry.isFile() && entry.name === 'page.tsx') out.push(abs);
  }
  return out;
}

// 파싱은 scripts/meta-parser-core.mjs 로 일원화 (2026-08-12 SEO 감사).
// 구 정규식은 ① 문자열 안의 다른 따옴표에서 절단(113자→6자 오판)
// ② 빌더 함수형 metadata 를 "누락" 으로 오판 하는 결함이 있었다.

export function validatePage(filePath, content) {
  const violations = [];
  const rel = path.relative(ROOT, filePath);
  const isGuide = rel.includes(path.sep + 'guide' + path.sep);
  const isCalculator = rel.includes(path.sep + 'calculator' + path.sep);

  // 정책 페이지(privacy/terms/about/contact 등)는 메타 정합성 검사 면제
  if (!isGuide && !isCalculator) return [];

  // 가이드 인덱스 페이지(/guide/page.tsx)는 카탈로그라 별도 룰 (개별 가이드 검사만)
  if (rel.endsWith(path.sep + 'guide' + path.sep + 'page.tsx')) return [];

  // noindex 페이지(임베드 위젯 등)는 SERP 표면이 아니므로 메타 길이 검사 면제.
  if (/robots\s*:\s*\{[^}]*index\s*:\s*false/.test(content)) return [];

  const { present, computed, body: metaBody } = extractMetadataBody(content);
  if (!present) {
    violations.push({ file: rel, field: 'metadata', reason: 'metadata export 누락' });
    return violations;
  }
  // 빌더 함수형(`export const metadata = buildGuideCategoryMetadata('tax')`)은
  // 정적 분석 대상이 아니다. 값은 빌더 자체의 단위 테스트로 보장.
  if (computed) return [];

  // title 60자 이내
  const title = extractQuotedField(metaBody, 'title');
  if (!title) {
    violations.push({ file: rel, field: 'title', reason: '누락' });
  } else if (displayLength(title) > 65) {
    violations.push({ file: rel, field: 'title', reason: `${displayLength(title)}자 (65자 초과)` });
  }

  // description 80~155자
  const description = extractQuotedField(metaBody, 'description');
  if (!description) {
    violations.push({ file: rel, field: 'description', reason: '누락' });
  } else if (displayLength(description) < 80) {
    violations.push({ file: rel, field: 'description', reason: `${displayLength(description)}자 (80자 미만)` });
  } else if (displayLength(description) > 160) {
    violations.push({ file: rel, field: 'description', reason: `${displayLength(description)}자 (160자 초과)` });
  }

  // canonical — 변수 참조(`canonical: URL`) 포함 해석 후 절대경로 + trailing slash 확인
  const canonical = resolveCanonical(content, metaBody);
  if (!canonical) {
    violations.push({ file: rel, field: 'canonical', reason: '누락' });
  } else if (!canonical.startsWith('https://calculatorhost.com')) {
    violations.push({ file: rel, field: 'canonical', reason: `절대 URL 아님: ${canonical}` });
  } else if (!canonical.endsWith('/')) {
    violations.push({ file: rel, field: 'canonical', reason: `trailing slash 누락: ${canonical}` });
  }

  // keywords 5~10개 (가이드만 — 계산기는 글로벌 처리 가능)
  if (isGuide) {
    const kwCount = countKeywords(metaBody);
    if (kwCount === 0) {
      violations.push({ file: rel, field: 'keywords', reason: '누락 (5~10개 의무)' });
    } else if (kwCount < 5) {
      violations.push({ file: rel, field: 'keywords', reason: `${kwCount}개 (5개 미만)` });
    } else if (kwCount > 12) {
      violations.push({ file: rel, field: 'keywords', reason: `${kwCount}개 (12개 초과 — 키워드 스터핑 위험)` });
    }
  }

  // JSON-LD helper 호출 — 가이드 필수 3종 (Article + Breadcrumb + WebPage)
  // FAQPage·Speakable은 FAQ 항목 보유 가이드에만 요구 (FAQ 없는 시즌 캘린더 등 면제)
  if (isGuide) {
    const requiredHelpers = [
      'buildArticleJsonLd',
      'buildBreadcrumbJsonLd',
      'buildWebPageJsonLd',
    ];
    for (const helper of requiredHelpers) {
      if (!content.includes(helper)) {
        violations.push({ file: rel, field: 'json-ld', reason: `${helper}() 누락` });
      }
    }
    // FAQ 보유 시 FAQPage + Speakable 의무
    const hasFaq = /FAQ_ITEMS\s*=\s*\[/.test(content) || /faqItems\s*=\s*\[/.test(content);
    if (hasFaq) {
      if (!content.includes('buildFaqPageJsonLd')) {
        violations.push({ file: rel, field: 'json-ld', reason: 'buildFaqPageJsonLd() 누락 (FAQ 보유 페이지)' });
      }
      if (!content.includes('buildSpeakableJsonLd')) {
        violations.push({ file: rel, field: 'json-ld', reason: 'buildSpeakableJsonLd() 누락 (FAQ 보유 페이지)' });
      }
    }
  }
  // 계산기 (SoftwareApplication + WebPage + Breadcrumb + FAQPage + HowTo + Speakable)
  if (isCalculator) {
    const requiredHelpers = [
      'buildSoftwareApplicationJsonLd',
      'buildBreadcrumbJsonLd',
      'buildWebPageJsonLd',
      'buildFaqPageJsonLd',
      'buildHowToJsonLd',
      'buildSpeakableJsonLd',
    ];
    for (const helper of requiredHelpers) {
      if (!content.includes(helper)) {
        violations.push({ file: rel, field: 'json-ld', reason: `${helper}() 누락` });
      }
    }
  }

  return violations;
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const targets = process.argv.slice(2);
  const files = targets.length > 0
    ? targets
    : [
        ...listFilesRecursive(path.join(ROOT, 'src', 'app', 'guide')),
        ...listFilesRecursive(path.join(ROOT, 'src', 'app', 'calculator')),
      ];

  const allViolations = [];
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, 'utf8');
    allViolations.push(...validatePage(f, content));
  }

  if (allViolations.length === 0) {
    console.log('✅ 메타데이터 + JSON-LD 정합성 PASS (검사 ' + files.length + '개)');
    process.exit(0);
  }

  console.error('❌ 메타 정합성 위반 ' + allViolations.length + '건:');
  for (const v of allViolations) {
    console.error(`  ${v.file} [${v.field}]: ${v.reason}`);
  }
  process.exit(1);
}
