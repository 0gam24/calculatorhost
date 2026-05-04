import { expect, test } from '@playwright/test';

/**
 * 골든패스 #19 — 프리랜서 종합소득세
 */
test.describe('프리랜서 종합소득세 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/freelancer-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 결과 영역 (ResultCard)
    const result = page.locator('[class*="border-border-base"][class*="bg-bg-card"]').filter({ hasText: /원|결과|세금/ }).first();
    await expect(result).toBeVisible({ timeout: 10000 });

    const content = await result.textContent();
    expect(content).toBeTruthy();
  });
});
