import { expect, test } from '@playwright/test';

/**
 * 골든패스 #15 — 임대수익률
 * 기본값(매매가 5억, 보증금 2억, 월세 150만)에서
 * 결과 카드에 연수익률(%)이 표시되어야 한다.
 */
test.describe('임대수익률 골든패스', () => {
  test('기본값으로 페이지 진입 시 hero 값 표시됨', async ({ page }) => {
    await page.goto('/calculator/rental-yield/', { waitUntil: 'domcontentloaded' });

    const hero = page.locator('.hero-number').first();
    await expect(hero).toBeVisible({ timeout: 10000 });
    
    const text = await hero.textContent();
    expect(text).toMatch(/%/);
  });

  test('매매가 필드 노출', async ({ page }) => {
    await page.goto('/calculator/rental-yield/', { waitUntil: 'domcontentloaded' });

    const purchaseInput = page.locator('input[id="purchasePrice"]');
    await expect(purchaseInput).toBeVisible({ timeout: 10000 });
  });

  test('월 임차료 필드 노출', async ({ page }) => {
    await page.goto('/calculator/rental-yield/', { waitUntil: 'domcontentloaded' });

    const rentInput = page.locator('input[id="monthlyRent"]');
    await expect(rentInput).toBeVisible({ timeout: 10000 });
  });
});
