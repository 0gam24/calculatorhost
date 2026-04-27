'use client';

import type { ReactNode } from 'react';
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

interface DataPoint {
  month: string;
  requests: number;
  users: number;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  payload: DataPoint;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const mockData: DataPoint[] = [
  { month: '1월', requests: 240, users: 24 },
  { month: '2월', requests: 320, users: 34 },
  { month: '3월', requests: 280, users: 28 },
  { month: '4월', requests: 450, users: 45 },
  { month: '5월', requests: 520, users: 52 },
  { month: '6월', requests: 680, users: 68 },
  { month: '7월', requests: 720, users: 72 },
  { month: '8월', requests: 850, users: 85 },
  { month: '9월', requests: 920, users: 92 },
  { month: '10월', requests: 1100, users: 110 },
  { month: '11월', requests: 1280, users: 128 },
  { month: '12월', requests: 1450, users: 145 },
];

const CustomTooltip = ({ active, payload }: TooltipProps): ReactNode => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const firstPayload = payload[0];
  if (!firstPayload) {
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
      <p className="text-xs font-semibold text-primary-500">{firstPayload.payload.month}</p>
      {payload.map((entry: TooltipPayload, idx: number) => (
        <p
          key={idx}
          className="text-xs"
          style={{ color: entry.color }}
        >
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function ActivityChart(): ReactNode {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData}>
        <defs>
          <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9D4EFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#9D4EFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255, 255, 255, 0.08)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          stroke="rgba(255, 255, 255, 0.4)"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="rgba(255, 255, 255, 0.4)"
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: '20px',
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        />
        <Line
          type="monotone"
          dataKey="requests"
          stroke="#00FF88"
          strokeWidth={2.5}
          dot={false}
          name="계산 요청"
          fillOpacity={1}
          fill="url(#colorRequests)"
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#9D4EFF"
          strokeWidth={2.5}
          dot={false}
          name="활성 사용자"
          fillOpacity={1}
          fill="url(#colorUsers)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
