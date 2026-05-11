// ralph-link-health.mjs unit tests.
// Verifies that the IGNORE_DOMAINS whitelist suppresses false-positive
// stuck.md entries for AdSense trackers and the NTS root domain (which
// returns 4xx under bot probes despite being healthy).
import { describe, expect, it } from 'vitest';
import { IGNORE_DOMAINS, isIgnored } from '../../../scripts/link-health-config.mjs';

describe('IGNORE_DOMAINS', () => {
  it('exports a Set instance', () => {
    expect(IGNORE_DOMAINS).toBeInstanceOf(Set);
  });

  it('includes Google AdSense tracker domains', () => {
    expect(IGNORE_DOMAINS.has('adservice.google.com')).toBe(true);
    expect(IGNORE_DOMAINS.has('pagead2.googlesyndication.com')).toBe(true);
  });

  it('includes the NTS root domain (bot blocking 400)', () => {
    expect(IGNORE_DOMAINS.has('www.nts.go.kr')).toBe(true);
  });
});

describe('isIgnored()', () => {
  it('returns true for whitelisted domains', () => {
    expect(isIgnored('adservice.google.com')).toBe(true);
    expect(isIgnored('www.nts.go.kr')).toBe(true);
  });

  it('returns false for ordinary domains', () => {
    expect(isIgnored('www.bok.or.kr')).toBe(false);
    expect(isIgnored('example.com')).toBe(false);
  });

  it('handles empty string and undefined safely', () => {
    expect(isIgnored('')).toBe(false);
    expect(isIgnored(undefined)).toBe(false);
  });
});
