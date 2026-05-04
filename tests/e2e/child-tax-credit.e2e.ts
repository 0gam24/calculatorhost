import { expect, test } from '@playwright/test';

/**
 * 골든패스 #17 — 자녀장려금
 */
test.describe('자녀장려금 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/child-tax-credit/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 결과 영역
    const result = page.locator('[class*="border-border-base"][class*="bg-bg-card"]').filter({ hasText: /원|결과/ }).first();
    await expect(result).toBeVisible({ timeout: 10000 });

    const content = await result.textContent();
    expect(content).toBeTruthy();
  });
});
