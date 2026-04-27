#!/usr/bin/env node
/**
 * 5개 카테고리 페이지에 ItemList + FAQPage JSON-LD 추가.
 * - 기존 import 에 buildItemListJsonLd, buildFaqPageJsonLd 추가
 * - 컴포넌트 내부 breadcrumbLd 정의 직후에 itemListLd, faqLd 정의
 * - JSON.stringify(breadcrumbLd) 다음에 itemList/faq script 태그 삽입
 */

import { readFileSync, writeFileSync } from 'node:fs';

const FILES = [
  'src/app/category/work/page.tsx',
  'src/app/category/tax/page.tsx',
  'src/app/category/finance/page.tsx',
  'src/app/category/real-estate/page.tsx',
  'src/app/category/lifestyle/page.tsx',
];

for (const file of FILES) {
  let text = readFileSync(file, 'utf8');
  const original = text;

  // 1. import 에 helpers 추가 (buildBreadcrumbJsonLd 옆에)
  text = text.replace(
    /import\s+\{\s*([^}]*buildBreadcrumbJsonLd[^}]*)\s*\}\s+from\s+'@\/lib\/seo\/jsonld';/,
    (match, inner) => {
      const items = inner.split(',').map((s) => s.trim()).filter(Boolean);
      const need = ['buildBreadcrumbJsonLd', 'buildItemListJsonLd', 'buildFaqPageJsonLd'];
      for (const n of need) if (!items.includes(n)) items.push(n);
      return `import {\n  ${items.join(',\n  ')},\n} from '@/lib/seo/jsonld';`;
    }
  );

  // 2. const breadcrumbLd = buildBreadcrumbJsonLd(...) 직후에 itemListLd + faqLd 추가
  //    - URL 상수 (const URL = 'https://...') 사용
  //    - CALCULATORS, FAQ_ITEMS 변수명 가정
  text = text.replace(
    /(const breadcrumbLd = buildBreadcrumbJsonLd\(\[[^\]]*\]\);)/,
    `$1
  const itemListLd = buildItemListJsonLd(
    CALCULATORS.map((c) => ({
      name: c.title,
      url: \`https://calculatorhost.com\${c.href.endsWith('/') ? c.href : c.href + '/'}\`,
    })),
  );
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );`
  );

  // 3. breadcrumbLd JSON.stringify script 태그 직후에 itemList + faq script 태그 추가
  text = text.replace(
    /(<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(breadcrumbLd\)\s*\}\}\s*\/>)/,
    `$1
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />`
  );

  if (text !== original) {
    writeFileSync(file, text, 'utf8');
    console.log(`✅ ${file}`);
  } else {
    console.log(`⚠️  ${file} — no change`);
  }
}
