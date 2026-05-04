import { expect, test } from '@playwright/test';

/**
 * 골든패스 #10 — 양도소득세
 * 기본값(1주택 양수가 5억, 취득가 4억, 보유기간 10년)에서 양도소득세가 표시되어야 한다.
 */
test.describe('양도소득세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 양도소득세 표시', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('양수가를 큰 폭으로 변경 시 양도소득세 값이 변동', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    // 양수가를 8억으로 큰 폭으로 변경 (5억 -> 8억)
    const salePriceInput = page.locator('input[id="sale-price"]');
    await salePriceInput.fill('800000000');
    await page.waitForTimeout(300);
    const after = (await hero.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('과세표준 항목이 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // 과세표준이 표시되어야 함
    const hasText = await result.getByText('과세표준', { exact: true }).isVisible().catch(() => false);
    expect(hasText).toBe(true);
  });
});
