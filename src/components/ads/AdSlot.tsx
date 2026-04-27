/**
 * AdSense 슬롯 컴포넌트
 *
 * 규칙 (adsense-guardian 에이전트 감수):
 * - 라이트 배경 강제 (다크 테마와 충돌 방지, AdSense 가독성)
 * - min-height 고정 (CLS 방지, LCP 영향 최소화)
 * - "광고" 라벨 명시 (AdSense 정책 §6)
 * - strategy="lazyOnload" (layout.tsx 에서 스크립트 로드)
 * - dev 환경에서는 placeholder 만 표시 (자기 클릭 방지)
 *
 * 관련: .claude/skills/adsense-policy-reference/REFERENCE.md §3, §6, §11
 */

import { cn } from '@/lib/utils';

export type AdFormat = 'horizontal' | 'rectangle' | 'vertical' | 'fluid' | 'anchor';

export interface AdSlotProps {
  /** AdSense 슬롯 ID (ca-pub-xxx/슬롯코드). slot prop 으로 구분 */
  slot: string;
  format?: AdFormat;
  className?: string;
}

const FORMAT_CLASSES: Record<AdFormat, string> = {
  horizontal: 'min-h-[60px] md:min-h-[100px] lg:min-h-[250px]',
  rectangle: 'min-h-[250px]',
  vertical: 'min-h-[600px]',
  fluid: 'min-h-[200px]',
  anchor: 'min-h-[50px] md:min-h-[90px]',
};

export function AdSlot({ slot, format = 'rectangle', className }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isDev = process.env.NODE_ENV !== 'production';

  // slot prop 이 numeric (실제 AdSense 광고 단위 ID) 이면 그대로 사용
  // 그 외엔 환경변수 NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT 로 fallback
  const isNumericSlot = /^\d+$/.test(slot);
  const adSlotId = isNumericSlot
    ? slot
    : process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT;

  const canRenderAd = !isDev && client && adSlotId;

  return (
    <aside
      aria-label="광고"
      className={cn('ad-slot', FORMAT_CLASSES[format], className)}
      data-slot={slot}
    >
      <span className="ad-slot-label">광고</span>

      {!canRenderAd ? (
        <div className="flex h-full min-h-[220px] items-center justify-center text-caption text-gray-400">
          [AdSense placeholder — slot: {slot}]
        </div>
      ) : (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </aside>
  );
}
