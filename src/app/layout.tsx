import type { Metadata, Viewport } from 'next';
import { PublicServices } from '@/components/analytics/PublicServices';
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter';
import { SiteBody } from '@/components/layout/SiteBody';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorhost.com'),
  title: {
    // 페이지마다 metadata.title 에 이미 "| calculatorhost" 가 포함돼 있으므로
    // template 에 사이트명을 추가하지 않음 (중복 방지). 사이트명 미포함 페이지는 default 사용.
    default: 'calculatorhost | 세금·금융·부동산 계산기',
    template: '%s',
  },
  description:
    '연봉 실수령액, 양도세, 취득세, 대출이자를 회원가입 없이 바로 계산하고 결과의 법적 근거까지 확인하세요.',
  applicationName: 'calculatorhost',
  authors: [{ name: 'calculatorhost' }],
  generator: 'Next.js',
  // 글로벌 keywords 제거 (2026-05-21): 페이지별 메타 keywords 가 진짜 토픽을 반영하도록 상속 차단.
  // Google 은 메타 keywords 무시하나, AI Overview/LLM 인용 신호용으로 페이지마다 명시.
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
    languages: { 'ko-KR': '/' },
  },
  // og·twitter 의 제목/설명/주소는 여기서 정하지 않는다. 페이지 metadata 의 title·description 을
  // Next 가 그대로 이어받아 og:title·twitter:title 이 페이지 제목과 같아진다
  // (네이버 콘텐츠 마크업 04-02, 검색노출 제목 FAQ 12-01). og:url 은 페이지마다 canonical 로 지정.
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'calculatorhost',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'calculatorhost 세금·금융·부동산 계산기',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    // 빈 값·placeholder 상태에선 메타 미생성 (length > 10 미만이면 무효 토큰으로 판단)
    google:
      (process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION ?? '').trim().length > 10
        ? process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
        : undefined,
    // Naver Search Advisor 인증 — 한국 검색 점유율 25% 진입.
    // 등록: https://searchadvisor.naver.com → 사이트 추가 → HTML 태그 인증 →
    //   meta content 값(예: 1234abcd567...) 을 Cloudflare Pages 환경변수
    //   NEXT_PUBLIC_NAVER_SITE_VERIFICATION 에 입력.
    other: {
      ...((process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? '').trim().length > 10
        ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION! }
        : {}),
    },
  },
  // 네이버 파비콘 가이드(04-04): href 는 절대 경로, 같은 rel 값은 한 개만.
  // 네이버 우선순위 1 인 shortcut icon 에 ICO(16·32·48px), 브라우저 탭용 icon 에 SVG.
  icons: {
    shortcut: [{ url: 'https://calculatorhost.com/favicon.ico' }],
    icon: [{ url: 'https://calculatorhost.com/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: 'https://calculatorhost.com/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  category: 'finance',
  formatDetection: { telephone: false, email: false, address: false },
  other: {
    // 네이버 콘텐츠 마크업(04-02) 소셜 미디어 예시의 twitter:domain
    'twitter:domain': 'calculatorhost.com',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f1614' },
    { media: '(prefers-color-scheme: light)', color: '#f7f6f3' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* FOUC 방지용 테마 선주입 스크립트, 디폴트 라이트 모드.
   사용자 명시 선택(localStorage)만 우선, 시스템 설정은 무시(라이트 고정 시작). */
const themeInit = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', stored || 'light');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`.trim();

/* PWA Service Worker 등록, 오프라인 fallback + 정적 자원 캐시.
   load 이벤트 후 비동기 등록(메인 스레드 블록 X). 등록 실패는 silent. */
const swInit = `
(function() {
  if (!('serviceWorker' in navigator)) return;
  if (location.hostname === 'localhost' && location.port) return;
  window.addEventListener('load', function() {
    // updateViaCache: 'none' — sw.js 를 HTTP 캐시에서 재사용하지 않고 항상 재검증.
    // 이게 없으면 새 워커 배포가 브라우저 캐시 TTL 만큼 늦게 적용된다.
    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then(function(reg) { reg.update(); })
      .catch(function() {});
  });
})();
`.trim();

// 환경변수 유효성 검증 — placeholder("ca-pub-", "G-")만 있고 값 비어있는 경우 차단.
// 깨진 스크립트 URL 이 빌드 산출물에 박히는 것을 방지.
const rawAdsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const cloudflarePreview = process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH !== 'main';
const adsenseClient =
  !cloudflarePreview && rawAdsense && /^ca-pub-\d{8,}$/.test(rawAdsense) ? rawAdsense : undefined;

// GA4 Measurement ID — 공개 식별자 (HTML 응답에 노출).
// calculatorhost.com 의 정식 측정 ID 를 코드에 고정 — Cloudflare env 의 placeholder/오타가
// 이 값을 override 하지 못하도록 보호. (Google Tag Manager 자동 감지 호환성)
// 다른 GA 속성으로 전환할 때만 이 상수를 변경.
const gaId = 'G-JTG3NSZY8T';

// Naver 웹로그분석(Naver Analytics) — 발급 ID 형식: a + 10자리 이상 숫자.
// 한국 검색 25% 점유 (Naver) → Naver Analytics 별도 추적이 필수.
const rawNaverId = process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID?.trim();
const naverAnalyticsId = rawNaverId && /^a\d{10,}$/.test(rawNaverId) ? rawNaverId : undefined;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: FOUC 방지 인라인 스크립트가 하이드레이션 전 <html data-theme>
    // 를 설정 → 서버/클라 속성 불일치는 의도된 것이므로 React 경고만 억제(동작 정상)
    <html lang="ko-KR" suppressHydrationWarning>
      <head>
        {/* Pretendard self-host preload, FOIT 방지·LCP 최적화 */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PretendardVariable.woff2"
          crossOrigin="anonymous"
        />
        {/* Inter self-host preload, 결과 카드 숫자 폭 안정화(CLS 제거) */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/InterVariable.woff2"
          crossOrigin="anonymous"
        />
        {/* AdSense 도메인 사전 연결, DNS/TLS 핸드셰이크를 미리 해두고 JS 자체는 lazyOnload.
            preconnect 만으로는 다운로드 X (실제 fetch는 lazyOnload 시점에). TBT 영향 X. */}
        {adsenseClient ? (
          <>
            <link
              rel="preconnect"
              href="https://pagead2.googlesyndication.com"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://googleads.g.doubleclick.net"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://adservice.google.com" />
          </>
        ) : null}
        {/* 피드 자동 발견 (Feedly·Inoreader·NetNewsWire 등 RSS 리더가 <head> 에서 탐지), /feeds 허브 참고 */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="calculatorhost, 한국 금융·세금 계산기 업데이트"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="calculatorhost, Atom"
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="calculatorhost, JSON Feed"
          href="/feed.json"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: swInit }} />
      </head>
      <SiteBody>
        {/* WCAG 2.4.1, 키보드 사용자 본문 점프 (헤더·사이드바 우회).
            기본 sr-only, 포커스 시 가시화. 'main-content' id 는 각 페이지의 <main> 에 위치. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          본문으로 건너뛰기
        </a>
        {children}

        {!cloudflarePreview && <WebVitalsReporter />}
        {!cloudflarePreview && (
          <PublicServices
            gaId={gaId}
            adsenseClient={adsenseClient}
            naverAnalyticsId={naverAnalyticsId}
          />
        )}
      </SiteBody>
    </html>
  );
}
