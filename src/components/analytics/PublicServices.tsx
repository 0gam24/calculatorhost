'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  gaId: string;
  adsenseClient?: string;
  naverAnalyticsId?: string;
}
interface NaverWindow extends Window {
  wcs_add?: { wa?: string };
  wcs?: unknown;
  wcs_do?: () => void;
  dataLayer?: unknown[];
}

/** Public services run on the live domain only; local previews cannot pollute metrics or ads. */
export function PublicServices({ gaId, adsenseClient, naverAnalyticsId }: Props) {
  const pathname = usePathname();
  const [live, setLive] = useState(false);
  const [gaReady, setGaReady] = useState(false);
  const [naverReady, setNaverReady] = useState(false);
  useEffect(() => {
    setLive(window.location.hostname === 'calculatorhost.com');
  }, []);
  const canonical = `https://calculatorhost.com${pathname}`;

  useEffect(() => {
    if (!live || !gaReady || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_location: canonical,
      page_referrer: '',
      page_title: document.title,
    });
  }, [live, gaReady, canonical]);

  useEffect(() => {
    // Naver's bundled tracker reads location itself. Do not activate it on URLs containing user data.
    if (!live || !naverReady || window.location.search || window.location.hash) return;
    const client = window as NaverWindow;
    if (client.wcs && client.wcs_do) client.wcs_do();
  }, [live, naverReady, pathname]);

  if (!live) return null;
  const policyPage = ['/about', '/privacy', '/terms', '/contact'].some(
    (p) => pathname === p || pathname === `${p}/`,
  );
  return (
    <>
      {adsenseClient && !policyPage ? (
        <Script
          id="adsbygoogle-init"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      ) : null}
      <Script
        id="ga-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
        onLoad={() => {
          const client = window as NaverWindow;
          client.dataLayer = client.dataLayer || [];
          window.gtag = (command, ...args) => {
            client.dataLayer!.push([command, ...args]);
          };
          window.gtag('js', new Date());
          window.gtag('config', gaId, {
            send_page_view: false,
            page_location: canonical,
            page_referrer: '',
            anonymize_ip: true,
          });
          setGaReady(true);
        }}
      />
      {naverAnalyticsId && !window.location.search && !window.location.hash ? (
        <Script
          id="naver-library"
          src="https://wcs.naver.net/wcslog.js"
          strategy="lazyOnload"
          onLoad={() => {
            const client = window as NaverWindow;
            client.wcs_add = { ...(client.wcs_add || {}), wa: naverAnalyticsId };
            setNaverReady(true);
          }}
        />
      ) : null}
    </>
  );
}
