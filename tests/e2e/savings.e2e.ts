import { expect, test } from '@playwright/test';

/**
 * 골든패스 #13 — 적금
 * 기본값(월 100만, 금리 3%, 12개월)에서
 * 결과 카드에 0 이상의 만기수령액이 표시되어야 한다.
 */
test.describe('적금 이자 골든패스', () => {
  test('기본값으로 페이지 진입 시 hero 값 표시됨', async ({ page }) => {
    await page.goto('/calculator/savings/', { waitUntil: 'domcontentloaded' });

    const hero = page.locator('.hero-number').first();
    await expect(hero).toBeVisible({ timeout: 10000 });
    
    const text = await hero.textContent();
    expect(text).not.toBe('0원');
    expect(text).toMatch(/원/);
  });

  test('월 납입액 필드 노출', async ({ page }) => {
    await page.goto('/calculator/savings/', { waitUntil: 'domcontentloaded' });

    const monthlyInput = page.locator('input[id="monthly-deposit"]');
    await expect(monthlyInput).toBeVisible({ timeout: 10000 });
  });

  test('연 금리 필드 노출', async ({ page }) => {
    await page.goto('/calculator/savings/', { waitUntil: 'domcontentloaded' });

    const rateInput = page.locator('input[id="annual-rate"]');
    await expect(rateInput).toBeVisible({ timeout: 10000 });
  });
});
