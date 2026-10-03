// @vitest-environment jsdom
// @vitest-environment-options {"url":"https://calculatorhost.com/"}
import React, { createElement } from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PublicServices } from '@/components/analytics/PublicServices';

interface ScriptProps {
  id: string;
  src: string;
  strategy: string;
  onLoad?: () => void;
}
interface QueueWindow extends Window {
  dataLayer?: unknown[];
}
const controls = vi.hoisted(() => ({
  pathname: '/calculator/salary/',
  scripts: new Map<string, ScriptProps>(),
}));
vi.mock('next/navigation', () => ({ usePathname: () => controls.pathname }));
// No script element or external library is loaded; callbacks are exercised explicitly.
vi.mock('next/script', () => ({
  default: (props: ScriptProps) => {
    controls.scripts.set(props.id, props);
    return null;
  },
}));

function argumentsRecord(..._args: unknown[]): IArguments {
  // Model a command supplied before the component initializes, in Google's format.
  // eslint-disable-next-line prefer-rest-params
  return arguments;
}
function loadGoogle() {
  const script = controls.scripts.get('ga-library');
  expect(script?.strategy).toBe('afterInteractive');
  expect(script?.onLoad).toBeTypeOf('function');
  act(() => script!.onLoad!());
}
function queuedCommands() {
  const entries = (window as QueueWindow).dataLayer || [];
  for (const entry of entries) {
    expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]');
    expect(Array.isArray(entry)).toBe(false);
  }
  return entries.map((entry) => Array.from(entry as IArguments));
}
const props = { gaId: 'G-TEST-QUEUE' };

beforeEach(() => {
  vi.stubGlobal('React', React);
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('External requests forbidden'))),
  );
  controls.pathname = '/calculator/salary/';
  controls.scripts.clear();
  vi.spyOn(document, 'referrer', 'get').mockReturnValue('');
  history.replaceState({}, '', '/calculator/salary/');
  document.title = '연봉 실수령액 계산기';
  document.head.querySelectorAll('meta[name="robots"]').forEach((node) => node.remove());
  delete (window as QueueWindow).dataLayer;
  delete window.gtag;
});
afterEach(() => {
  expect(fetch).not.toHaveBeenCalled();
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('PublicServices Google command queue', () => {
  it.each([
    ['https://www.google.com/search?q=private-search#private-fragment', 'https://www.google.com/'],
    ['https://search.naver.com/search.naver?query=private-search', 'https://search.naver.com/'],
  ])('preserves only fixed search origin on the landing page: %s', (referrer, origin) => {
    vi.spyOn(document, 'referrer', 'get').mockReturnValue(referrer);
    history.replaceState({}, '', '/calculator/salary/?salary=private-input&utm_source=private-utm');
    const component = render(createElement(PublicServices, props));
    loadGoogle();
    const initial = queuedCommands();
    expect(initial[1]?.[2]).toMatchObject({ page_referrer: origin });
    expect(initial[2]?.[2]).toMatchObject({ page_referrer: origin });
    controls.pathname = '/calculator/loan/';
    component.rerender(createElement(PublicServices, props));
    controls.pathname = '/calculator/salary/';
    component.rerender(createElement(PublicServices, props));
    const commands = queuedCommands();
    const events = commands.filter((command) => command[0] === 'event');
    expect(events).toHaveLength(3);
    expect(
      events.slice(1).map((command) => (command[2] as { page_referrer: string }).page_referrer),
    ).toEqual(['', '']);
    const serialized = JSON.stringify(commands);
    for (const marker of [
      'private-search',
      'private-fragment',
      'private-input',
      'private-utm',
      '?',
      '#',
    ]) {
      expect(serialized).not.toContain(marker);
    }
    expect(commands.filter((command) => command[0] === 'config')).toHaveLength(1);
  });

  it('keeps initialization at library onLoad and queues genuine Arguments records', () => {
    render(createElement(PublicServices, props));
    expect(window.gtag).toBeUndefined();
    expect((window as QueueWindow).dataLayer).toBeUndefined();
    loadGoogle();
    const commands = queuedCommands();
    expect(commands.map((command) => command[0])).toEqual(['js', 'config', 'event']);
    expect(commands[0]?.[1]).toBeInstanceOf(Date);
    expect(commands[1]).toEqual([
      'config',
      props.gaId,
      {
        send_page_view: false,
        page_location: 'https://calculatorhost.com/calculator/salary/',
        page_referrer: '',
        anonymize_ip: true,
      },
    ]);
    expect(commands[2]).toEqual([
      'event',
      'page_view',
      {
        page_location: 'https://calculatorhost.com/calculator/salary/',
        page_referrer: '',
        page_title: document.title,
      },
    ]);
  });

  it('preserves the existing queue and consent commands without adding a consent default', () => {
    const consentParams = { analytics_storage: 'denied', ad_storage: 'denied' };
    const consent = argumentsRecord('consent', 'default', consentParams);
    const queue = [consent];
    (window as QueueWindow).dataLayer = queue;
    render(createElement(PublicServices, props));
    loadGoogle();
    expect((window as QueueWindow).dataLayer).toBe(queue);
    expect(queue[0]).toBe(consent);
    const commands = queuedCommands();
    expect(commands.filter((command) => command[0] === 'consent')).toEqual([
      ['consent', 'default', consentParams],
    ]);
    expect(commands[0]?.[2]).toBe(consentParams);
    expect(commands).toHaveLength(4);
  });

  it('forwards subsequent consent updates unchanged in the same Arguments queue', () => {
    render(createElement(PublicServices, props));
    loadGoogle();
    const params = { analytics_storage: 'denied' };
    act(() => window.gtag!('consent', 'update', params));
    const commands = queuedCommands();
    expect(commands.at(-1)).toEqual(['consent', 'update', params]);
    expect(commands.at(-1)?.[2]).toBe(params);
    expect(commands.filter((command) => command[0] === 'consent')).toHaveLength(1);
  });

  it('retains query-free page payloads and one manual page view per pathname change', () => {
    history.replaceState({}, '', '/calculator/salary/?salary=50000000#private-input');
    const component = render(createElement(PublicServices, props));
    loadGoogle();
    controls.pathname = '/calculator/loan/';
    history.replaceState({}, '', '/calculator/loan/?principal=300000000#private-input');
    component.rerender(createElement(PublicServices, props));
    const commands = queuedCommands();
    const events = commands.filter((command) => command[0] === 'event');
    expect(events).toHaveLength(2);
    expect(events[1]).toEqual([
      'event',
      'page_view',
      {
        page_location: 'https://calculatorhost.com/calculator/loan/',
        page_referrer: '',
        page_title: document.title,
      },
    ]);
    const serialized = JSON.stringify(commands);
    for (const input of ['50000000', '300000000', '?', '#private-input']) {
      expect(serialized).not.toContain(input);
    }
    expect(commands.filter((command) => command[0] === 'config')).toHaveLength(1);
    expect(commands.filter((command) => command[0] === 'consent')).toHaveLength(0);
  });

  it.each(['localhost', '127.0.0.1', 'branch.calculatorhost.pages.dev'])(
    'keeps every public-service script and initialization blocked on preview host %s',
    (hostname) => {
      const queue = [argumentsRecord('consent', 'default', { analytics_storage: 'denied' })];
      const existingGtag = vi.fn();
      const previewWindow = Object.create(window) as QueueWindow;
      Object.defineProperty(previewWindow, 'location', { value: new URL(`https://${hostname}/`) });
      previewWindow.dataLayer = queue;
      previewWindow.gtag = existingGtag;
      vi.stubGlobal('window', previewWindow);
      render(
        createElement(PublicServices, {
          ...props,
          adsenseClient: 'ca-pub-test',
          naverAnalyticsId: 'test-naver',
        }),
      );
      expect(controls.scripts.size).toBe(0);
      expect(previewWindow.dataLayer).toBe(queue);
      expect(queue).toHaveLength(1);
      expect(previewWindow.gtag).toBe(existingGtag);
      expect(existingGtag).not.toHaveBeenCalled();
    },
  );

  it('preserves noindex advertising and query-sensitive Naver exclusions', () => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, follow';
    document.head.append(robots);
    history.replaceState({}, '', '/calculator/salary/?salary=50000000');
    render(
      createElement(PublicServices, {
        ...props,
        adsenseClient: 'ca-pub-test',
        naverAnalyticsId: 'test-naver',
      }),
    );
    expect(controls.scripts.has('adsbygoogle-init')).toBe(false);
    expect(controls.scripts.has('naver-library')).toBe(false);
    loadGoogle();
    expect(queuedCommands()[1]?.[2]).toMatchObject({ send_page_view: false });
  });
});
