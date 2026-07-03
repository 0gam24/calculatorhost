'use client';

import { useState } from 'react';
import { buildEmbedSnippet, type EmbedSnippetParams } from '@/lib/seo/embed';

type EmbedCodeBoxProps = EmbedSnippetParams;

/**
 * 임베드 코드 박스 — 외부 사이트에 계산기를 삽입하는 copy-paste 스니펫 제공.
 *
 * 스니펫 생성은 buildEmbedSnippet (순수 함수, SSoT) 에 위임. 본 컴포넌트는 표시·복사 UI만 담당.
 */
export function EmbedCodeBox({ embedPath, canonicalPath, title, height }: EmbedCodeBoxProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const snippet = buildEmbedSnippet({ embedPath, canonicalPath, title, height });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('복사 실패 — 코드 영역을 직접 선택해 복사하세요.');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <section aria-label="이 계산기 임베드" className="card flex flex-col gap-3">
      <h2 className="text-base font-semibold">🔗 내 블로그·홈페이지에 이 계산기 넣기</h2>
      <p className="text-sm text-text-secondary">
        아래 코드를 복사해 티스토리·워드프레스·네이버 블로그(HTML 모드) 등에 붙여넣으면 이 계산기를
        그대로 삽입할 수 있습니다. 무료이며, 출처 링크만 유지해 주세요.
      </p>
      <textarea
        readOnly
        value={snippet}
        rows={4}
        onFocus={(e) => e.currentTarget.select()}
        className="w-full resize-none rounded-lg border border-border-base bg-bg-raised p-3 font-mono text-xs text-text-secondary"
        aria-label="임베드 코드"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="임베드 코드 복사"
          className="rounded-lg border border-primary-500 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-500/20 dark:text-primary-300 transition-colors"
        >
          {copied ? '✓ 복사됨' : '📋 임베드 코드 복사'}
        </button>
        <a
          href={embedPath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-tertiary underline hover:text-primary-500"
        >
          위젯 미리보기
        </a>
      </div>
      {error && <p className="text-caption text-danger-500">{error}</p>}
    </section>
  );
}
