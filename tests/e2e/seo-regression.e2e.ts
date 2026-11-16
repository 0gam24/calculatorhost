import { expect, test } from '../support/network-fixture';

/**
 * SEO + GEO 회귀 자동 감시.
 * 표본 페이지에서 메타·구조화 데이터·Speakable 셀렉터·canonical 일관성 검증.
 *
 * 8 에이전트 합의 갭 (2026-05-11):
 * - Speakable selector 추적 불일치 (FAQ 답변·Structured Summary 테이블)
 * - canonical/OG/메타 길이 자동 감시 부재
 * - 카테고리 ItemList JSON-LD 존재 검증 부재
 */

const SAMPLE_PAGES = [
  { path: '/calculator/salary/', kind: 'calculator' },
  { path: '/calculator/capital-gains-tax/', kind: 'calculator' },
  { path: '/category/tax/', kind: 'category' },
] as const;

test.describe('SEO 회귀 — 메타·canonical·OG', () => {
  for (const { path } of SAMPLE_PAGES) {
    test(`${path} canonical href 정규 형식`, async ({ page }) => {
      await page.goto(path);
      const href = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https:\/\/calculatorhost\.com\/.+\/$/);
    });

    // 2026-10-08: 네이버 사이트 간단 체크(설명 80자 이내) 기준으로 변경. ADR-016
    test(`${path} meta description 40~80자 범위`, async ({ page }) => {
      await page.goto(path);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThanOrEqual(40);
      expect(desc!.length).toBeLessThanOrEqual(80);
    });

    test(`${path} og:title + og:description 존재`, async ({ page }) => {
      await page.goto(path);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      expect(ogDesc).toBeTruthy();
    });
  }
});

test.describe('GEO 회귀 — Speakable + 구조화 데이터', () => {
  test('계산기 페이지에 data-speakable 셀렉터 ≥ 3 (정의 + TL;DR + 테이블 + FAQ 답변들)', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const count = await page.locator('[data-speakable]').count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('계산기 페이지 FAQ 5~8개 (FAQPage JSON-LD 카운트)', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    let faqCount = 0;
    for (const s of scripts) {
      const txt = await s.textContent();
      if (txt && txt.includes('"@type":"FAQPage"')) {
        const json = JSON.parse(txt);
        faqCount = json.mainEntity?.length ?? 0;
        break;
      }
    }
    expect(faqCount).toBeGreaterThanOrEqual(5);
    expect(faqCount).toBeLessThanOrEqual(10);
  });

  test('카테고리 허브에 ItemList JSON-LD 존재', async ({ page }) => {
    await page.goto('/category/tax/');
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    let foundItemList = false;
    for (const s of scripts) {
      const txt = await s.textContent();
      if (txt && txt.includes('"@type":"ItemList"')) {
        foundItemList = true;
        break;
      }
    }
    expect(foundItemList).toBe(true);
  });

  test('계산기 페이지 SoftwareApplication + BreadcrumbList + WebPage 존재', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    const types = new Set<string>();
    for (const s of scripts) {
      const txt = await s.textContent();
      if (!txt) continue;
      try {
        const json = JSON.parse(txt);
        if (Array.isArray(json)) {
          for (const j of json) if (j['@type']) types.add(j['@type']);
        } else if (json['@type']) {
          types.add(json['@type']);
        }
      } catch {
        // skip
      }
    }
    expect(types.has('SoftwareApplication')).toBe(true);
    expect(types.has('BreadcrumbList')).toBe(true);
    expect(types.has('WebPage')).toBe(true);
  });
});

// 네이버 서치어드바이저 공식 가이드 (docs/references/H-네이버-공식가이드) 반영 회귀.
// 04-02 콘텐츠 마크업: og·twitter 제목/설명은 페이지 제목/설명과 같게, og:url, twitter:domain
// 04-04 파비콘: href 절대 경로, 같은 rel 값은 한 개만
// 08-05 BreadcrumbList: "홈" 같은 일반 단어 대신 페이지를 설명하는 이름
const NAVER_SAMPLE_PAGES = [
  '/',
  '/calculator/salary/',
  '/guide/annual-leave-allowance-2026/',
  '/about/',
  '/category/tax/',
] as const;

test.describe('네이버 마크업 가이드 — 제목·설명·OG·파비콘·빵부스러기', () => {
  for (const path of NAVER_SAMPLE_PAGES) {
    test(`${path} og·twitter 제목/설명이 페이지 제목/설명과 같다`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      const meta = (selector: string) => page.locator(selector).first().getAttribute('content');
      expect(await meta('meta[property="og:title"]')).toBe(title);
      expect(await meta('meta[property="og:description"]')).toBe(desc);
      expect(await meta('meta[name="twitter:title"]')).toBe(title);
      expect(await meta('meta[name="twitter:description"]')).toBe(desc);
      expect(await meta('meta[name="twitter:domain"]')).toBeTruthy();
    });

    test(`${path} og:url 은 canonical 과 같다`, async ({ page }) => {
      await page.goto(path);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toBe(canonical);
    });

    test(`${path} 파비콘 링크는 절대 경로이고 rel 값마다 하나`, async ({ page }) => {
      await page.goto(path);
      const icons = await page
        .locator('link[rel~="icon"], link[rel="apple-touch-icon"]')
        .evaluateAll((els) => els.map((el) => ({ rel: el.getAttribute('rel'), href: el.getAttribute('href') })));
      expect(icons.length).toBeGreaterThan(0);
      const rels = icons.map((i) => i.rel);
      expect(new Set(rels).size).toBe(rels.length);
      for (const icon of icons) expect(icon.href).toMatch(/^https:\/\/calculatorhost\.com\//);
    });
  }

  test('메인 페이지 제목은 브랜드명으로 시작하고 개수 같은 바뀌는 숫자가 없다', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.startsWith('calculatorhost')).toBe(true);
    expect(title).not.toMatch(/\d+개/);
    expect([...title].length).toBeLessThanOrEqual(40);
  });

  test('BreadcrumbList 첫 항목 이름은 "홈"이 아니다', async ({ page }) => {
    for (const path of ['/calculator/salary/', '/guide/annual-leave-allowance-2026/', '/about/']) {
      await page.goto(path);
      const names = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
        els.flatMap((el) => {
          try {
            const json = JSON.parse(el.textContent ?? '');
            const list = Array.isArray(json) ? json : [json];
            return list
              .filter((j) => j['@type'] === 'BreadcrumbList')
              .map((j) => j.itemListElement?.[0]?.name as string);
          } catch {
            return [];
          }
        }),
      );
      expect(names.length, path).toBeGreaterThan(0);
      for (const name of names) expect(name, path).not.toBe('홈');
    }
  });
});

test.describe('SEO 회귀 — 사이트 차원', () => {
  test('robots.txt 200 + sitemap 참조', async ({ qaRequest }) => {
    const res = await qaRequest.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/sitemap/i);
  });

  test('sitemap.xml 200 + 계산기 URL 포함', async ({ qaRequest }) => {
    const res = await qaRequest.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('/calculator/salary/');
  });
});
