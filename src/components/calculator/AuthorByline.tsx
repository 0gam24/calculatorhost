import Link from 'next/link';

export interface AuthorBylineProps {
  /** 최초 작성일 (YYYY-MM-DD) */
  datePublished?: string;
  /** 최종 갱신일 (YYYY-MM-DD) */
  dateModified: string;
}

export function AuthorByline({ datePublished, dateModified }: AuthorBylineProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-text-tertiary">
      <span>
        작성·검수:{' '}
        <Link href="/about/" className="font-medium text-text-secondary underline hover:text-primary-700">
          김준혁
        </Link>{' '}
        <span className="text-text-tertiary">(스마트데이터샵)</span>
      </span>
      <span aria-hidden="true">·</span>
      {datePublished && (
        <>
          <span>
            <span className="sr-only">최초 발행일 </span>
            발행 <time dateTime={datePublished}>{datePublished}</time>
          </span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <span>
        <span className="sr-only">최종 갱신일 </span>
        갱신 <time dateTime={dateModified}>{dateModified}</time>
      </span>
    </div>
  );
}
