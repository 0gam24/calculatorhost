/* eslint-disable @next/next/no-img-element -- 정적 export + images.unoptimized
   환경에서 next/image 가 의미 없음. <picture><source type="image/avif"> 패턴으로
   브라우저 자동 협상. */

/**
 * AvifImage — <picture> 래퍼.
 *
 * 정적 빌드 환경에서 AVIF 우선 + PNG 폴백 패턴 자동.
 * `scripts/convert-images-to-avif.mjs` 가 빌드 시점에 PNG → AVIF 생성하므로
 * 동일 파일명 .avif 가 public/ 에 항상 존재한다고 가정.
 *
 * 사용:
 *   <AvifImage src="/og-default.png" alt="..." width={1200} height={630} />
 *
 * 비-PNG (svg, jpg) 는 AVIF 변환 불가 → 일반 <img> 로 폴백.
 */

import { derivePngToAvif } from '@/lib/seo/avif-image-helper';

export interface AvifImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export function AvifImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
}: AvifImageProps) {
  const avifSrc = derivePngToAvif(src);

  // 비-PNG 또는 AVIF 미가용 → 일반 img
  if (!avifSrc) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    );
  }

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrc} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
