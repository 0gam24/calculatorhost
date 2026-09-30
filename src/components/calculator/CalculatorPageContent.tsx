import type { ReactNode } from 'react';

interface Props {
  intro: ReactNode;
  calculator: ReactNode;
  children: ReactNode;
  related?: ReactNode;
  faq?: ReactNode;
  tools?: ReactNode;
}

/** The same reading order on every calculator: purpose, inputs/results, next step, evidence. */
export function CalculatorPageContent({ intro, calculator, children, related, faq, tools }: Props) {
  return (
    <div className="calculator-page-content mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="calculator-intro">{intro}</div>
      <div data-calculator-workspace>{calculator}</div>
      <p className="text-sm text-text-tertiary">
        입력한 조건으로 계산한 참고값입니다. 적용 기준과 가정은 아래에서 확인할 수 있습니다.
      </p>
      <details className="evidence-panel">
        <summary>
          계산 기준{' '}
          <span className="text-sm font-normal text-text-tertiary">산식 · 가정 · 공식 출처</span>
        </summary>
        <div className="flex flex-col gap-5 border-t border-border-subtle pt-5">{children}</div>
      </details>
      {faq ? (
        <details className="evidence-panel">
          <summary>자주 묻는 질문</summary>
          <div className="pt-4">{faq}</div>
        </details>
      ) : null}
      {related}
      {tools ? (
        <details className="evidence-panel">
          <summary>공유 · 퍼가기</summary>
          <div className="flex flex-col gap-5 pt-4">{tools}</div>
        </details>
      ) : null}
    </div>
  );
}
