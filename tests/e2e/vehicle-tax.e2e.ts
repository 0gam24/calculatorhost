import { expect, test } from '@playwright/test';

/**
 * 골든패스 #20 — 자동차세
 */
test.describe('자동차세 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/vehicle-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);

    // 결과 영역 (ResultCard)
    const result = page.locator('[class*="border-border-base"][class*="bg-bg-card"]').filter({ hasText: /원|결과|세금/ }).first();
    await expect(result).toBeVisible({ timeout: 10000 });

    const content = await result.textContent();
    expect(content).toBeTruthy();
  });
});
