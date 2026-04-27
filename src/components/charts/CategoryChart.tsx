'use client';

import type { ReactNode } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const mockData: CategoryData[] = [
  { name: '세금', value: 10, color: '#00FF88' },
  { name: '금융', value: 8, color: '#9D4EFF' },
  { name: '부동산', value: 5, color: '#00D4FF' },
  { name: '근로', value: 2, color: '#FF3B5C' },
  { name: '생활', value: 2, color: '#F7C159' },
];

const CustomTooltip = ({ active, payload }: TooltipProps): ReactNode => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0];
  if (!data) {
    return null;
  }

  return (
    <div
      className="rounded-lg p-3 backdrop-blur-xl border border-border-base"
      style={{
        background: 'rgba(20, 25, 40, 0.8)',
        color: '#FFFFFF',
      }}
    >
      <p className="text-xs font-semibold" style={{ color: data.color }}>
        {data.name}
      </p>
      <p className="text-xs text-text-secondary">
        {data.value} 개
      </p>
    </div>
  );
};

export function CategoryChart(): ReactNode {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={2}
          dataKey="value"
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: '20px',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
          formatter={(value: string): ReactNode => {
            const data = mockData.find((d) => d.name === value);
            return (
              <span style={{ color: data?.color }}>
                {value} ({data?.value})
              </span>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
