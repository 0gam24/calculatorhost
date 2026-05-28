import React from 'react';
import { Breadcrumb, type BreadcrumbItem } from '@/components/layout/Breadcrumb';

/**
 * 가이드 페이지 헤더 컴포넌트
 *
 * 시각적 위계 강화:
 * - Breadcrumb: 작은 회색 (페이지 위치)
 * - meta: xs 크기, 더 연한 회색 (부수 정보)
 * - title: 4xl~5xl 대크기, 넉넉한 위 여백 (시각 무게감)
 * - subtitle: 별도 라인, xl~2xl 중간 크기 (title과 구분)
 * - lead: h1·subtitle과 큰 여백 분리, 좌측 보더 강조
 *
 * data-speakable:
 * - 리드 첫 문장만 부여 (음성 검색 최적화)
 * - subtitle도 필요 시 추가 가능
 */

export interface GuideHeaderProps {
  /** 경로 항목 배열 */
  breadcrumbItems: BreadcrumbItem[];

  /** 카테고리 (필수) — "세금" | "금융" | "부동산" 등 */
  category: string;

  /** 읽기 소요 시간 (분) */
  readingMinutes: number;

  /** 발행 일자 (YYYY-MM-DD 형식) */
  publishedDate: string;

  /** H1 제목 텍스트 */
  title: string;

  /** 부제목 텍스트 (선택) — "— " 접두 자동 처리 안 함. 호출자가 포함 */
  subtitle?: string;

  /** 리드 문단 (React.ReactNode) */
  lead: React.ReactNode;

  /** 추가 className (거의 불필요) */
  className?: string;
}

/**
 * 사용 예:
 * <GuideHeader
 *   breadcrumbItems={[
 *     { name: '홈', href: '/' },
 *     { name: '가이드', href: '/guide/' },
 *     { name: '사업소득 vs 기타소득' },
 *   ]}
 *   category="세금"
 *   readingMinutes={13}
 *   publishedDate="2026-05-28"
 *   title="사업소득 vs 기타소득 분류 기준 2026"
 *   subtitle="— 강사·프리랜서 5월 신고 필독"
 *   lead={<p data-speakable>프리랜서·강사라면... <strong>세금이 2배</strong>달라집니다.</p>}
 * />
 */
export function GuideHeader({
  breadcrumbItems,
  category,
  readingMinutes,
  publishedDate,
  title,
  subtitle,
  lead,
  className,
}: GuideHeaderProps) {
  return (
    <header className={className}>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* meta: 카테고리 · 읽기시간 · 발행일 */}
      <p className="mb-4 text-xs text-text-tertiary">
        {category} · {readingMinutes}분 읽기 · {publishedDate}
      </p>

      {/* H1 title — 압도적 크기 + 위 여백 */}
      <h1 className="mb-3 mt-3 text-4xl font-bold tracking-tight leading-tight md:text-5xl">
        {title}
      </h1>

      {/* subtitle (선택) — 별도 라인, 중간 크기, title과 시각적 구분 */}
      {subtitle && (
        <p className="mb-6 mt-2 text-xl font-medium text-text-secondary md:text-2xl">{subtitle}</p>
      )}

      {/* lead 문단 — 큰 여백 분리, 좌측 보더 강조 */}
      <div className="border-l-4 border-l-primary-500 pl-4">
        <div className="text-lg text-text-secondary leading-relaxed">{lead}</div>
      </div>
    </header>
  );
}
