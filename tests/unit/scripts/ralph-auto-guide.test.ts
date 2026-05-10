// ralph-auto-guide.mjs unit tests.
// Network-free verification: prompt builders + JSON to TSX assembly.
import { describe, expect, it } from 'vitest';
import {
  buildSystemPrompt,
  buildUserPrompt,
  assembleTsxFromJson,
  sanitizeSlug,
  pickNextUnpublishedTopic,
  type GuideJsonResponse,
} from '../../../scripts/ralph-auto-guide.mjs';

describe('sanitizeSlug', () => {
  it('영문 슬러그 그대로 통과', () => {
    expect(sanitizeSlug('july-vat-and-tax-withholding')).toBe('july-vat-and-tax-withholding');
  });

  it('대문자 → 소문자', () => {
    expect(sanitizeSlug('AUGUST-Capital-Gains')).toBe('august-capital-gains');
  });

  it('공백·특수문자 제거', () => {
    expect(sanitizeSlug('foo bar / baz')).toBe('foo-bar-baz');
  });

  it('한글은 제거 (영문 슬러그 정책)', () => {
    expect(sanitizeSlug('자동차세-prepayment')).toBe('prepayment');
  });
});

describe('buildSystemPrompt: 시스템 프롬프트 의무 제약', () => {
  const prompt = buildSystemPrompt();

  it('YMYL / 자매 사이트 컨텍스트 명시', () => {
    expect(prompt).toMatch(/YMYL|calculatorhost/);
  });

  it('금지 표현 명시', () => {
    expect(prompt).toContain('투자 권유');
    expect(prompt).toContain('수익 보장');
  });

  it('세율·법조항 직접 인용 금지 명시', () => {
    expect(prompt).toMatch(/세율.*금지|법조항.*금지|§.*금지/);
  });

  it('AI 보조 표기 의무 명시', () => {
    expect(prompt).toMatch(/AI.*보조|Claude/);
  });

  it('외부 권위 링크 화이트리스트 제공', () => {
    expect(prompt).toContain('hometax.go.kr');
    expect(prompt).toContain('law.go.kr');
  });

  it('JSON 출력 스키마 명시', () => {
    expect(prompt).toContain('"title"');
    expect(prompt).toContain('"sections"');
    expect(prompt).toContain('"faq"');
  });
});

describe('buildUserPrompt: 토픽별 사용자 프롬프트', () => {
  const topic = {
    slug: 'july-vat-and-tax-withholding',
    title: '7월 부가세 확정신고·연말정산 사전점검',
    month: 7,
  };

  it('토픽 슬러그·제목 포함', () => {
    const prompt = buildUserPrompt(topic);
    expect(prompt).toContain(topic.slug);
    expect(prompt).toContain(topic.title);
  });

  it('현재 날짜 ISO 포맷 포함', () => {
    const prompt = buildUserPrompt(topic);
    expect(prompt).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});

describe('assembleTsxFromJson: JSON → TSX 템플릿', () => {
  const validJson: GuideJsonResponse = {
    title: '7월 부가세 확정신고 가이드 2026 | calculatorhost',
    description:
      '2026년 7월 부가세 확정신고를 앞둔 일반과세 개인사업자가 놓치기 쉬운 5가지 항목과 사전 점검 체크리스트를 정리합니다.',
    keywords: ['부가세', '확정신고', '7월', '2026', '개인사업자'],
    leadParagraph: '7월 1일~25일은 부가세 1기 확정신고 기간입니다. ' + '본문 내용. '.repeat(20),
    sections: [
      {
        heading: '핵심 일정',
        paragraphs: ['7월 25일까지 신고·납부 마감.', '미신고 시 가산세 부과.'],
      },
    ],
    faq: [{ question: '신고 마감일을 놓치면?', answer: '가산세가 부과됩니다.' }],
    conclusion: '본문 마무리 단락입니다.',
    authorityLinks: [
      { url: 'https://www.hometax.go.kr', label: '국세청 홈택스' },
      { url: 'https://www.nts.go.kr', label: '국세청' },
    ],
  };

  it('생성된 TSX 는 import / metadata / export default 포함', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toContain("import type { Metadata } from 'next'");
    expect(tsx).toContain('export const metadata');
    expect(tsx).toContain('export default function');
  });

  it('canonical URL 슬러그 적용', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toContain('https://calculatorhost.com/guide/july-vat-and-tax-withholding/');
  });

  it('AI 보조 작성 표기 footer 포함', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toMatch(/Claude/);
  });

  it('면책조항 footer 포함', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toMatch(/참고용|법적\s*효력/);
  });

  it('FAQPage / Article JSON-LD 포함', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toContain('buildFaqPageJsonLd');
    expect(tsx).toContain('buildArticleJsonLd');
  });

  it('권위 외부 링크 nofollow 적용', () => {
    const tsx = assembleTsxFromJson('july-vat-and-tax-withholding', validJson);
    expect(tsx).toContain('hometax.go.kr');
    expect(tsx).toMatch(/rel=["']noopener noreferrer nofollow/);
  });
});

describe('pickNextUnpublishedTopic', () => {
  it('함수가 정의됨 + 객체 또는 null 반환', () => {
    const topic = pickNextUnpublishedTopic();
    if (topic !== null) {
      expect(topic).toHaveProperty('slug');
      expect(topic).toHaveProperty('title');
      expect(topic).toHaveProperty('month');
    }
  });
});
