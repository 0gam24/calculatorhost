'use client';

/**
 * 대출 잔금 추이 차트 (Recharts LineChart)
 * LoanCalculator에서 동적 import로 사용되므로 별도 파일 분리.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatKRW } from '@/lib/utils';

interface ChartDataPoint {
  month: number;
  balance: number;
}

interface LoanChartProps {
  data: ChartDataPoint[];
}

export default function LoanChart({ data }: LoanChartProps) {
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
              return [formatKRW(value), '잔금'];
            }
            return [value, '잔금'];
          }}
          labelFormatter={(label: number | string) => {
            if (typeof label === 'number') {
              return `${label}개월`;
            }
            return label;
          }}
        />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="var(--primary-500)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
