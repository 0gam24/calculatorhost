import { expect, test } from '@playwright/test';

/**
 * 골든패스 #20 — 자동차세
 * 기본값(1998cc 비영업용 승용차, 신규)에서
 * 결과 카드에 0원이 아닌 자동차세가 표시되어야 한다.
 */
test.describe('자동차세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 자동차세 표시', async ({ page }) => {
    await page.goto('/calculator/vehicle-tax/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('배기량 변경 시 자동차세가 변동', async ({ page }) => {
    await page.goto('/calculator/vehicle-tax/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.locator('.hero-number').textContent())?.trim() ?? '';

    // 배기량 입력 변경 (첫 번째 입력)
    const inputs = page.locator('input[type="number"]');
    await inputs.first().fill('2500');
    await page.waitForTimeout(300);

    const after = (await result.locator('.hero-number').textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('지방교육세 항목이 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/vehicle-tax/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    await expect(result.getByText('지방교육세', { exact: true })).toBeVisible();
  });
});
