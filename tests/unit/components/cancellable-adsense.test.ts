// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://calculatorhost.com/"}
import React, { createElement, useEffect } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CancellableAdSense } from '@/components/analytics/CancellableAdSense';
import {
  calculatorDocumentDestination,
  needsCalculatorDocument,
} from '@/lib/analytics/ad-intents-navigation';

const loaded = vi.hoisted(() => ({ mounts: 0, props: {} as Record<string, unknown> }));
// No real script element, advertisement, external request or Google library.
vi.mock('next/script', () => ({
  default: function ScriptMock(props: Record<string, unknown>) {
    loaded.props = props;
    useEffect(() => {
      loaded.mounts++;
    }, []);
    return createElement('span', { 'data-testid': 'mock-ad-script' });
  },
}));
const props = { adsenseClient: 'ca-pub-test', pathname: '/guide/example/' };
let idle: Map<number, IdleRequestCallback>;
let nextId: number;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('React', React);
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('External requests forbidden'))),
  );
  idle = new Map();
  nextId = 0;
  loaded.mounts = 0;
  loaded.props = {};
  vi.stubGlobal(
    'requestIdleCallback',
    vi.fn((callback: IdleRequestCallback) => {
      const id = ++nextId;
      idle.set(id, callback);
      return id;
    }),
  );
  vi.stubGlobal(
    'cancelIdleCallback',
    vi.fn((id: number) => idle.delete(id)),
  );
  Object.defineProperty(document, 'readyState', { configurable: true, value: 'complete' });
  document.head.querySelectorAll('meta[name="robots"]').forEach((node) => node.remove());
  history.replaceState({}, '', '/guide/example/');
});
afterEach(() => {
  cleanup();
  expect(fetch).not.toHaveBeenCalled();
  document.head.querySelectorAll('meta[name="robots"]').forEach((node) => node.remove());
  delete (document as unknown as { readyState?: string }).readyState;
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
function flushIdle() {
  act(() => {
    const callbacks = [...idle.values()];
    idle.clear();
    callbacks.forEach((callback) => callback({ didTimeout: false, timeRemaining: () => 50 }));
  });
}
function noindex() {
  const meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex, follow';
  return meta;
}
describe('cancellable advertisement activation', () => {
  it('waits for idle, then activates once across eligible SPA rerenders', () => {
    const component = render(createElement(CancellableAdSense, props));
    expect(screen.queryByTestId('mock-ad-script')).toBeNull();
    flushIdle();
    expect(loaded.mounts).toBe(1);
    expect(loaded.props).toMatchObject({
      id: 'adsbygoogle-init',
      strategy: 'afterInteractive',
      crossOrigin: 'anonymous',
    });
    history.replaceState({}, '', '/guide/other/');
    component.rerender(createElement(CancellableAdSense, { ...props, pathname: '/guide/other/' }));
    flushIdle();
    expect(loaded.mounts).toBe(1);
  });
  it('cancels idle work and ignores even a stale callback after unmount', () => {
    const component = render(createElement(CancellableAdSense, props));
    const stale = [...idle.values()][0];
    component.unmount();
    expect(cancelIdleCallback).toHaveBeenCalled();
    expect(idle.size).toBe(0);
    expect(stale).toBeDefined();
    act(() => stale!({ didTimeout: false, timeRemaining: () => 50 }));
    expect(loaded.mounts).toBe(0);
  });
  it('removes its window load listener before the document finishes loading', () => {
    Object.defineProperty(document, 'readyState', { configurable: true, value: 'loading' });
    const component = render(createElement(CancellableAdSense, props));
    component.unmount();
    act(() => window.dispatchEvent(new Event('load')));
    expect(requestIdleCallback).not.toHaveBeenCalled();
    expect(loaded.mounts).toBe(0);
  });
  it('cancels idle work when robots metadata becomes noindex and can resume if restored', async () => {
    render(createElement(CancellableAdSense, props));
    const meta = noindex();
    await act(async () => {
      document.head.append(meta);
      await Promise.resolve();
    });
    expect(cancelIdleCallback).toHaveBeenCalled();
    expect(idle.size).toBe(0);
    flushIdle();
    expect(loaded.mounts).toBe(0);
    await act(async () => {
      meta.remove();
      await Promise.resolve();
    });
    flushIdle();
    expect(loaded.mounts).toBe(1);
  });
  it('cancels delayed activation on excluded history navigation', () => {
    render(createElement(CancellableAdSense, props));
    history.replaceState({}, '', '/privacy/');
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(idle.size).toBe(0);
    flushIdle();
    expect(loaded.mounts).toBe(0);
  });
  it('rechecks the actual URL at idle time even without a React pathname update', () => {
    render(createElement(CancellableAdSense, props));
    history.replaceState({}, '', '/about/');
    flushIdle();
    expect(loaded.mounts).toBe(0);
  });
  it('cancels the timer fallback before it activates', () => {
    vi.stubGlobal('requestIdleCallback', undefined);
    vi.stubGlobal('cancelIdleCallback', undefined);
    const component = render(createElement(CancellableAdSense, props));
    component.unmount();
    act(() => vi.runAllTimers());
    expect(loaded.mounts).toBe(0);
  });
  it('never schedules or activates on an initial noindex document', () => {
    document.head.append(noindex());
    render(createElement(CancellableAdSense, props));
    expect(requestIdleCallback).not.toHaveBeenCalled();
    expect(loaded.mounts).toBe(0);
  });
});

describe('advertisement document exclusion boundaries', () => {
  it.each([
    '/about/',
    '/privacy/',
    '/terms/',
    '/contact/',
    '/embed/savings/',
    '/404',
    '/offline.html',
  ])('uses a document boundary in both directions for %s', (excluded) => {
    expect(needsCalculatorDocument('/guide/example/', excluded)).toBe(true);
    expect(needsCalculatorDocument(excluded, '/guide/example/')).toBe(true);
  });
  it('preserves allowed SPA, excluded SPA and calculator handoff behavior', () => {
    expect(needsCalculatorDocument('/guide/a/', '/guide/b/')).toBe(false);
    expect(needsCalculatorDocument('/about/', '/privacy/')).toBe(false);
    expect(needsCalculatorDocument('/calculator/salary/', '/calculator/savings/')).toBe(false);
    expect(needsCalculatorDocument('/unknown/', '/guide/a/', 'noindex')).toBe(true);
    expect(needsCalculatorDocument('/guide/a/', '/unknown/', '', 'noindex')).toBe(true);
  });
  it('keeps same-document hashes on a current noindex document native', () => {
    const anchor = document.createElement('a');
    anchor.href = '#main-content';
    const event = {
      target: anchor,
      defaultPrevented: false,
      button: 0,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      altKey: false,
    };
    expect(
      calculatorDocumentDestination(event, 'https://calculatorhost.com/unknown/', 'noindex'),
    ).toBeNull();
  });
});
