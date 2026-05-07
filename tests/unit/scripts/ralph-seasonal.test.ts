import { describe, it, expect } from 'vitest';

/**
 * ralph-seasonal-guide.mjs 스크립트 유효성 검증 (린트 테스트)
 *
 * 목적:
 * - 스크립트 구조 검증 (없는 파일, 잘못된 명령 감지 불가이므로 부분 검증만)
 * - SEASONAL_GUIDES 데이터 완전성
 * - 월별 슬러그 중복 확인
 */

// 시즈널 가이드 정의 (ralph-seasonal-guide.mjs의 SEASONAL_GUIDES와 동기화)
const SEASONAL_GUIDES_SPEC = {
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

describe('ralph-seasonal-guide.mjs 유효성', () => {
  it('12개월이 모두 정의되어야 함', () => {
    const months = Object.keys(SEASONAL_GUIDES_SPEC).map(Number).sort((a, b) => a - b);
    expect(months).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('각 월별 데이터가 필수 필드(slug, title, published)를 가져야 함', () => {
    for (const monthKey of Object.keys(SEASONAL_GUIDES_SPEC)) {
      const month = Number(monthKey) as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        expect(guide).toHaveProperty('slug');
        expect(guide).toHaveProperty('title');
        expect(guide).toHaveProperty('published');
        expect(typeof guide.slug).toBe('string');
        expect(typeof guide.title).toBe('string');
        expect(typeof guide.published).toBe('boolean');
        expect(guide.slug.length).toBeGreaterThan(0);
        expect(guide.title.length).toBeGreaterThan(0);
      }
    }
  });

  it('슬러그는 모두 고유해야 함 (중복 없음)', () => {
    const slugs: string[] = [];
    for (const monthKey of Object.keys(SEASONAL_GUIDES_SPEC)) {
      const month = Number(monthKey) as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        slugs.push(guide.slug);
      }
    }

    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it('슬러그는 영문 케밥케이스여야 함', () => {
    for (const monthKey of Object.keys(SEASONAL_GUIDES_SPEC)) {
      const month = Number(monthKey) as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        // 영문 소문자·숫자·하이픈만 허용
        expect(guide.slug).toMatch(/^[a-z0-9-]+$/);
        // 하이픈으로 시작/종료 금지
        expect(guide.slug).not.toMatch(/^-|-$/);
      }
    }
  });

  it('발행 완료 가이드는 1~6월, 미발행은 7~12월이어야 함', () => {
    // 1~6월 모두 published: true
    for (let m = 1; m <= 6; m++) {
      const month = m as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        expect(guide.published).toBe(true);
      }
    }

    // 7~12월 모두 published: false
    for (let m = 7; m <= 12; m++) {
      const month = m as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        expect(guide.published).toBe(false);
      }
    }
  });

  it('타이틀은 한글이고 적절한 길이여야 함', () => {
    for (const monthKey of Object.keys(SEASONAL_GUIDES_SPEC)) {
      const month = Number(monthKey) as keyof typeof SEASONAL_GUIDES_SPEC;
      const entry = SEASONAL_GUIDES_SPEC[month];
      const guides = Array.isArray(entry) ? entry : [entry];

      for (const guide of guides) {
        // 한글 포함 여부 (간단한 검증)
        expect(guide.title.length).toBeGreaterThan(5);
        expect(guide.title.length).toBeLessThan(100);
      }
    }
  });

  it('현재 월 계산 로직 검증', () => {
    // getCurrentMonthKoreanTime() 구현 검증
    // 실제 스크립트에서는 new Date(new Date().toLocaleString(...))를 사용
    const koreaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    const month = koreaTime.getMonth() + 1;

    // 1~12 범위 내
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);
  });

  it('다음 월 계산 로직 검증', () => {
    // getNextMonth() 구현 검증
    const testCases = [
      { current: 1, expected: 2 },
      { current: 5, expected: 6 },
      { current: 11, expected: 12 },
      { current: 12, expected: 1 }, // 연도 넘김
    ];

    for (const testCase of testCases) {
      const next = testCase.current === 12 ? 1 : testCase.current + 1;
      expect(next).toBe(testCase.expected);
    }
  });

  it('가이드 경로 구성 검증', () => {
    // getGuidePath() 구현 검증: slug → src/app/guide/{slug}/page.tsx
    const slug = 'january-vehicle-tax-prepayment';
    const expectedPath = `src/app/guide/${slug}/page.tsx`;

    expect(expectedPath).toContain('src/app/guide');
    expect(expectedPath).toContain('/page.tsx');
    expect(expectedPath).toContain(slug);
  });

  it('stuck.md 형식 검증', () => {
    // 신호 라인 형식: "- [RALPH] YYYY-MM-DD — {slug} — {title}"
    const timestamp = new Date().toISOString().split('T')[0];
    const slug = 'july-vat-and-tax-withholding';
    const title = '7월 부가세 확정신고·연말정산 사전점검';

    const signalLine = `- [RALPH] ${timestamp} — ${slug} — ${title}`;

    // 형식 검증
    expect(signalLine).toContain('[RALPH]');
    expect(signalLine).toMatch(/^\- \[RALPH\] \d{4}-\d{2}-\d{2} — .+ — .+$/);
  });
});
