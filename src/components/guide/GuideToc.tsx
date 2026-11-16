'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
}

/**
 * 가이드 글 목차 (넓은 화면 전용, 오른쪽 여백에 고정).
 *
 * - 본문 흐름 밖(position: fixed)에 그려서 레이아웃 이동(CLS)이 없다.
 * - 글마다 손으로 쓴 h2 를 읽어 id 를 붙이고 링크를 만든다 (소제목 3개 미만이면 표시 안 함).
 * - 좁은 화면은 아래쪽 고정 요소가 자동 광고와 겹칠 수 있어 표시하지 않는다.
 */
export function GuideToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('.guide-scope article.max-w-3xl h2'),
    ).filter((h) => (h.textContent ?? '').trim().length > 1);

    const list = headings.map((h, i) => {
      if (!h.id) h.id = `sec-${i + 1}`;
      return { id: h.id, text: (h.textContent ?? '').trim() };
    });

    if (list.length < 3) {
      setItems([]);
      return;
    }
    setItems(list);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="fixed right-6 top-32 z-10 hidden max-h-[70vh] w-56 overflow-y-auto rounded-card border border-border-base bg-bg-card p-4 2xl:block"
    >
      <p className="mb-2 text-caption font-semibold text-text-primary">목차</p>
      <ol className="space-y-1.5 text-xs leading-snug">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={
                active === item.id
                  ? 'font-semibold text-primary-600 dark:text-primary-400'
                  : 'text-text-secondary hover:text-primary-600 dark:hover:text-primary-400'
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
