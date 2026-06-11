import { cn } from '@/lib/utils';

export interface RateBar {
  /** 막대 라벨 (좌측) */
  label: string;
  /** 막대 길이 산정에 쓰는 수치 */
  value: number;
  /** 막대 끝에 표시할 텍스트. 미지정 시 `${value}${unit}` */
  display?: string;
  /** 강조 막대 (진한 색) */
  highlight?: boolean;
}

export interface RateBarChartProps {
  /** 도표 제목 (figure 상단) */
  title: string;
  /** 설명 캡션 (figcaption — 네이버/LLM 추출 + 접근성) */
  caption: string;
  bars: RateBar[];
  /** 값 단위 (기본 '%') */
  unit?: string;
  /** 스케일 최댓값 (미지정 시 막대 중 최댓값) */
  max?: number;
  className?: string;
}

/**
 * 정적 인라인 SVG 가로 막대 도표.
 * - viewBox 기반 → width:100%에서 종횡비 고정 → CLS 0
 * - 외부 이미지/JS 불필요 (SSG에서 즉시 렌더)
 * - <figure>+<figcaption> 으로 네이버 AI 브리핑 "멀티미디어" 축 + WCAG 충족
 */
export function RateBarChart({
  title,
  caption,
  bars,
  unit = '%',
  max,
  className,
}: RateBarChartProps) {
  const maxVal = max ?? Math.max(...bars.map((b) => b.value), 1);
  const rowH = 30;
  const padTop = 8;
  const padBottom = 8;
  const width = 340;
  const labelW = 124;
  const barX = labelW + 8;
  const barMaxW = width - barX - 46;
  const height = bars.length * rowH + padTop + padBottom;

  return (
    <figure className={cn('my-6 rounded-lg border border-border-base bg-bg-card p-4', className)}>
      <div className="mb-3 text-sm font-semibold text-text-primary">{title}</div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full text-text-secondary"
        role="img"
        aria-label={`${title}. ${caption}`}
        preserveAspectRatio="xMinYMin meet"
      >
        {bars.map((b, i) => {
          const cy = padTop + i * rowH + rowH / 2;
          const barW = Math.max((b.value / maxVal) * barMaxW, 1);
          return (
            <g key={i}>
              <text
                x={labelW}
                y={cy}
                textAnchor="end"
                dominantBaseline="central"
                fontSize="11"
                className="fill-current"
              >
                {b.label}
              </text>
              <rect
                x={barX}
                y={cy - 8}
                width={barMaxW}
                height="16"
                rx="3"
                className="fill-primary-500"
                opacity="0.12"
              />
              <rect
                x={barX}
                y={cy - 8}
                width={barW}
                height="16"
                rx="3"
                className={b.highlight ? 'fill-primary-600' : 'fill-primary-500'}
              />
              <text
                x={barX + barW + 5}
                y={cy}
                dominantBaseline="central"
                fontSize="11"
                fontWeight="600"
                className="fill-primary-600"
              >
                {b.display ?? `${b.value}${unit}`}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-text-tertiary">{caption}</figcaption>
    </figure>
  );
}
