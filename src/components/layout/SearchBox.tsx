'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/* ─── 검색 대상 데이터 (정적) ───
 * 계산기 30개 + 카테고리 5개 + 홈.
 * keywords 에 페르소나·줄임말 등을 넣어 검색 히트율 향상.
 */

interface SearchEntry {
  label: string;
  href: string;
  kind: 'calculator' | 'category' | 'page';
  keywords?: string[];
}

const SEARCH_DATA: SearchEntry[] = [
  { label: '연봉 실수령액 계산기', href: '/calculator/salary/', kind: 'calculator', keywords: ['세후 월급', '4대보험', '연봉'] },
  { label: '퇴직금 계산기', href: '/calculator/severance/', kind: 'calculator', keywords: ['DC', 'DB', '퇴직소득세'] },
  { label: '대출이자 계산기', href: '/calculator/loan/', kind: 'calculator', keywords: ['원리금균등', '만기일시', '주담대'] },
  { label: '대출한도 계산기 (DSR/LTV)', href: '/calculator/loan-limit/', kind: 'calculator', keywords: ['DSR', 'LTV', 'DTI', '주담대 한도'] },
  { label: '양도소득세 계산기', href: '/calculator/capital-gains-tax/', kind: 'calculator', keywords: ['1세대1주택', '일시적 2주택', '장기보유'] },
  { label: '취득세 계산기', href: '/calculator/acquisition-tax/', kind: 'calculator', keywords: ['생애최초', '주택 매매', '증여 취득세'] },
  { label: '재산세 계산기', href: '/calculator/property-tax/', kind: 'calculator', keywords: ['공시가격', '공정시장가액비율'] },
  { label: '종합부동산세 계산기', href: '/calculator/comprehensive-property-tax/', kind: 'calculator', keywords: ['종부세', '공시가 합계'] },
  { label: '중개수수료 계산기', href: '/calculator/broker-fee/', kind: 'calculator', keywords: ['복비', '중개보수', '부동산 수수료'] },
  { label: '전월세 전환 계산기', href: '/calculator/rent-conversion/', kind: 'calculator', keywords: ['전세 월세', '보증금', '환산보증금'] },
  { label: '평수 환산 계산기', href: '/calculator/area/', kind: 'calculator', keywords: ['제곱미터', '평', '34평', '84제곱미터'] },
  { label: '적금 이자 계산기', href: '/calculator/savings/', kind: 'calculator', keywords: ['단리 복리', '세후 이자'] },
  { label: '정기예금 이자 계산기', href: '/calculator/deposit/', kind: 'calculator', keywords: ['예금', '단리 복리'] },
  { label: '은퇴자금 계산기 (FIRE)', href: '/calculator/retirement/', kind: 'calculator', keywords: ['FIRE', '4% 룰', '노후 자금'] },
  { label: 'BMI 계산기', href: '/calculator/bmi/', kind: 'calculator', keywords: ['체질량지수', '비만도'] },
  { label: 'D-day 계산기', href: '/calculator/d-day/', kind: 'calculator', keywords: ['날짜 차이', '디데이', '100일'] },
  { label: '프리랜서 종합소득세 계산기', href: '/calculator/freelancer-tax/', kind: 'calculator', keywords: ['3.3%', '원천징수', '단순경비율', '종합소득세'] },
  { label: '증여세 계산기', href: '/calculator/gift-tax/', kind: 'calculator', keywords: ['증여재산공제', '배우자 6억'] },
  { label: '상속세 계산기', href: '/calculator/inheritance-tax/', kind: 'calculator', keywords: ['일괄공제', '배우자 상속'] },
  { label: '자동차세 계산기', href: '/calculator/vehicle-tax/', kind: 'calculator', keywords: ['배기량', '연납 할인'] },
  { label: '환율·환전 계산기', href: '/calculator/exchange/', kind: 'calculator', keywords: ['달러', 'USD', '환전'] },
  { label: '청약가점 계산기', href: '/calculator/housing-subscription/', kind: 'calculator', keywords: ['청약 가점', '무주택 기간', '부양가족'] },
  { label: '자녀장려금 계산기', href: '/calculator/child-tax-credit/', kind: 'calculator', keywords: ['자녀 지원금', 'CTC'] },
  { label: 'N잡러 건강보험 계산기', href: '/calculator/n-jobber-insurance/', kind: 'calculator', keywords: ['피부양자', '부업', '부가소득'] },
  { label: '임대수익률 계산기', href: '/calculator/rental-yield/', kind: 'calculator', keywords: ['Cap Rate', '임대', '월세 수익률'] },
  { label: '화폐가치 계산기 (인플레이션)', href: '/calculator/inflation/', kind: 'calculator', keywords: ['인플레이션', 'CPI', '실질 구매력'] },
  { label: '물타기 계산기 (주식·코인)', href: '/calculator/averaging-down/', kind: 'calculator', keywords: ['물타기', '주식 물타기', '코인 물타기', '평균단가', '추매', '추매계산기', '추가매수', '물타기계산기', '물 타기 계산기', '주식물타기', '코인 물타기 계산'] },
  { label: '분할매수 계산기 (주식·코인)', href: '/calculator/split-buy/', kind: 'calculator', keywords: ['분할매수', '분할매수 계산기', '코인 분할매수', '주식 분할매수', 'DCA', '평균단가 계산기', '무한매수법', '균등분할', '추매계산기'] },
  { label: '분할매도 계산기 (주식·코인)', href: '/calculator/split-sell/', kind: 'calculator', keywords: ['분할매도', '분할매도 계산기', '코인 분할매도', '주식 분할매도', '익절 계산기', '분할매도 손익', '실현손익 계산기', '증권거래세 계산기', '수익률 계산기'] },

  { label: '근로 계산기', href: '/category/work/', kind: 'category' },
  { label: '세금 계산기', href: '/category/tax/', kind: 'category' },
  { label: '금융 계산기', href: '/category/finance/', kind: 'category' },
  { label: '부동산 계산기', href: '/category/real-estate/', kind: 'category' },
  { label: '생활 계산기', href: '/category/lifestyle/', kind: 'category' },

  { label: '홈', href: '/', kind: 'page' },
];

/* ─── SVG 아이콘 ─── */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/* ─── 필터링 로직 ─── */

function normalize(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '');
}

function matches(entry: SearchEntry, query: string): boolean {
  const q = normalize(query);
  if (!q) return false;
  if (normalize(entry.label).includes(q)) return true;
  if (entry.keywords?.some((k) => normalize(k).includes(q))) return true;
  return false;
}

const POPULAR_ENTRIES: SearchEntry[] = [
  SEARCH_DATA[0]!, // 연봉
  SEARCH_DATA[4]!, // 양도세
  SEARCH_DATA[2]!, // 대출이자
  SEARCH_DATA[5]!, // 취득세
  SEARCH_DATA[1]!, // 퇴직금
];

/* ─── 컴포넌트 ─── */

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isComposing, setIsComposing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo<SearchEntry[]>(() => {
    if (!query.trim()) return POPULAR_ENTRIES;
    return SEARCH_DATA.filter((e) => matches(e, query)).slice(0, 8);
  }, [query]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // 결과 갱신 시 selection 리셋
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length]);

  const openDropdown = () => setIsOpen(true);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // IME 조합 중에는 키보드 이벤트 무시
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const picked = results[activeIndex];
      if (picked) {
        setIsOpen(false);
        setQuery('');
        router.push(picked.href);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          // controlled input — value 는 항상 갱신해야 한글 IME 글자가 화면에 표시됨.
          // composition 중이라도 사용자가 보는 텍스트는 같이 갱신.
          setQuery(e.target.value);
          if (!isComposing) {
            setIsOpen(true);
          }
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          setQuery(e.currentTarget.value);
          setIsOpen(true);
        }}
        onFocus={openDropdown}
        onKeyDown={handleKeyDown}
        placeholder="계산기 검색..."
        className="w-full rounded-full border border-border-base bg-bg-raised px-11 py-2.5 text-sm placeholder-text-tertiary transition-all focus:border-primary-500 focus:bg-bg-card focus-visible:outline-none"
        aria-label="계산기 검색"
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-expanded={isOpen}
        role="combobox"
      />
      {query && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:bg-bg-card hover:text-text-primary"
          aria-label="입력 지우기"
        >
          <XIcon />
        </button>
      )}

      {isOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 max-h-[420px] overflow-y-auto rounded-2xl border border-border-base bg-bg-card shadow-card"
        >
          {results.length === 0 ? (
            <div className="p-4 text-sm text-text-tertiary text-center">
              &ldquo;{query}&rdquo; 에 해당하는 계산기가 없습니다.
            </div>
          ) : (
            <>
              <div className="px-4 pt-3 pb-1 text-caption uppercase tracking-wide text-text-tertiary">
                {query.trim() ? '검색 결과' : '인기 계산기'}
              </div>
              <ul className="py-1">
                {results.map((entry, idx) => (
                  <li key={entry.href} role="option" aria-selected={idx === activeIndex}>
                    <Link
                      href={entry.href}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        'flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors',
                        idx === activeIndex
                          ? 'bg-primary-500/10 text-primary-500'
                          : 'text-text-primary hover:bg-bg-raised/50',
                      )}
                    >
                      <span className="truncate">{entry.label}</span>
                      <span className="shrink-0 text-caption uppercase tracking-wide text-text-tertiary">
                        {entry.kind === 'calculator' ? '계산기' : entry.kind === 'category' ? '카테고리' : '페이지'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
