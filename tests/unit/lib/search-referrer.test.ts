import { describe, expect, it } from 'vitest';
import { getSearchReferrerOrigin } from '@/lib/analytics/search-referrer';

describe('Privacy-safe search referrer origins', () => {
  it.each(['google.com', 'www.google.com', 'google.co.kr', 'www.google.co.kr'])(
    'maps exact Google host %s to one fixed origin',
    (host) => {
      expect(
        getSearchReferrerOrigin(`https://${host}/search?q=private-search#private-fragment`),
      ).toBe('https://www.google.com/');
    },
  );
  it.each(['naver.com', 'www.naver.com', 'm.naver.com', 'search.naver.com', 'm.search.naver.com'])(
    'maps exact Naver host %s to one fixed origin',
    (host) => {
      expect(
        getSearchReferrerOrigin(
          `https://${host}/search.naver?query=private-search#private-fragment`,
        ),
      ).toBe('https://search.naver.com/');
    },
  );
  it('recognizes case and HTTP without copying the original scheme or path', () => {
    expect(getSearchReferrerOrigin('HTTP://WWW.GOOGLE.COM/search?q=private')).toBe(
      'https://www.google.com/',
    );
  });
  it.each([
    '',
    'not-a-url',
    '/search',
    '//www.google.com/search',
    'javascript:https://www.google.com/',
    'ftp://www.google.com/',
    'https://www.google.com.evil.example/',
    'https://evil-google.com/',
    'https://search.naver.com.evil.example/',
    'https://unknown.example/?utm_source=google',
    'https://calculatorhost.com/calculator/salary/?salary=private',
    'https://www.calculatorhost.com/',
    'https://calculatorhost.pages.dev/',
    'https://www.google.com@evil.example/',
    'https://evil.example@www.google.com/',
    'https://user:private@www.google.com/',
    'https://user:private@search.naver.com/',
    'https://www.%67oogle.com/',
    'https://www.google%2ecom/',
    'https://www.google.com%2e/',
    'https://www.google.com./',
    'https://www.google.com:443/',
    'http://www.google.com:80/',
    'https://search.naver.com:8443/',
    ' https://www.google.com/',
    'https://www.google.com/ ',
    'https://www.goo\tgle.com/',
    'https://www.google.com\\@evil.example/',
    'https://ｗｗｗ.google.com/',
  ])('rejects ambiguous, internal or unsupported referrer %s', (referrer) => {
    expect(getSearchReferrerOrigin(referrer)).toBe('');
  });
});
