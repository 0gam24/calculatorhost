import { expect, test } from '@playwright/test';

/**
 * 골든패스 #16 — 청약가점
 * 기본값에서 자동 계산된 결과 확인
 */
test.describe('청약가점 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 결과 카드 (자동 계산)
    const result = page.locator('div:has(> p.text-6xl.font-bold)');
    await expect(result).toBeVisible({ timeout: 10000 });

    // 점수 확인
    const score = result.locator('p.text-6xl.font-bold');
    const text = (await score.textContent())?.trim() ?? '';
    expect(parseInt(text, 10)).toBeGreaterThan(0);
  });
});
