import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border-base bg-bg-base">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold">calculatorhost</h3>
            <p className="text-sm text-text-secondary">
              한국 생활 금융·세금 계산기를 2026년 최신 기준으로 제공하는 무료 서비스.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">계산기</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>
                <Link href="/calculator/salary">연봉 실수령액</Link>
              </li>
              <li>
                <Link href="/calculator/capital-gains-tax">양도소득세</Link>
              </li>
              <li>
                <Link href="/calculator/acquisition-tax">취득세</Link>
              </li>
              <li>
                <Link href="/calculator/loan">대출이자</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">정보</h3>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>
                <Link href="/about">소개</Link>
              </li>
              <li>
                <Link href="/privacy">개인정보처리방침</Link>
              </li>
              <li>
                <Link href="/terms">이용약관</Link>
              </li>
              <li>
                <Link href="/contact">문의</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border-subtle pt-6 text-caption text-text-tertiary">
          <p>
            본 사이트의 계산 결과는 참고용이며 법적 효력이 없습니다. 실제 금융·세무 처리는
            전문가의 안내를 받으시기 바랍니다.
          </p>
          <p className="mt-2">
            세율·공제·법조항은 운영자가 국세청·기재부·한국은행 등 1차 출처를 직접 확인하여
            반영합니다. 콘텐츠 작성에 AI 도구를 보조적으로 활용하며 모든 결과물은 운영자가
            최종 검토합니다.{' '}
            <Link href="/about" className="underline">콘텐츠 정책 및 운영 원칙 자세히 보기</Link>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} calculatorhost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
