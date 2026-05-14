import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter';
import { MobileAnchorAdGuard } from '@/components/ads/MobileAnchorAdGuard';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://calculatorhost.com'),
  title: {
    // 페이지마다 metadata.title 에 이미 "| calculatorhost" 가 포함돼 있으므로
    // template 에 사이트명을 추가하지 않음 (중복 방지). 사이트명 미포함 페이지는 default 사용.
    default: 'calculatorhost — 2026 최신 세율 반영 한국 계산기 모음',
    template: '%s',
  },
  description:
    '연봉 실수령액·양도세·취득세·대출이자 등 한국 생활 금융 계산기를 2026년 최신 세율로 제공합니다. 무료·회원가입 불필요·모바일 최적.',
  applicationName: 'calculatorhost',
  authors: [{ name: 'calculatorhost' }],
  generator: 'Next.js',
  keywords: ['계산기', '세금 계산기', '연봉 계산기', '대출 계산기', '양도소득세', '취득세'],
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://calculatorhost.com',
    siteName: 'calculatorhost',
    title: 'calculatorhost — 2026 최신 세율 반영 한국 계산기 모음',
    description:
      '연봉·양도세·취득세·대출이자 등 한국 생활 금융 계산기. 무료·회원가입 불필요.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'calculatorhost — 2026 한국 생활 계산기 모음',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'calculatorhost',
    description: '2026 최신 세율 반영 한국 계산기 모음',
    images: ['/og-default.png'],
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
  icons: { icon: '/favicon.ico' },
  manifest: '/site.webmanifest',
  category: 'finance',
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#272A2F' },
    { media: '(prefers-color-scheme: light)', color: '#F7F8FA' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* FOUC 방지용 테마 선주입 스크립트 — 디폴트 라이트 모드.
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

/* PWA Service Worker 등록 — 오프라인 fallback + 정적 자원 캐시.
   load 이벤트 후 비동기 등록(메인 스레드 블록 X). 등록 실패는 silent. */
const swInit = `
(function() {
  if (!('serviceWorker' in navigator)) return;
  if (location.hostname === 'localhost' && location.port) return;
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function() {});
  });
})();
`.trim();

// 환경변수 유효성 검증 — placeholder("ca-pub-", "G-")만 있고 값 비어있는 경우 차단.
// 깨진 스크립트 URL 이 빌드 산출물에 박히는 것을 방지.
const rawAdsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const adsenseClient = rawAdsense && /^ca-pub-\d{8,}$/.test(rawAdsense) ? rawAdsense : undefined;

// GA4 Measurement ID — 공개 식별자(HTML 응답에 노출)이므로 fallback 하드코딩 안전.
// env 우선, 미설정 시 운영자가 제공한 calculatorhost.com 측정 ID 사용.
const GA_ID_DEFAULT = 'G-JTG3NSZY8T';
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const gaId = rawGaId && /^G-[A-Z0-9]{6,}$/.test(rawGaId) ? rawGaId : GA_ID_DEFAULT;

// Naver 웹로그분석(Naver Analytics) — 발급 ID 형식: a + 10자리 이상 숫자.
// 한국 검색 25% 점유 (Naver) → Naver Analytics 별도 추적이 필수.
const rawNaverId = process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID?.trim();
const naverAnalyticsId = rawNaverId && /^a\d{10,}$/.test(rawNaverId) ? rawNaverId : undefined;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko-KR">
      <head>
        {/* Pretendard self-host preload — FOIT 방지·LCP 최적화 */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PretendardVariable.woff2"
          crossOrigin="anonymous"
        />
        {/* Inter self-host preload — 결과 카드 숫자 폭 안정화(CLS 제거) */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/InterVariable.woff2"
          crossOrigin="anonymous"
        />
        {/* AdSense 도메인 사전 연결 — DNS/TLS 핸드셰이크를 미리 해두고 JS 자체는 lazyOnload.
            preconnect 만으로는 다운로드 X (실제 fetch는 lazyOnload 시점에). TBT 영향 X. */}
        {adsenseClient ? (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://adservice.google.com" />
          </>
        ) : null}
        {/* RSS 자동 발견 (Feedly·Inoreader·NetNewsWire 등 RSS 리더가 <head> 에서 탐지) */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="calculatorhost — 한국 금융·세금 계산기 업데이트"
          href="/feed.xml"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: swInit }} />
      </head>
      <body>
        {/* WCAG 2.4.1 — 키보드 사용자 본문 점프 (헤더·사이드바 우회).
            기본 sr-only, 포커스 시 가시화. 'main-content' id 는 각 페이지의 <main> 에 위치. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          본문으로 건너뛰기
        </a>
        {children}

        {/* AD-5 모바일 앵커 (lg 이하에서만 고정 하단 표시) */}
        {/* AdSense 정책: 정책 페이지(/privacy, /terms, /contact, /about)에서는 광고 비활성화 */}
        <MobileAnchorAdGuard />

        {/* Web Vitals → GA4 송신 (필드 데이터 수집) */}
        <WebVitalsReporter />

        {/* Google AdSense — lazyOnload 전략 (TBT 최소화).
            window.load + idle callback 후 다운로드 → 메인 스레드 블록 X.
            adsbygoogle.push() 큐는 스크립트 로드 전에도 안전하게 누적되므로 RPM 영향 미미.
            preconnect 로 DNS/TLS 사전 완료 → lazyOnload 시점 fetch 빠름.
            슬롯별 push 는 AdSlot 컴포넌트가 IntersectionObserver 로 viewport 진입 시점에 호출. */}
        {adsenseClient ? (
          <Script
            id="adsbygoogle-init"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        ) : null}

        {/* Google Analytics 4 — lazyOnload + requestIdleCallback */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                var initGa = function() {
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { anonymize_ip: true });
                };
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(initGa, { timeout: 2000 });
                } else {
                  setTimeout(initGa, 1);
                }`}
            </Script>
          </>
        ) : null}

        {/* Naver 웹로그분석 — lazyOnload + requestIdleCallback (TBT 보호).
            한국 검색 25% 점유율(Naver)은 GA4 외 별도 추적 필수.
            wcslog.js 는 // (프로토콜 상대) 로 제공되나 next/script 는 https 강제.
            wcs_do() 호출 시 페이지뷰 카운트 — SPA 라우팅 시 추가 호출은 향후 분리.
            관련: https://wa.naver.com */}
        {naverAnalyticsId ? (
          <>
            <Script
              src="https://wcs.naver.net/wcslog.js"
              strategy="lazyOnload"
            />
            <Script id="naver-analytics-init" strategy="lazyOnload">
              {`var initNaver = function() {
                  if (!window.wcs_add) window.wcs_add = {};
                  window.wcs_add.wa = '${naverAnalyticsId}';
                  if (window.wcs && typeof window.wcs_do === 'function') {
                    window.wcs_do();
                  }
                };
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(initNaver, { timeout: 2000 });
                } else {
                  setTimeout(initNaver, 1);
                }`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
