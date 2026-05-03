/**
 * 어필리에이트 추천 박스 — 계산기 결과 옆/하단에 자연스럽게 배치
 *
 * 디자인 원칙:
 * - 광고 같지 않게 (광고 라벨은 작게, 정보 가치 우선)
 * - 사용자 의도 매칭 (계산기 결과와 직접 관련된 서비스만)
 * - 한 페이지당 최대 1개 (스팸 회피)
 *
 * 사용 예 (freelancer-tax 페이지):
 * ```tsx
 * <AffiliateRecommendation
 *   icon="💼"
 *   title="환급금 받기 어려우신가요?"
 *   description="복잡한 종합소득세 신고를 전문 세무사가 도와드립니다."
 *   ctaText="삼쩜삼에서 환급금 조회"
 *   ctaHref={process.env.NEXT_PUBLIC_AFFILIATE_3O3_URL}
 *   partner="삼쩜삼"
 *   benefits={['평균 환급금 약 17만원', '5분 진단 완료', '수수료 환급금의 일부']}
 * />
 * ```
 *
 * env var 가 없으면 컴포넌트 자체가 렌더링 안 됨 (운영자 가입 전 자연 비활성).
 */

export interface AffiliateRecommendationProps {
  /** 헤더 이모지 */
  icon: string;
  /** 추천 박스 제목 (질문 형식 권장) */
  title: string;
  /** 본문 설명 (1~2 문장) */
  description: string;
  /** CTA 버튼 텍스트 */
  ctaText: string;
  /** 어필리에이트 URL (env var 주입) */
  ctaHref: string | undefined;
  /** 파트너명 (예: "삼쩜삼", "쿠팡파트너스") */
  partner: string;
  /** 강조 포인트 3개 (선택) */
  benefits?: string[];
  /** 면책 문구 (기본값 사용 가능) */
  disclaimer?: string;
}

export function AffiliateRecommendation({
  icon,
  title,
  description,
  ctaText,
  ctaHref,
  partner,
  benefits,
  disclaimer,
}: AffiliateRecommendationProps) {
  // env var 미설정 또는 placeholder 시 비표시
  if (!ctaHref || ctaHref.includes('YOUR_') || ctaHref.length < 10) {
    return null;
  }

  const finalDisclaimer =
    disclaimer ??
    `본 추천은 ${partner} 어필리에이트 파트너 링크를 포함합니다. 클릭·전환 시 calculatorhost가 일정 수수료를 받을 수 있으나 사용자 결제 금액에는 영향이 없습니다.`;

  return (
    <aside
      aria-label={`${partner} 추천`}
      className="card border-l-4 border-l-primary-500 bg-primary-500/5"
    >
      {/* 광고 라벨 — 표시광고법 준수 */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
        📢 광고 · 어필리에이트 (Affiliate)
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="text-3xl" aria-hidden="true">
          {icon}
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>

          {benefits && benefits.length > 0 && (
            <ul className="mt-2 space-y-1">
              {benefits.map((b, i) => (
                <li key={i} className="text-sm text-text-secondary">
                  ✓ {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={ctaHref}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            >
              {ctaText} →
            </a>
            <span className="text-[11px] text-text-tertiary">{partner} 페이지로 이동</span>
          </div>
        </div>
      </div>

      <p className="mt-3 border-t border-border-subtle pt-2 text-[11px] leading-relaxed text-text-tertiary">
        {finalDisclaimer}{' '}
        <a href="/affiliate-disclosure/" className="underline hover:text-text-secondary">
          전체 정책 보기
        </a>
      </p>
    </aside>
  );
}
