/**
 * 어필리에이트 파트너 SSoT — 환경변수 → 검증된 URL 매핑
 *
 * **2026-05-03 검증 갱신**:
 * 이전 목록에 공개 어필리에이트 프로그램이 없는 서비스가 다수 포함되어 있어 정리.
 * 본 파일은 운영자가 가입 가능한 프로그램만 명시.
 *
 * 운영자는 .env.local 또는 Cloudflare Pages 환경변수에 파트너별 어필리에이트 URL 입력.
 * 본 파일은:
 * 1. env var 가 비어있거나 placeholder 면 자동 비활성 (UI 미표시)
 * 2. URL 형식 기본 검증 (https:// 시작 + 길이 10자+)
 * 3. 페이지 컴포넌트는 본 헬퍼만 import → env var 직접 참조 X
 *
 * 신규 파트너 추가 절차:
 *   1) 운영자가 실제 가입 가능 여부 확인 (공개 affiliate URL 검증)
 *   2) .env.example 에 NEXT_PUBLIC_AFFILIATE_<PARTNER>_URL 추가
 *   3) 본 파일에 헬퍼 함수 + 메타 데이터 추가
 *   4) 사용 페이지에서 import + AffiliateRecommendation 적용
 */

export interface AffiliatePartner {
  /** 파트너 식별자 (env var key 일부) */
  key: string;
  /** 표시명 */
  name: string;
  /** 한 줄 설명 */
  description: string;
  /** 카테고리 */
  category: '도서' | '금융' | '쇼핑' | '네트워크';
  /** 검증된 가입 URL (공개 affiliate 가입 페이지) */
  signupUrl: string;
  /** 가입 형태 */
  type: '공개 어필리에이트' | '개인 친구추천' | '어필리에이트 네트워크';
}

/**
 * 등록된 파트너 메타 — 모두 공개 가입 가능한 프로그램만 포함.
 * env var 가 비어있는 파트너는 disclosure 페이지에서도 자동 제외 (실제 활성된 것만 공시).
 */
export const REGISTERED_PARTNERS: AffiliatePartner[] = [
  {
    key: 'COUPANG',
    name: '쿠팡 파트너스',
    description: '한국 최대 e커머스 어필리에이트. 도서·전자책·생활용품 추천 (CPS 3% 도서 기준)',
    category: '도서',
    signupUrl: 'https://partners.coupang.com',
    type: '공개 어필리에이트',
  },
  {
    key: 'ALADIN',
    name: '알라딘 TTB',
    description: '국내 도서 어필리에이트의 표준. 신간·도서·전자책 추천 (TTB 코드 기반)',
    category: '도서',
    signupUrl: 'https://blog.aladin.co.kr/ttb/',
    type: '공개 어필리에이트',
  },
  {
    key: 'KAKAOBANK',
    name: '카카오뱅크 친구추천',
    description: '적금·예금·체크카드 가입 시 양측 5,000원 보너스 (개인 추천 코드, 앱 내 발급)',
    category: '금융',
    signupUrl: 'https://www.kakaobank.com',
    type: '개인 친구추천',
  },
  {
    key: 'TOSS',
    name: '토스 친구초대',
    description: '체크카드·적금·외화 환전 등 (개인 추천 코드, 앱 내 발급)',
    category: '금융',
    signupUrl: 'https://toss.im',
    type: '개인 친구추천',
  },
  {
    key: 'LINKPRICE',
    name: '링크프라이스',
    description: '한국 어필리에이트 네트워크 — 가입 후 광고주별 캠페인 신청 (다수 브랜드)',
    category: '네트워크',
    signupUrl: 'https://www.linkprice.com',
    type: '어필리에이트 네트워크',
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

export const getCoupangUrl = () => getAffiliateUrl('COUPANG');
export const getAladinUrl = () => getAffiliateUrl('ALADIN');
export const getKakaoBankUrl = () => getAffiliateUrl('KAKAOBANK');
export const getTossUrl = () => getAffiliateUrl('TOSS');
export const getLinkpriceUrl = () => getAffiliateUrl('LINKPRICE');
