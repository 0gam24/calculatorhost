/**
 * MainBackrefBox — 메인 사이트(smartdatashop.kr) 출처 backref.
 *
 * smartdatashop network 5사이트 한 덩어리 운영의 핵심 메커니즘.
 * 자매(calculatorhost)의 다크 Fintech 디자인을 그대로 두고, 본 박스에서만
 * 메인 토큰(#8b1538 accent + #faf7f0 wheat)을 사용해 독자가 "메인 출처"
 * 를 시각적으로 인식하도록 한다.
 *
 * NETWORK.md v0.6 dual-brand 자매 자율성 규약에 따른 의도적 색상 예외.
 * (calculatorhost components 룰 "토큰만 사용" 의 cross-network 예외)
 *
 * 의존성: 외부 아이콘 라이브러리 미사용(인라인 SVG) — First Load JS 영향 0.
 */

interface MainBackrefBoxProps {
  /** 메인 펄스(개별 글) 직접 link — 있으면 우선 사용 */
  mainPulseUrl?: string;
  /** 메인 카테고리 hub link — 펄스 없을 때 fallback */
  mainCategoryUrl?: string;
  /** 메인 펄스 제목 — 표시 시 부제로 사용 */
  pulseTitle?: string;
  /** 박스 제목 — 기본 "본 데이터 출처" */
  title?: string;
  /** 위치별 컨테이너 스타일 */
  variant?: 'inline' | 'sidebar' | 'footer';
}

const MAIN_HOME = 'https://smartdatashop.kr/';

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function MainBackrefBox({
  mainPulseUrl,
  mainCategoryUrl,
  pulseTitle,
  title = '본 데이터 출처',
  variant = 'inline',
}: MainBackrefBoxProps) {
  const targetUrl = mainPulseUrl ?? mainCategoryUrl ?? MAIN_HOME;
  const subtitle = pulseTitle ?? '한국 정부·공공기관 1차 출처 데이터 저널';

  const containerClass = {
    inline: 'my-8 max-w-2xl',
    sidebar: 'sticky top-4',
    footer: 'mx-auto mt-12 max-w-4xl',
  }[variant];

  return (
    <aside
      className={`${containerClass} rounded-r-md border-l-4 border-[#8b1538] bg-[#faf7f0] p-4 shadow-sm dark:bg-[#1a1a1a]`}
      aria-label="메인 사이트 출처"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8b1538] dark:text-[#c9395f]">
            📊 {title}
          </p>
          <p className="mb-2 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {subtitle}
          </p>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#8b1538] hover:underline dark:text-[#c9395f]"
          >
            검증·해설 →{' '}
            <span className="font-extrabold">smartdatashop.kr</span>
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default MainBackrefBox;
