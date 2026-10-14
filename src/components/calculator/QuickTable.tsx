import type { QuickTableData } from '@/lib/quick-tables/types';

/**
 * 계산기 바로 아래의 "구간별 바로 보기" 표. 입력하지 않아도 대표값을 읽을 수 있다.
 * 숫자는 src/lib/quick-tables 빌더가 계산기와 같은 순수 함수로 빌드 때 만든다.
 */
export function QuickTable({ data }: { data: QuickTableData }) {
  return (
    <section aria-label={data.title} className="card flex flex-col gap-3">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] text-sm" data-speakable>
          <caption className="mb-2 text-left text-text-tertiary">{data.caption}</caption>
          <thead>
            <tr className="border-b border-border-base">
              {data.headers.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-3 py-2 font-semibold text-text-secondary ${i === 0 ? 'text-left' : 'text-right'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r[0]} className="border-b border-border-subtle last:border-0">
                <th
                  scope="row"
                  className="whitespace-nowrap px-3 py-2 text-left font-medium text-text-primary"
                >
                  {r[0]}
                </th>
                {r.slice(1).map((cell, i) => (
                  <td
                    key={data.headers[i + 1]}
                    className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-text-secondary"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-text-tertiary">{data.note}</p>
    </section>
  );
}
