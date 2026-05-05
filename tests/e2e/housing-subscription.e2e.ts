import { expect, test } from '@playwright/test';

/**
 * 골든패스 #16 — 청약가점
 * 기본값에서 자동 계산된 결과 확인
 */
test.describe('청약가점 골든패스', () => {
  test('계산하기 클릭 후 결과 표시', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });
    // 청약가점은 수동 계산 — "계산하기" 버튼 클릭 후 결과 노출
    await page.getByRole('button', { name: '계산하기' }).click();
    const score = page.locator('.hero-number').first();
    await expect(score).toBeVisible({ timeout: 10000 });
    const text = (await score.textContent())?.trim() ?? '';
    expect(parseInt(text, 10)).toBeGreaterThan(0);
  });
});
