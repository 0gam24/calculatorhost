import { expect, test } from '@playwright/test';

/**
 * 골든패스 #4 — 홈 → 카테고리 → 계산기 네비게이션
 * trailingSlash:true 정적 export 환경에서 모든 라우트가 정상 응답하는지 확인.
 */
test.describe('라우팅 골든패스', () => {
  test('홈에서 양도소득세 계산기까지 이동 (직접 URL)', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('h1').first()).toBeVisible();

    await page.goto('/category/tax/');
    await expect(page).toHaveURL(/\/category\/tax\/?$/);
    await expect(page.locator('h1').first()).toBeVisible();

    await page.goto('/calculator/capital-gains-tax/');
    await expect(page).toHaveURL(/\/calculator\/capital-gains-tax\/?$/);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(
      page.getByRole('region', { name: '계산 결과' }),
    ).toBeVisible();
  });

  test('카테고리 허브 5개 모두 200 응답', async ({ page }) => {
    const categories = ['tax', 'finance', 'work', 'real-estate', 'lifestyle'];
    for (const slug of categories) {
      const res = await page.goto(`/category/${slug}/`);
      expect(res?.status(), `category/${slug}`).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
