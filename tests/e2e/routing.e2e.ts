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

  test('신규 가이드 2개 라우팅 확인', async ({ page }) => {
    // Phase M: 전세 보증금 안전 가이드
    let res = await page.goto('/guide/jeonse-deposit-safety/');
    expect(res?.status(), 'guide/jeonse-deposit-safety').toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
    // breadcrumb + h1 모두 매치 → first() 로 strict mode 해소
    await expect(page.getByText(/전세 보증금/).first()).toBeVisible();

    // Phase M: 양도소득세 계산 5단계 가이드
    res = await page.goto('/guide/capital-gains-tax-5-steps/');
    expect(res?.status(), 'guide/capital-gains-tax-5-steps').toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.getByText(/양도소득세/).first()).toBeVisible();
  });
});
