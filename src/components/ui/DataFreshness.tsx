'use client';

interface DataFreshnessProps {
  source: string;
  fetchedAt: string;
  isLive: boolean;
}

// Helper: Simple time-ago formatter (Korean)
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '방금';
  if (diffMins < 60) return `${diffMins}분`;
  if (diffHours < 24) return `${diffHours}시간`;
  if (diffDays < 7) return `${diffDays}일`;
  return date.toLocaleDateString('ko-KR');
}

export function DataFreshness({ source, fetchedAt, isLive }: DataFreshnessProps) {
  const timeAgo = formatTimeAgo(fetchedAt);

  return (
    <div className="mt-4 flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
      <span
        role="img"
        className={`inline-block h-2 w-2 rounded-full ${
          isLive ? 'bg-green-500' : 'bg-neutral-400'
        }`}
        aria-label={isLive ? '실시간 데이터' : '정적 기본값'}
      />
      <span>
        <strong>{source}</strong>{' '}
        {isLive ? (
          <>
            <span>{timeAgo} 전</span> 갱신됨
          </>
        ) : (
          <>
            정적 기본값 (실시간 갱신 대기 중)
          </>
        )}
      </span>
    </div>
  );
}
