import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

// 환경변수 유효성 검증 — placeholder("ca-pub-", "G-")만 있고 값 비어있는 경우 차단.
// 깨진 스크립트 URL 이 빌드 산출물에 박히는 것을 방지.
const rawAdsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const adsenseClient = rawAdsense && /^ca-pub-\d{8,}$/.test(rawAdsense) ? rawAdsense : undefined;

const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const gaId = rawGaId && /^G-[A-Z0-9]{6,}$/.test(rawGaId) ? rawGaId : undefined;

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
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        {children}

        {/* Google AdSense — afterInteractive 전략 (FCP/LCP 와 경쟁 X)
            슬롯별 push 는 AdSlot 컴포넌트가 IntersectionObserver 로 viewport 진입 시점에 호출. */}
        {adsenseClient ? (
          <Script
            id="adsbygoogle-init"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            strategy="afterInteractive"
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
      </body>
    </html>
  );
}
