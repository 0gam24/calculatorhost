/**
 * AvifImage helper — pure functions for PNG → AVIF path derivation.
 *
 * 정적 빌드 (`output: 'export'`, `images.unoptimized: true`) 환경에서
 * <picture><source type="image/avif"><img src="...png"></picture> 패턴으로
 * 브라우저 자동 협상. Lighthouse "modern image formats" 항목 만족.
 */

export function isPng(src: string): boolean {
  return /\.png$/i.test(src);
}

export function derivePngToAvif(src: string): string | null {
  if (!isPng(src)) return null;
  return src.replace(/\.png$/i, '.avif');
}
