import { expect, test } from '@playwright/test';

/**
 * 골든패스 #11 — 증여세
 * 기본값(증여재산 1억, 성년자녀, 신고 기한 내)에서
 * 결과 카드에 0 이상의 납부 증여세가 표시되어야 한다.
 */
test.describe('증여세 골든패스', () => {
  test('기본값으로 페이지 진입 시 hero 값 표시됨', async ({ page }) => {
    await page.goto('/calculator/gift-tax/', { waitUntil: 'domcontentloaded' });

    const hero = page.locator('.hero-number').first();
    await expect(hero).toBeVisible({ timeout: 10000 });
    
    const text = await hero.textContent();
    expect(text).toMatch(/원/);
  });

  test('증여재산 가액 필드 노출', async ({ page }) => {
    await page.goto('/calculator/gift-tax/', { waitUntil: 'domcontentloaded' });

    const giftInput = page.locator('input[id="gift-value"]');
    await expect(giftInput).toBeVisible({ timeout: 10000 });
  });

  test('관계 선택 라디오 버튼 노출', async ({ page }) => {
    await page.goto('/calculator/gift-tax/', { waitUntil: 'domcontentloaded' });

    const radios = page.locator('input[type="radio"]');
    expect(await radios.count()).toBeGreaterThan(0);
  });
});
