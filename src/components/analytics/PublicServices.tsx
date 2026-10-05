'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { canLoadAdsOnPath, canLoadNaverTracker } from '@/lib/analytics/public-service-policy';
import { getSearchReferrerOrigin } from '@/lib/analytics/search-referrer';

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
  const firstPageReferrer = useRef('');
  useEffect(() => {
    setLive(window.location.hostname === 'calculatorhost.com');
  }, []);
  const canonical = `https://calculatorhost.com${pathname}`;

  useEffect(() => {
    if (!live || !gaReady || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_location: canonical,
      page_referrer: firstPageReferrer.current,
      page_title: document.title,
    });
    // A browser landing source is not a new referral on later SPA navigation.
    firstPageReferrer.current = '';
  }, [live, gaReady, canonical]);

  useEffect(() => {
    // The bundled tracker reads both location and document.referrer itself.
    if (!live || !naverReady || !canLoadNaverTracker(window.location.href, document.referrer))
      return;
    const client = window as NaverWindow;
    if (client.wcs && client.wcs_do) client.wcs_do();
  }, [live, naverReady, pathname]);

  if (!live) return null;
  const robotsContent = Array.from(
    document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
  )
    .map((meta) => meta.content)
    .join(',');
  const adsAllowed = canLoadAdsOnPath(pathname, robotsContent);
  const naverAllowed = canLoadNaverTracker(window.location.href, document.referrer);
  return (
    <>
      {adsenseClient && adsAllowed ? (
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
          window.gtag = function () {
            // gtag.js consumes the official Arguments queue format, not arrays.
            // eslint-disable-next-line prefer-rest-params
            client.dataLayer!.push(arguments);
          };
          window.gtag('js', new Date());
          firstPageReferrer.current = getSearchReferrerOrigin(document.referrer);
          window.gtag('config', gaId, {
            send_page_view: false,
            page_location: canonical,
            page_referrer: firstPageReferrer.current,
            anonymize_ip: true,
          });
          setGaReady(true);
        }}
      />
      {naverAnalyticsId && naverAllowed ? (
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
