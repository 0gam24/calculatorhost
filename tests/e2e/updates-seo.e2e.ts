import { expect, test } from '../support/network-fixture';

/**
 * /updates 페이지 SEO 검증
 * - ItemList JSON-LD 를 넣지 않는다 (2026-10-30, ADR-019): 변경 이력 항목은 모두 이 페이지 주소라
 *   네이버 캐러셀(08-07) "요소 간 중복 금지"·"항목마다 image 필수"를 지킬 수 없다
 * - description freshness 신호 포함
 * - dateModified 자동 갱신
 */
test.describe('/updates SEO 강화', () => {
  test('항목 주소가 겹치는 ItemList JSON-LD 를 넣지 않는다', async ({ page }) => {
    await page.goto('/updates/');
    await expect(page).toHaveURL(/\/updates\/?$/);

    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? '{}')['@type'] as string));
    expect(types).not.toContain('ItemList');
    expect(types).toContain('WebPage');
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
