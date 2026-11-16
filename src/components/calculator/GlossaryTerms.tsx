import type { DefinedTermEntry } from '@/lib/seo/jsonld';

interface GlossaryTermsProps {
  /** buildDefinedTermSetJsonLd 의 name 과 같은 값 */
  name: string;
  /** buildDefinedTermSetJsonLd 의 terms 와 같은 배열 */
  terms: DefinedTermEntry[];
}

/**
 * DefinedTermSet JSON-LD 의 용어 정의를 화면에도 보여주는 접힘 카드.
 * 구조화 데이터는 페이지에 실제로 있는 내용을 기술해야 한다 (네이버 구조화 데이터 08-01).
 * id="glossary" 는 DefinedTermSet url 의 #glossary 와 맞춘다.
 */
export function GlossaryTerms({ name, terms }: GlossaryTermsProps) {
  return (
    <details id="glossary" className="card">
      <summary className="cursor-pointer font-semibold">{name}</summary>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
        {terms.map((term) => (
          <div key={term.name}>
            <dt className="font-semibold text-text-primary">
              {term.name}
              {term.alternateName ? ` (${term.alternateName})` : null}
            </dt>
            <dd className="mt-1">{term.description}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
