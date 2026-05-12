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
  citation: PublicCitation;
  /** 인라인 사용 (default true) — false 면 블록형 */
  inline?: boolean;
  className?: string;
}

export function PublicDataCitation({
  citation,
  inline = true,
  className = '',
}: PublicDataCitationProps) {
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
