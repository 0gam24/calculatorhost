/**
 * GEO/AEO 전용 컴포넌트 (ADR-006)
 *
 * 리드 문단 직후 필수 배치:
 * - 정의 블록 (50-80자)
 * - 핵심 수치 테이블 (3-5행, HTML table)
 * - TL;DR 박스
 *
 * LLM(ChatGPT/Gemini/AI Overview)이 인용할 수 있도록 구조화.
 */

import { cn } from '@/lib/utils';

export interface StructuredSummaryProps {
  definition: string;
  table: {
    caption: string;
    headers: [string, string];
    rows: Array<[string, string]>;
  };
  tldr: string[];
  className?: string;
}

export function StructuredSummary({
  definition,
  table,
  tldr,
  className,
}: StructuredSummaryProps) {
  return (
    <section
      aria-label="핵심 요약"
      className={cn('card flex flex-col gap-5 border-primary-500/30', className)}
    >
      <div>
        <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
          정의
        </h2>
        {/* GEO/AEO: 정의 블록도 음성·AI 인용 대상 (Speakable 셀렉터 매칭) */}
        <p className="text-base leading-relaxed" data-speakable>
          {definition}
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
          핵심 수치
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">{table.caption}</caption>
            <thead>
              <tr className="border-b border-border-base text-left">
                <th scope="col" className="py-2 pr-4 font-semibold text-text-secondary">
                  {table.headers[0]}
                </th>
                <th scope="col" className="py-2 font-semibold text-text-secondary text-right tabular-nums">
                  {table.headers[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map(([key, val]) => (
                <tr key={key} className="border-b border-border-subtle last:border-0">
                  <td className="py-2 pr-4">{key}</td>
                  <td className="py-2 text-right tabular-nums font-medium">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
          한눈에 보기
        </h2>
        <ul className="space-y-1.5 text-sm" data-speakable>
          {tldr.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary-500" aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
