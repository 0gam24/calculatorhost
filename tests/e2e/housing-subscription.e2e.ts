import { expect, test } from '@playwright/test';

/**
 * 골든패스 #16 — 청약가점
 * 기본값에서 자동 계산된 결과 확인
 */
test.describe('청약가점 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // hero-number 적용 후 (Phase J frontend-builder)
    const score = page.locator('.hero-number').first();
    await expect(score).toBeVisible({ timeout: 10000 });
    const text = (await score.textContent())?.trim() ?? '';
    expect(parseInt(text, 10)).toBeGreaterThan(0);
  });
});
