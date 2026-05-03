/**
 * 외부 권위 링크 SSoT — 정부·법령·공공기관 URL 중앙 관리
 *
 * **deep-link 우선 정책 (2026-05-03)**:
 * 외부 SEO 컨설턴트의 'deep-link' 권고에 따라, 가능한 모든 출처를
 * 홈페이지 URL이 아닌 **법령·고시·간이세액표 등 정확한 페이지**로 연결한다.
 *
 * 단, `rel`은 `noopener noreferrer nofollow` 유지 (.claude/rules/calculators.md 참조).
 *
 * URL 패턴 안정성:
 * - `https://www.law.go.kr/법령/{법령명}` — 한글 URL, 안정적 (국가법령정보센터)
 * - `https://www.law.go.kr/법령/{법령명}/제{N}조` — 조문 직링크, 안정적
 * - `https://www.law.go.kr/행정규칙/{규칙명}` — 행정규칙 직링크
 * - 기타 기관(hometax/wetax/nps/nhis 등)은 사이트 개편으로 URL이 변경될 수 있어,
 *   안정성이 검증된 stable path만 deep-link로 사용.
 */

export interface AuthorityLink {
  /** 표시명 (한글) */
  label: string;
  /** 정확한 deep-link URL (법령·조문·고시) */
  url: string;
  /** 링크의 권위 종류 */
  type?: 'law' | 'agency' | 'guide';
}

// ─── 법령 (law.go.kr Korean-URL pattern, 안정적) ────────────────────────

export const LAW_INCOME_TAX_55: AuthorityLink = {
  label: '소득세법 §55 (종합소득세 누진세율 8단계)',
  url: 'https://www.law.go.kr/법령/소득세법/제55조',
  type: 'law',
};

export const LAW_INCOME_TAX_94: AuthorityLink = {
  label: '소득세법 §94 (양도소득의 범위)',
  url: 'https://www.law.go.kr/법령/소득세법/제94조',
  type: 'law',
};

export const LAW_INCOME_TAX_104: AuthorityLink = {
  label: '소득세법 §104 (양도소득세율)',
  url: 'https://www.law.go.kr/법령/소득세법/제104조',
  type: 'law',
};

export const LAW_INCOME_TAX_89: AuthorityLink = {
  label: '소득세법 §89 (1세대1주택 비과세)',
  url: 'https://www.law.go.kr/법령/소득세법/제89조',
  type: 'law',
};

export const LAW_INCOME_TAX_12: AuthorityLink = {
  label: '소득세법 §12 (비과세 근로소득 — 식대 등)',
  url: 'https://www.law.go.kr/법령/소득세법/제12조',
  type: 'law',
};

export const LAW_INCOME_TAX_59_2: AuthorityLink = {
  label: '소득세법 §59의2 (자녀세액공제)',
  url: 'https://www.law.go.kr/법령/소득세법/제59조의2',
  type: 'law',
};

export const LAW_VAT: AuthorityLink = {
  label: '부가가치세법 (전체)',
  url: 'https://www.law.go.kr/법령/부가가치세법',
  type: 'law',
};

export const LAW_LOCAL_TAX: AuthorityLink = {
  label: '지방세법',
  url: 'https://www.law.go.kr/법령/지방세법',
  type: 'law',
};

export const LAW_LOCAL_TAX_ACQUISITION: AuthorityLink = {
  label: '지방세법 §11 (취득세 세율)',
  url: 'https://www.law.go.kr/법령/지방세법/제11조',
  type: 'law',
};

export const LAW_LOCAL_TAX_PROPERTY: AuthorityLink = {
  label: '지방세법 §111 (재산세 세율)',
  url: 'https://www.law.go.kr/법령/지방세법/제111조',
  type: 'law',
};

export const LAW_COMPREHENSIVE_PROPERTY_TAX: AuthorityLink = {
  label: '종합부동산세법',
  url: 'https://www.law.go.kr/법령/종합부동산세법',
  type: 'law',
};

export const LAW_INHERITANCE_GIFT: AuthorityLink = {
  label: '상속세 및 증여세법',
  url: 'https://www.law.go.kr/법령/상속세및증여세법',
  type: 'law',
};

export const LAW_NATIONAL_PENSION: AuthorityLink = {
  label: '국민연금법',
  url: 'https://www.law.go.kr/법령/국민연금법',
  type: 'law',
};

export const LAW_HEALTH_INSURANCE: AuthorityLink = {
  label: '국민건강보험법',
  url: 'https://www.law.go.kr/법령/국민건강보험법',
  type: 'law',
};

export const LAW_EMPLOYMENT_INSURANCE: AuthorityLink = {
  label: '고용보험법',
  url: 'https://www.law.go.kr/법령/고용보험법',
  type: 'law',
};

export const LAW_LABOR_STANDARDS_34: AuthorityLink = {
  label: '근로기준법 §34 (퇴직급여)',
  url: 'https://www.law.go.kr/법령/근로기준법/제34조',
  type: 'law',
};

export const LAW_RETIREMENT_PENSION: AuthorityLink = {
  label: '근로자퇴직급여 보장법',
  url: 'https://www.law.go.kr/법령/근로자퇴직급여보장법',
  type: 'law',
};

export const LAW_LICENSED_REAL_ESTATE: AuthorityLink = {
  label: '공인중개사법 시행규칙 §20 (중개보수 요율표)',
  url: 'https://www.law.go.kr/법령/공인중개사법시행규칙/제20조',
  type: 'law',
};

export const LAW_HOUSING_LEASE_PROTECTION: AuthorityLink = {
  label: '주택임대차보호법',
  url: 'https://www.law.go.kr/법령/주택임대차보호법',
  type: 'law',
};

export const LAW_BANKING_24_4: AuthorityLink = {
  label: '은행법 시행령 §24의4 (가계대출 관리)',
  url: 'https://www.law.go.kr/법령/은행법시행령/제24조의4',
  type: 'law',
};

export const LAW_HOUSING_24: AuthorityLink = {
  label: '주택공급에 관한 규칙 §24 (가점제)',
  url: 'https://www.law.go.kr/법령/주택공급에관한규칙/제24조',
  type: 'law',
};

// ─── 정부 기관 (홈페이지 — deep-link 안정성 낮은 경우) ────────────────────

export const NTS_HOME: AuthorityLink = {
  label: '국세청',
  url: 'https://www.nts.go.kr',
  type: 'agency',
};

export const HOMETAX_HOME: AuthorityLink = {
  label: '국세청 홈택스',
  url: 'https://www.hometax.go.kr',
  type: 'agency',
};

export const MOEF_HOME: AuthorityLink = {
  label: '기획재정부',
  url: 'https://www.moef.go.kr',
  type: 'agency',
};

export const WETAX_HOME: AuthorityLink = {
  label: '위택스 (지방세)',
  url: 'https://www.wetax.go.kr',
  type: 'agency',
};

export const FSS_HOME: AuthorityLink = {
  label: '금융감독원',
  url: 'https://www.fss.or.kr',
  type: 'agency',
};

export const BOK_HOME: AuthorityLink = {
  label: '한국은행',
  url: 'https://www.bok.or.kr',
  type: 'agency',
};

export const FINLIFE_HOME: AuthorityLink = {
  label: '금감원 금융상품통합비교공시 (finlife)',
  url: 'https://finlife.fss.or.kr',
  type: 'agency',
};

export const NPS_HOME: AuthorityLink = {
  label: '국민연금공단',
  url: 'https://www.nps.or.kr',
  type: 'agency',
};

export const NHIS_HOME: AuthorityLink = {
  label: '국민건강보험공단',
  url: 'https://www.nhis.or.kr',
  type: 'agency',
};

export const COMWEL_HOME: AuthorityLink = {
  label: '근로복지공단',
  url: 'https://www.comwel.or.kr',
  type: 'agency',
};

export const APPLYHOME: AuthorityLink = {
  label: '청약홈',
  url: 'https://www.applyhome.co.kr',
  type: 'agency',
};

export const RT_MOLIT: AuthorityLink = {
  label: '국토교통부 실거래가공개시스템',
  url: 'https://rt.molit.go.kr',
  type: 'agency',
};

export const REB_HOME: AuthorityLink = {
  label: '한국부동산원',
  url: 'https://www.reb.or.kr',
  type: 'agency',
};

export const ECOS_BOK: AuthorityLink = {
  label: '한국은행 ECOS (경제통계시스템)',
  url: 'https://ecos.bok.or.kr',
  type: 'agency',
};

export const KOREA_EXIM: AuthorityLink = {
  label: '한국수출입은행 환율',
  url: 'https://www.koreaexim.go.kr',
  type: 'agency',
};
