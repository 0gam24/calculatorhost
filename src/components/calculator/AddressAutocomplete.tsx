'use client';

/**
 * 도로명주소 자동완성 입력
 * 평수환산·임대수익률·전월세전환 등 주소 검색이 필요한 페이지에서 사용
 */

import { useState, useCallback, useRef } from 'react';
import { AddressResult } from '@/lib/api/types';
import { fetchAddress } from '@/lib/api/client';
import { clsx } from 'clsx';

interface AddressAutocompleteProps {
  onSelect?: (address: AddressResult) => void;
  placeholder?: string;
  showFull?: boolean; // 전체 주소 표시 여부
}

export function AddressAutocomplete({
  onSelect,
  placeholder = '도로명주소 또는 지번주소 검색',
  showFull = false,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setError(null);

    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetchAddress(searchQuery);

        if (response.results.length === 0) {
          setError('검색 결과가 없습니다.');
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
  }, []);

  const handleSelect = useCallback(
    (result: AddressResult) => {
      onSelect?.(result);
      const displayAddr = showFull
        ? result.roadAddr || result.jibunAddr
        : (result.roadAddr || result.jibunAddr).split(' ').slice(0, 3).join(' ');
      setQuery(displayAddr);
      setShowDropdown(false);
      setResults([]);
    },
    [onSelect, showFull],
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
              <div className="font-medium text-text-primary">
                {result.roadAddr || result.jibunAddr}
              </div>
              <div className="text-xs text-text-secondary">
                {result.zipNo && `우편번호: ${result.zipNo}`}
                {result.bdNm && ` • ${result.bdNm}`}
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
