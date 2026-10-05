import { describe, expect, it } from 'vitest';
import { localQaOrigin, localQaRequestUrl, qaRequestAction } from '../support/network-policy';

describe('QA network isolation before transmission', () => {
  it.each(['http://localhost:3000', 'http://127.0.0.1:3100', 'http://[::1]:3100'])(
    'accepts only an explicit loopback server: %s', (url) => expect(localQaOrigin(url)).toBe(new URL(url).origin),
  );
  it.each([undefined, 'https://calculatorhost.com', 'https://branch.calculatorhost.pages.dev',
    'http://localhost.example.com', 'http://user:password@localhost:3000', 'http://localhost:3000?x=1'])(
    'rejects unsafe configuration before browser navigation: %s', (url) => expect(() => localQaOrigin(url)).toThrow(),
  );
  it.each(['https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    'https://www.google-analytics.com/g/collect', 'https://wcs.naver.net/wcslog.js',
    'https://static.cloudflareinsights.com/beacon.min.js', 'https://unknown.example/collect',
    'http://localhost:3101/pixel', 'https://localhost:3100/pixel'])(
    'denies every outside origin including unlisted destinations: %s', (url) => {
      expect(qaRequestAction(url, 'GET', 'http://localhost:3100')).toBe('abort');
    },
  );
  it('permits static local GET and mocks APIs without invoking the server proxy', () => {
    expect(qaRequestAction('http://localhost:3100/calculator/loan/', 'GET', 'http://localhost:3100')).toBe('local');
    expect(qaRequestAction('http://localhost:3100/api/address', 'GET', 'http://localhost:3100')).toBe('mock-api');
    expect(qaRequestAction('http://localhost:3100/collect', 'POST', 'http://localhost:3100')).toBe('abort');
  });
  it('APIRequestContext refuses external destinations and local external-data proxies', () => {
    expect(localQaRequestUrl('/robots.txt', 'http://localhost:3100')).toBe('http://localhost:3100/robots.txt');
    expect(() => localQaRequestUrl('https://calculatorhost.com/sitemap.xml', 'http://localhost:3100')).toThrow();
    expect(() => localQaRequestUrl('/api/address', 'http://localhost:3100')).toThrow();
  });
});
