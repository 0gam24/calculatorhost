import { expect, test } from '@playwright/test';

/**
 * 골든패스 #12 — 상속세
 * 기본값(상속재산 10억, 배우자 있음, 자녀 2명)에서
 * 결과 카드에 0 이상의 납부 상속세가 표시되어야 한다.
 */
test.describe('상속세 골든패스', () => {
  test('기본값으로 페이지 진입 시 hero 값 표시됨', async ({ page }) => {
    await page.goto('/calculator/inheritance-tax/', { waitUntil: 'domcontentloaded' });

    const hero = page.locator('.hero-number').first();
    await expect(hero).toBeVisible({ timeout: 10000 });
    
    const text = await hero.textContent();
    expect(text).toMatch(/원/);
  });

  test('상속재산 총액 필드 노출', async ({ page }) => {
    await page.goto('/calculator/inheritance-tax/', { waitUntil: 'domcontentloaded' });

    const totalInput = page.locator('input[id="total-assets"]');
    await expect(totalInput).toBeVisible({ timeout: 10000 });
  });

  test('배우자 상속 체크박스 노출', async ({ page }) => {
    await page.goto('/calculator/inheritance-tax/', { waitUntil: 'domcontentloaded' });

    const spouseCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(spouseCheckbox).toBeVisible({ timeout: 10000 });
  });
});
