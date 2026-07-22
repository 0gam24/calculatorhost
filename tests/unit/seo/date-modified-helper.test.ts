import { describe, it, expect } from 'vitest';
import {
  getDateModifiedFromManifest,
  getLastModifiedForRoute,
  type DateModifiedManifest,
} from '@/lib/seo/date-modified-helper';

const SOURCE: DateModifiedManifest = {
  '/': '2026-06-10T09:26:46+09:00',
  '/calculator/salary/': '2026-07-05T07:01:19+09:00',
  '/guide/some-guide/': '2026-07-19T02:55:00+09:00',
  '/broken/': 'not-a-date',
};

describe('getDateModifiedFromManifest', () => {
  it('URL pathname 으로 manifest 를 조회한다', () => {
    expect(
      getDateModifiedFromManifest('https://calculatorhost.com/calculator/salary/', SOURCE),
    ).toBe('2026-07-05T07:01:19+09:00');
  });

  it('미등록 경로는 undefined', () => {
    expect(
      getDateModifiedFromManifest('https://calculatorhost.com/nope/', SOURCE),
    ).toBeUndefined();
  });

  it('잘못된 URL 은 undefined', () => {
    expect(getDateModifiedFromManifest('not a url', SOURCE)).toBeUndefined();
  });
});

describe('getLastModifiedForRoute (sitemap lastmod 용)', () => {
  const fallback = () => '2000-01-01T00:00:00.000Z';

  it('manifest 에 있으면 git 커밋 시각을 UTC ISO 로 반환한다', () => {
    expect(getLastModifiedForRoute('/calculator/salary/', fallback, SOURCE)).toBe(
      new Date('2026-07-05T07:01:19+09:00').toISOString(),
    );
  });

  it('루트 경로도 조회된다', () => {
    expect(getLastModifiedForRoute('/', fallback, SOURCE)).toBe(
      new Date('2026-06-10T09:26:46+09:00').toISOString(),
    );
  });

  it('미등록 경로는 fallback 을 사용한다', () => {
    expect(getLastModifiedForRoute('/unknown/', fallback, SOURCE)).toBe(
      '2000-01-01T00:00:00.000Z',
    );
  });

  it('manifest 값이 유효한 날짜가 아니면 fallback 을 사용한다', () => {
    expect(getLastModifiedForRoute('/broken/', fallback, SOURCE)).toBe(
      '2000-01-01T00:00:00.000Z',
    );
  });
});
