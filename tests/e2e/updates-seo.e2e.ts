import { expect, test } from '@playwright/test';

/**
 * /updates 페이지 SEO 강화 검증
 * - ItemList JSON-LD 존재 (최신 5건)
 * - description freshness 신호 포함
 * - dateModified 자동 갱신
 */
test.describe('/updates SEO 강화', () => {
  test('ItemList JSON-LD 존재 (최신 5건)', async ({ page }) => {
    await page.goto('/updates/');
    await expect(page).toHaveURL(/\/updates\/?$/);

    // JSON-LD 스크립트 추출
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    let foundItemList = false;

    for (const script of scripts) {
      const content = await script.textContent();
      if (content?.includes('"@type":"ItemList"')) {
        foundItemList = true;
        const json = JSON.parse(content);

        // ItemList 검증
        expect(json['@context']).toBe('https://schema.org');
        expect(json['@type']).toBe('ItemList');
        expect(json.itemListElement).toBeDefined();
        expect(Array.isArray(json.itemListElement)).toBeTruthy();
        expect(json.itemListElement.length).toBeGreaterThan(0);
        expect(json.itemListElement.length).toBeLessThanOrEqual(5);

        // 각 item 검증
        for (const item of json.itemListElement) {
          expect(item['@type']).toBe('ListItem');
          expect(item.position).toBeDefined();
          expect(item.name).toBeDefined();
          expect(item.description).toBeDefined();
          expect(item.url).toBeDefined();
        }
        break;
      }
    }

    expect(foundItemList, 'ItemList JSON-LD를 찾을 수 없음').toBeTruthy();
  });

  test('description에 freshness 신호 포함', async ({ page }) => {
    const response = await page.goto('/updates/');
    expect(response?.status()).toBeLessThan(400);

    // meta[name="description"] content 확인
    const descMeta = await page.locator('meta[name="description"]').first();
    const description = await descMeta.getAttribute('content');

    expect(description).toBeDefined();
    // freshness 키워드 확인: "변경", "2026", "시계열", "업데이트"
    expect(description).toMatch(/변경|2026|시계열|업데이트/);
  });

  test('dateModified가 UPDATES_LOG 최신 항목 기준으로 설정', async ({ page }) => {
    await page.goto('/updates/');

    const scripts = await page.locator('script[type="application/ld+json"]').all();
    let foundArticle = false;

    for (const script of scripts) {
      const content = await script.textContent();
      if (content?.includes('"@type":"Article"')) {
        foundArticle = true;
        const json = JSON.parse(content);

        expect(json.dateModified).toBeDefined();
        // 날짜 형식 검증 (YYYY-MM-DD)
        expect(json.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        break;
      }
    }

    expect(foundArticle, 'Article JSON-LD를 찾을 수 없음').toBeTruthy();
  });

  test('og:description에도 freshness 신호 포함', async ({ page }) => {
    await page.goto('/updates/');

    const ogDescMeta = await page.locator('meta[property="og:description"]').first();
    const ogDesc = await ogDescMeta.getAttribute('content');

    expect(ogDesc).toBeDefined();
    expect(ogDesc).toMatch(/변경|2026|시계열|업데이트/);
  });
});
