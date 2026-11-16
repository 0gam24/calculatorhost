import type { HowToStep } from '@/lib/seo/jsonld';

interface HowToStepsProps {
  /** buildHowToJsonLd 의 name 과 같은 값 */
  name: string;
  /** buildHowToJsonLd 의 steps 와 같은 배열 */
  steps: HowToStep[];
}

/**
 * HowTo JSON-LD 의 단계를 화면에도 보여주는 접힘 카드.
 * 구조화 데이터는 페이지에 실제로 있는 내용을 기술해야 한다 (네이버 구조화 데이터 08-01·08-06).
 * 같은 배열을 buildHowToJsonLd 와 이 컴포넌트에 함께 넘긴다.
 */
export function HowToSteps({ name, steps }: HowToStepsProps) {
  return (
    <details className="card">
      <summary className="cursor-pointer font-semibold">{name}</summary>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
        {steps.map((step) => (
          <li key={step.name}>
            <strong className="font-semibold text-text-primary">{step.name}</strong>: {step.text}
          </li>
        ))}
      </ol>
    </details>
  );
}
