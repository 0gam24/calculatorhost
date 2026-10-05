'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  documentRobotsContent,
  observeDocumentRobots,
} from '@/lib/analytics/ad-intents-navigation';
import { canLoadAdsOnPath } from '@/lib/analytics/public-service-policy';

/** Own the cancellable wait; Next Script still owns the one-time library load. */
export function CancellableAdSense({
  adsenseClient,
  pathname,
}: {
  adsenseClient: string;
  pathname: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    let finished = false;
    let waitingForLoad = false;
    let queued = false;
    let idleId: number | undefined;
    let timerId: number | undefined;
    const eligible = () =>
      window.location.hostname === 'calculatorhost.com' &&
      canLoadAdsOnPath(window.location.pathname, documentRobotsContent(document));
    const cancelPending = () => {
      if (waitingForLoad) window.removeEventListener('load', queueIdle);
      waitingForLoad = false;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      idleId = undefined;
      timerId = undefined;
      queued = false;
    };
    const commit = () => {
      idleId = undefined;
      timerId = undefined;
      queued = false;
      if (cancelled || finished || !eligible()) return;
      finished = true;
      setReady(true);
    };
    function queueIdle() {
      waitingForLoad = false;
      if (cancelled || finished || queued || !eligible()) return;
      queued = true;
      if (
        typeof window.requestIdleCallback === 'function' &&
        typeof window.cancelIdleCallback === 'function'
      ) {
        idleId = window.requestIdleCallback(commit);
      } else {
        timerId = window.setTimeout(commit, 1);
      }
    }
    const start = () => {
      if (cancelled || finished || !eligible()) return;
      if (document.readyState === 'complete') queueIdle();
      else if (!waitingForLoad) {
        waitingForLoad = true;
        window.addEventListener('load', queueIdle, { once: true });
      }
    };
    const reconsider = () => {
      if (!eligible()) cancelPending();
      else start();
    };
    const stopObserving = observeDocumentRobots(document, reconsider);
    window.addEventListener('popstate', reconsider);
    window.addEventListener('pageshow', reconsider);
    start();
    return () => {
      cancelled = true;
      cancelPending();
      stopObserving();
      window.removeEventListener('popstate', reconsider);
      window.removeEventListener('pageshow', reconsider);
    };
  }, [adsenseClient, pathname, ready]);

  if (
    !ready ||
    window.location.hostname !== 'calculatorhost.com' ||
    !canLoadAdsOnPath(window.location.pathname, documentRobotsContent(document))
  )
    return null;
  return (
    <Script
      id="adsbygoogle-init"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
