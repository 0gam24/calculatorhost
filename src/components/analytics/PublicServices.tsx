'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { canLoadAdsOnPath, canLoadNaverTracker } from '@/lib/analytics/public-service-policy';
import { getSearchReferrerOrigin } from '@/lib/analytics/search-referrer';
import {
  documentRobotsContent,
  observeDocumentRobots,
} from '@/lib/analytics/ad-intents-navigation';
import { CancellableAdSense } from './CancellableAdSense';

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
  const refreshingExcludedDocument = useRef(false);
  useEffect(() => {
    setLive(window.location.hostname === 'calculatorhost.com');
  }, []);
  const canonical = `https://calculatorhost.com${pathname}`;

  useEffect(() => {
    if (!live || !adsenseClient) return;
    let timer: number | undefined;
    const check = () => {
      timer = undefined;
      if (
        refreshingExcludedDocument.current ||
        canLoadAdsOnPath(window.location.pathname, documentRobotsContent(document)) ||
        !document.querySelector('script#adsbygoogle-init')
      )
        return;
      // A previously initialized library belongs to this document. Dispose the
      // document, never Google's DOM, if an excluded destination was reached by SPA/history.
      refreshingExcludedDocument.current = true;
      window.location.replace(window.location.href);
    };
    const defer = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = window.setTimeout(check, 0);
    };
    const stopObserving = observeDocumentRobots(document, defer);
    window.addEventListener('popstate', defer);
    window.addEventListener('pageshow', defer);
    defer();
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      stopObserving();
      window.removeEventListener('popstate', defer);
      window.removeEventListener('pageshow', defer);
    };
  }, [live, adsenseClient, pathname]);

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
  const robotsContent = documentRobotsContent(document);
  const adsAllowed = canLoadAdsOnPath(pathname, robotsContent);
  const naverAllowed = canLoadNaverTracker(window.location.href, document.referrer);
  return (
    <>
      {adsenseClient && adsAllowed ? (
        <CancellableAdSense adsenseClient={adsenseClient} pathname={pathname} />
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
