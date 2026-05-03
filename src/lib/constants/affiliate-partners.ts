/**
 * 어필리에이트 파트너 SSoT — 환경변수 → 검증된 URL 매핑
 *
 * 운영자는 .env.local 또는 Cloudflare Pages 환경변수에 파트너별 어필리에이트 URL 입력.
 * 본 파일은:
 * 1. env var 가 비어있거나 placeholder 면 자동 비활성 (UI 미표시)
 * 2. URL 형식 기본 검증 (https:// 시작 + 길이 10자+)
 * 3. 페이지 컴포넌트는 본 헬퍼만 import → env var 직접 참조 X
 *
 * 신규 파트너 추가 절차:
 *   1) .env.example 에 NEXT_PUBLIC_AFFILIATE_<PARTNER>_URL 추가
 *   2) 본 파일에 헬퍼 함수 + 메타 데이터 추가
 *   3) 사용 페이지에서 import + AffiliateRecommendation 적용
 */

export interface AffiliatePartner {
  /** 파트너 식별자 (env var key 일부) */
  key: string;
  /** 표시명 */
  name: string;
  /** 한 줄 설명 */
  description: string;
  /** 카테고리 */
  category: '세무' | '도서' | '금융' | '카드' | '강의' | '부동산';
  /** 가입 URL (운영자용 — env var 입력 가이드) */
  signupUrl: string;
}

/**
 * 등록된 파트너 메타 — /affiliate-disclosure 페이지에서 자동 노출.
 * env var 가 비어있는 파트너는 disclosure 에서도 자동 제외 (실제 활성된 것만 공시).
 */
export const REGISTERED_PARTNERS: AffiliatePartner[] = [
  {
    key: '3O3',
    name: '삼쩜삼 (3.3)',
    description: '프리랜서·N잡러·직장인 종합소득세 환급 도우미 (토스 자회사)',
    category: '세무',
    signupUrl: 'https://3o3.co.kr/affiliate',
  },
  {
    key: 'COUPANG',
    name: '쿠팡 파트너스',
    description: '도서·전자책·생활용품 어필리에이트 (CPS 3%)',
    category: '도서',
    signupUrl: 'https://partners.coupang.com',
  },
  {
    key: 'KAKAOBANK',
    name: '카카오뱅크 친구추천',
    description: '적금·예금·체크카드 가입 시 양측 보너스 (개인 추천 코드)',
    category: '금융',
    signupUrl: 'https://www.kakaobank.com',
  },
  {
    key: 'TOSS',
    name: '토스 친구초대',
    description: '체크카드·적금·외화 환전 (개인 추천 코드)',
    category: '금융',
    signupUrl: 'https://toss.im',
  },
  {
    key: 'INFLEARN',
    name: '인프런',
    description: '재테크·세금·엑셀 온라인 강의 어필리에이트',
    category: '강의',
    signupUrl: 'https://www.inflearn.com',
  },
  {
    key: 'BANKSALAD',
    name: '뱅크샐러드',
    description: '대출·카드 비교 추천 (CPA 모델)',
    category: '금융',
    signupUrl: 'https://www.banksalad.com',
  },
  {
    key: 'CARDGORILLA',
    name: '카드고릴라',
    description: '신용·체크카드 비교 추천 (CPA 모델)',
    category: '카드',
    signupUrl: 'https://www.card-gorilla.com',
  },
  {
    key: 'TRAVELWALLET',
    name: '트래블월렛',
    description: '해외결제·환전 수수료 0원 카드 추천',
    category: '카드',
    signupUrl: 'https://travel-wallet.com',
  },
];

/**
 * 환경변수에서 파트너 URL 안전하게 조회.
 * - 미설정 / placeholder / 짧은 값 → undefined 반환 (UI 자동 비활성)
 * - https:// 시작하지 않으면 무효 처리
 */
export function getAffiliateUrl(partnerKey: string): string | undefined {
  const envKey = `NEXT_PUBLIC_AFFILIATE_${partnerKey}_URL`;
  const raw = (process.env[envKey] ?? '').trim();
  if (!raw) return undefined;
  if (raw.includes('YOUR_')) return undefined; // placeholder
  if (!/^https?:\/\//.test(raw)) return undefined;
  if (raw.length < 10) return undefined;
  return raw;
}

/**
 * 활성된 파트너 목록 반환 (env var 가 정상 설정된 파트너만).
 * /affiliate-disclosure 페이지에서 사용.
 */
export function getActivePartners(): AffiliatePartner[] {
  return REGISTERED_PARTNERS.filter((p) => getAffiliateUrl(p.key) !== undefined);
}

// ────────── 자주 쓰는 파트너 단축 헬퍼 ──────────

export const get3O3Url = () => getAffiliateUrl('3O3');
export const getCoupangUrl = () => getAffiliateUrl('COUPANG');
export const getKakaoBankUrl = () => getAffiliateUrl('KAKAOBANK');
export const getTossUrl = () => getAffiliateUrl('TOSS');
export const getInflearnUrl = () => getAffiliateUrl('INFLEARN');
export const getBanksaladUrl = () => getAffiliateUrl('BANKSALAD');
export const getCardgorillaUrl = () => getAffiliateUrl('CARDGORILLA');
export const getTravelwalletUrl = () => getAffiliateUrl('TRAVELWALLET');
