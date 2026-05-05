/**
 * 계산기·세율·금리 변경 이력 SSoT (Changelog)
 *
 * **이 페이지는 독자(시청자)를 위한 곳입니다.** 개발자 내부 변경사항은 절대 등재하지 않습니다.
 *
 * ── 등재 OK (사용자가 알아야 가치 있음) ──
 *   ✓ 세율·요율·금리·공제 변경 (계산 결과 직접 영향)
 *   ✓ 규제 개정 (DSR/LTV/비과세 요건 등 계산 로직 변경)
 *   ✓ 신규 계산기 출시 (사용자가 새로 쓸 수 있는 도구)
 *   ✓ 신규 기능 (비교 모드·공유 등 사용자 직접 가치)
 *   ✓ 버그 수정 (이전 결과가 잘못됐음을 알려야 할 때만)
 *
 * ── 등재 X (개발자 내부 — 사용자 가치 없음) ──
 *   ✗ JSON-LD·메타 태그·byline·구조화 데이터 추가
 *   ✗ 본문 산문 재작성·LLM 인용 친화 리라이팅
 *   ✗ UI 리팩토링·디자인 변경·다크모드·폰트
 *   ✗ 성능 최적화·번들 분할·Lighthouse 점수 개선
 *   ✗ 사이트 구조 변경(카드 그리드 → 테이블 등)
 *   ✗ 저자 정보·검수자 변경
 *   ✗ "결과 변화 없는" 산식 명시·문서 정리
 *
 * 판정 원칙: "사용자가 같은 입력으로 계산했을 때 결과가 달라지는가?"
 *   YES → 등재   NO → 제거
 *
 * 시계열 내림차순(최신이 위). 새 항목 추가 시 맨 위에 prepend.
 * - 홈페이지 §"2026 변경사항" 테이블에 7건 노출
 * - /updates 페이지에 전체 노출 (시계열 + 카테고리 필터)
 * - RSS 피드와 병행 사용 (RSS는 별도 ITEMS, 본 파일은 Changelog 전용)
 */

export type UpdateCategory = '신규' | '세율' | '규제' | '금리' | '제도' | '버그수정';

export interface UpdateEntry {
  /** 반영 계산기 (한글명 + slug, 사이트 전반이면 null) */
  calculator: { title: string; slug: string } | null;
  /** 반영 항목 (예: 소득세율, DSR 규제, 신규 추가) */
  item: string;
  /** 변경 내용 / 비고 */
  detail: string;
  /** 반영일자 (YYYY-MM-DD) */
  date: string;
  /** 분류 (필터 + 색상 태그) */
  category: UpdateCategory;
  /** 출처 링크 (선택, 법령·고시) */
  sourceUrl?: string;
}

export const UPDATES_LOG: UpdateEntry[] = [
  {
    calculator: { title: '부가가치세(VAT)', slug: 'vat' },
    item: '신규 추가',
    detail: '일반·간이·환산 3 모드 부가세 계산기 신규 공개',
    date: '2026-05-03',
    category: '신규',
  },
  {
    calculator: { title: '분할매수·분할매도', slug: 'split-buy' },
    item: '신규 추가',
    detail: '주식·코인 가중평균·BEP·실현손익 계산기 2종 공개',
    date: '2026-05-03',
    category: '신규',
  },
  {
    calculator: { title: '대출한도(DSR)', slug: 'loan-limit' },
    item: '스트레스 DSR',
    detail: '변동·혼합형·주기형 1.5%p 풀 적용 반영',
    date: '2026-04-27',
    category: '규제',
    sourceUrl: 'https://www.fss.or.kr',
  },
  {
    calculator: { title: '연봉 실수령액', slug: 'salary' },
    item: '소득세율 구간',
    detail: '8단계 누진세율(6~45%) 유지 확정 + 국세청 간이세액표 반영',
    date: '2026-04-27',
    category: '세율',
    sourceUrl: 'https://www.law.go.kr/법령/소득세법/제55조',
  },
  {
    calculator: { title: '연봉·프리랜서·N잡', slug: 'salary' },
    item: '국민연금 보험료',
    detail: '근로자 부담 4.5% 유지, 기준소득월액 상한 637만 원',
    date: '2026-04-24',
    category: '세율',
    sourceUrl: 'https://www.law.go.kr/법령/국민연금법',
  },
  {
    calculator: { title: '재산세', slug: 'property-tax' },
    item: '공정시장가액비율',
    detail: '주택 60% 유지, 1세대1주택 특례 별도 적용',
    date: '2026-04-24',
    category: '세율',
    sourceUrl: 'https://www.law.go.kr/법령/지방세법/제111조',
  },
  {
    calculator: { title: '양도소득세', slug: 'capital-gains-tax' },
    item: '1세대1주택 특례',
    detail: '비과세 요건(2년 보유·12억 이하) 유지',
    date: '2026-04-24',
    category: '제도',
    sourceUrl: 'https://www.law.go.kr/법령/소득세법/제89조',
  },
  {
    calculator: { title: '취득세', slug: 'acquisition-tax' },
    item: '취득세 세율',
    detail: '1주택 1.0~3.0%, 조정+2주택 8%, 조정+3주택↑ 12% (지방세법 §11)',
    date: '2026-04-24',
    category: '세율',
    sourceUrl: 'https://www.law.go.kr/법령/지방세법/제11조',
  },
  {
    calculator: { title: '종합부동산세', slug: 'comprehensive-property-tax' },
    item: '공제·세율',
    detail: '1세대1주택 12억 공제, 그 외 9억. 공정시장가액비율 60%',
    date: '2026-04-24',
    category: '세율',
    sourceUrl: 'https://www.law.go.kr/법령/종합부동산세법',
  },
];

/** 홈페이지 노출용 — 최근 N건 (기본 7) */
export function getRecentUpdates(limit = 7): UpdateEntry[] {
  return UPDATES_LOG.slice(0, limit);
}
