/**
 * 공공 데이터 본문 인용 컴포넌트.
 *
 * GEO/AEO 신뢰 신호 강화 — LLM 이 본문에서 정부 통계를 인용할 때 출처 명확.
 * 기본 형태: "기준금리 3.00% (2025-01 기준, 출처: 한국은행 ECOS)"
 *
 * 사용:
 *   import bokRates from '@/data/bok-rates.json';
 *   const rate = getEcosBaseRateCitation(bokRates);
 *   <p>현재 한국은행 기준금리는 <PublicDataCitation citation={rate} />입니다.</p>
 */

import type { PublicCitation } from '@/lib/publicapi/public-citations';
import { formatCitationDateKR } from '@/lib/publicapi/public-citations';

export interface PublicDataCitationProps {
  /** null = 임시값(fallback)이라 수치를 인용하지 않는 경우. 기관 수치처럼 보이는 숫자를 만들지 않는다 */
  citation: PublicCitation | null;
  /** citation 이 null 일 때 문장 자리에 넣을 말 */
  fallbackText?: string;
  /** 인라인 사용 (default true), false 면 블록형 */
  inline?: boolean;
  className?: string;
}

export function PublicDataCitation({
  citation,
  fallbackText = '최신 공식 발표 수치',
  inline = true,
  className = '',
}: PublicDataCitationProps) {
  if (!citation) {
    const Empty = inline ? 'span' : 'div';
    return <Empty className={className}>{fallbackText}</Empty>;
  }
  const dateKR = formatCitationDateKR(citation.date);
  const valueWithUnit = citation.unit
    ? `${citation.value}${citation.unit}`
    : citation.value;

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper className={className} data-public-citation={citation.source}>
      <strong className="font-semibold tabular-nums">{valueWithUnit}</strong>{' '}
      <small className="text-text-tertiary">
        ({dateKR} 기준,{' '}
        {citation.url ? (
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline hover:text-primary-600"
          >
            {citation.source}
          </a>
        ) : (
          citation.source
        )}
        )
      </small>
    </Wrapper>
  );
}
