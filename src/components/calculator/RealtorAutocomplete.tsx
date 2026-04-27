'use client';

/**
 * 실거래가 단지 자동완성 입력
 * 양도세·취득세·재산세·종부세 페이지에서 사용
 */

import { useState, useCallback, useRef } from 'react';
import { RealtorResult } from '@/lib/api/types';
import { fetchRealtor } from '@/lib/api/client';
import { clsx } from 'clsx';

export interface RealtorPick {
  name: string;
  avgPrice: number;
  avgArea: number;
  address: string;
}

interface RealtorAutocompleteProps {
  type?: 'apt' | 'land' | 'officetel';
  onPick: (pick: RealtorPick) => void;
  placeholder?: string;
}

export function RealtorAutocomplete({
  type = 'apt',
  onPick,
  placeholder = '단지명·주소 검색 (선택)',
}: RealtorAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RealtorResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);
      setError(null);

      // 공백 쿼리는 드롭다운 닫기
      if (!searchQuery || searchQuery.trim().length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      // debounce 300ms
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        try {
          setLoading(true);
          const response = await fetchRealtor(searchQuery, type);

          if (response.fallback) {
            setError('검색 결과가 없습니다. 단지명 또는 주소를 정확히 입력해주세요.');
            setResults([]);
          } else {
            setResults(response.results);
            setError(null);
          }

          setShowDropdown(true);
        } catch (err) {
          if (err instanceof Error) {
            if (err.message.includes('일일 한도')) {
              setError('일일 한도를 초과했습니다. 내일 다시 시도해주세요.');
            } else {
              setError('검색 중 오류가 발생했습니다.');
            }
          }
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    },
    [type],
  );

  const handleSelect = useCallback(
    (result: RealtorResult) => {
      onPick({
        name: result.name,
        avgPrice: result.avgPrice,
        avgArea: result.avgArea,
        address: result.address,
      });
      setQuery(result.name);
      setShowDropdown(false);
      setResults([]);
    },
    [onPick],
  );

  return (
    <div className="relative w-full">
      {/* 입력 필드 */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => query && results.length > 0 && setShowDropdown(true)}
        onBlur={() => {
          // 드롭다운 클릭 처리를 위해 약간 지연
          setTimeout(() => setShowDropdown(false), 200);
        }}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm',
          'border-border-base bg-bg-card text-text-primary',
          'placeholder-text-secondary',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
        )}
      />

      {/* 로딩 상태 */}
      {loading && (
        <div className="absolute right-3 top-2.5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-1 text-xs text-danger-500">
          {error}
        </p>
      )}

      {/* 드롭다운 */}
      {showDropdown && results.length > 0 && (
        <div className={clsx(
          'absolute top-full z-10 mt-1 w-full rounded-lg border border-border-base bg-bg-card shadow-lg',
          'max-h-64 overflow-y-auto',
        )}>
          {results.map((result, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(result)}
              className={clsx(
                'w-full border-b border-border-base px-3 py-2 text-left transition',
                'hover:bg-bg-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset',
                'last:border-b-0',
              )}
            >
              <div className="font-medium text-text-primary">{result.name}</div>
              <div className="text-xs text-text-secondary">
                {result.address}
                {' '}
                •
                {' '}
                평균 {result.avgPrice}만원
                {' '}
                (
                {result.avgArea}
                ㎡)
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 결과 없을 때 */}
      {showDropdown && results.length === 0 && !loading && query && !error && (
        <div className={clsx(
          'absolute top-full z-10 mt-1 w-full rounded-lg border border-border-base bg-bg-card',
          'px-3 py-2 text-xs text-text-secondary',
        )}>
          입력 중...
        </div>
      )}
    </div>
  );
}
