'use client';

/**
 * 적금 누적 잔액 추이 차트 (Recharts LineChart)
 * SavingsCalculator에서 동적 import로 사용되므로 별도 파일 분리.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatKRW } from '@/lib/utils';

interface ChartDataPoint {
  month: number;
  principal: number;
  pretax: number;
  posttax: number;
}

interface SavingsChartProps {
  data: ChartDataPoint[];
}

export default function SavingsChart({ data }: SavingsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-base)" />
        <XAxis
          dataKey="month"
          stroke="var(--text-secondary)"
          style={{ fontSize: '12px' }}
          label={{ value: '개월', position: 'insideBottomRight', offset: -5, fontSize: 12 }}
        />
        <YAxis
          stroke="var(--text-secondary)"
          style={{ fontSize: '12px' }}
          tickFormatter={(value: number | string) => {
            if (typeof value !== 'number') return '';
            if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}억`;
            if (value >= 10_000) return `${(value / 10_000).toFixed(0)}만`;
            return value.toString();
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-base)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
          }}
          formatter={(value: number | string) => {
            if (typeof value === 'number') {
              return [formatKRW(value), ''];
            }
            return [value, ''];
          }}
          labelFormatter={(label: number | string) => {
            if (typeof label === 'number') {
              return `${label}개월`;
            }
            return label;
          }}
        />
        <Legend
          wrapperStyle={{
            color: 'var(--text-secondary)',
            fontSize: '12px',
          }}
        />
        <Line
          type="monotone"
          dataKey="principal"
          name="원금"
          stroke="var(--secondary-500)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="posttax"
          name="세후 수령액"
          stroke="var(--primary-500)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
