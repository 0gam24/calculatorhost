// AvifImage helper unit tests.
// Verifies PNG → AVIF path derivation for <picture><source> AVIF-first pattern.
import { describe, expect, it } from 'vitest';
import { derivePngToAvif, isPng } from '@/lib/seo/avif-image-helper';

describe('isPng()', () => {
  it('returns true for .png extension (case-insensitive)', () => {
    expect(isPng('/og.png')).toBe(true);
    expect(isPng('/icon.PNG')).toBe(true);
  });
  it('returns false for non-png', () => {
    expect(isPng('/icon.svg')).toBe(false);
    expect(isPng('/icon.jpg')).toBe(false);
    expect(isPng('/icon')).toBe(false);
  });
});

describe('derivePngToAvif()', () => {
  it('replaces .png with .avif preserving path', () => {
    expect(derivePngToAvif('/og-default.png')).toBe('/og-default.avif');
    expect(derivePngToAvif('/folder/icon.png')).toBe('/folder/icon.avif');
  });
  it('returns null for non-png input', () => {
    expect(derivePngToAvif('/icon.svg')).toBeNull();
    expect(derivePngToAvif('')).toBeNull();
  });
  it('handles uppercase PNG', () => {
    expect(derivePngToAvif('/OG.PNG')).toBe('/OG.avif');
  });
});
