/**
 * 공공 데이터 본문 인용 헬퍼.
 *
 * src/data/{bok-rates,kosis-income,finance-products,...}.json 의 정부 통계를
 * 본문에 인용하는 표준 포맷. GEO/AEO 신뢰 신호 강화 (LLM 인용 가능성 ↑).
 *
 * 사용 예:
 *   import bokRates from '@/data/bok-rates.json';
 *   <PublicDataCitation citation={getEcosBaseRateCitation(bokRates)} />
 *
 * 디자인:
 *  - 순수 함수만 (DOM/React 의존 X) — 단위 테스트 가능
 *  - 컴포넌트 래퍼는 src/components/ads-or-seo/PublicDataCitation.tsx
 */

export interface PublicCitation {
  /** 출처 기관명 (예: "한국은행 ECOS", "통계청 KOSIS", "금융감독원") */
  source: string;
  /** 데이터 라벨 (예: "기준금리", "중위소득") */
  label: string;
  /** 표시 값 (이미 포맷된 문자열, 예: "3.00", "485만") */
  value: string;
  /** 단위 (예: "%", "원/월"). 빈 문자열 가능 */
  unit: string;
  /** 데이터 기준 시점 (ISO 또는 YYYYMM) */
  date: string;
  /** 출처 공식 URL (선택) */
  url?: string;
}

/**
 * ISO 8601 또는 ECOS YYYYMM 포맷을 한국 표시용 YYYY-MM-DD / YYYY-MM 로 정규화.
 */
export function formatCitationDateKR(date: string): string {
  if (!date) return '';
  // ECOS YYYYMM (6자리 숫자)
  if (/^\d{6}$/.test(date)) {
    return `${date.slice(0, 4)}-${date.slice(4, 6)}`;
  }
  // ISO 8601 (T 포함) → YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}T/.test(date)) {
    return date.slice(0, 10);
  }
  // 이미 YYYY-MM-DD 또는 YYYY-MM-DD HH:MM
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date.slice(0, 10);
  }
  return date;
}

/**
 * 본문 텍스트형 인용 — "기준금리 3.00% (2025-01 기준, 출처: 한국은행 ECOS)".
 * 컴포넌트 미사용 시나리오에서 plain string 으로 삽입.
 */
export function formatCitation(c: PublicCitation): string {
  const dateKR = formatCitationDateKR(c.date);
  const valueWithUnit = c.unit ? `${c.value}${c.unit}` : c.value;
  return `${c.label} ${valueWithUnit} (${dateKR} 기준, 출처: ${c.source})`;
}

// ─── 데이터 셰이프별 어댑터 ─────────────────────────
// src/data/*.json 각 파일의 구조에 맞춰 PublicCitation 으로 변환.

export interface BokRatesData {
  baseRate: number;
  baseRateDate: string;
  cpi?: number;
  cpiDate?: string;
}

export function getEcosBaseRateCitation(data: BokRatesData): PublicCitation {
  return {
    source: '한국은행 ECOS',
    label: '기준금리',
    value: (data.baseRate * 100).toFixed(2),
    unit: '%',
    date: data.baseRateDate,
    url: 'https://ecos.bok.or.kr',
  };
}

export interface KosisIncomeData {
  householdMonthlyIncome: number;
  householdMonthlyIncomeDate: string;
  perCapitaMonthlyIncome?: number;
}

export function getKosisHouseholdIncomeCitation(data: KosisIncomeData): PublicCitation {
  // 원 단위 → 만 원 단위 표시
  const valueInMan = Math.round(data.householdMonthlyIncome / 10000);
  return {
    source: '통계청 KOSIS',
    label: '가구 월평균 소득',
    value: valueInMan.toLocaleString('ko-KR') + '만',
    unit: '원',
    date: data.householdMonthlyIncomeDate,
    url: 'https://kosis.kr',
  };
}

export interface FinanceProductsData {
  deposit?: { maturity12m?: number };
  savings?: { maturity12m?: number };
}

export function getFssDepositRateCitation(
  data: FinanceProductsData,
  fetchedAt: string,
): PublicCitation | null {
  const rate = data.deposit?.maturity12m;
  if (rate == null) return null;
  return {
    source: '금융감독원',
    label: '시중은행 12개월 정기예금 평균금리',
    value: rate.toFixed(2),
    unit: '%',
    date: fetchedAt,
    url: 'https://finlife.fss.or.kr',
  };
}

export function getFssSavingsRateCitation(
  data: FinanceProductsData,
  fetchedAt: string,
): PublicCitation | null {
  const rate = data.savings?.maturity12m;
  if (rate == null) return null;
  return {
    source: '금융감독원',
    label: '시중은행 12개월 적금 평균금리',
    value: rate.toFixed(2),
    unit: '%',
    date: fetchedAt,
    url: 'https://finlife.fss.or.kr',
  };
}
