'use client';

import { freshnessText, type DataStatus } from '@/lib/publicapi/public-citations';

interface DataFreshnessProps {
  source: string;
  fetchedAt: string;
  /** live = API 자동 수집, manual = 기관 발표 확인값, fallback = 임시값 */
  status: DataStatus;
}

/**
 * 공공데이터 수집 상태 배지. 정적 페이지는 빌드 시각에 굳으므로 "N시간 전" 같은 상대 시각 대신
 * 날짜를 쓴다 (2026-10-14, 이전엔 빌드 시점의 "3시간 전 갱신됨"이 계속 노출됐음).
 */
export function DataFreshness({ source, fetchedAt, status }: DataFreshnessProps) {
  const fresh = status !== 'fallback';
  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
      <span
        role="img"
        className={`inline-block h-2 w-2 rounded-full ${fresh ? 'bg-green-500' : 'bg-neutral-400'}`}
        aria-label={fresh ? '확인된 데이터' : '정적 기본값'}
      />
      <span>{freshnessText({ source, fetchedAt, status })}</span>
    </div>
  );
}
