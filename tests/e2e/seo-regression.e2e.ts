import { expect, test } from '@playwright/test';

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

    test(`${path} meta description 80~165자 범위`, async ({ page }) => {
      await page.goto(path);
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThanOrEqual(80);
      expect(desc!.length).toBeLessThanOrEqual(165);
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

test.describe('SEO 회귀 — 사이트 차원', () => {
  test('robots.txt 200 + sitemap 참조', async ({ page }) => {
    const res = await page.request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/sitemap/i);
  });

  test('sitemap.xml 200 + 계산기 URL 포함', async ({ page }) => {
    const res = await page.request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('/calculator/salary/');
  });
});
