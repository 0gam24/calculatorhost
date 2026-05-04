import { expect, test } from '@playwright/test';

/**
 * 골든패스 #7 — 취득세
 * 기본값(1주택 6억원 매매)에서 결과 카드에 취득세가 표시되어야 한다.
 */
test.describe('취득세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 취득세 표시', async ({ page }) => {
    await page.goto('/calculator/acquisition-tax/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('취득가액 변경 시 취득세 값이 변동', async ({ page }) => {
    await page.goto('/calculator/acquisition-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    // 취득가액을 9억으로 변경
    const priceInput = page.locator('input[id="acquisition-price"]');
    await priceInput.fill('900000000');
    await page.waitForTimeout(300);
    const after = (await hero.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('부가세 항목이 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/acquisition-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // 지방교육세가 표시되어야 함 (기본 구조에 포함)
    const hasEducationTax = await result.getByText('지방교육세', { exact: true }).isVisible().catch(() => false);
    const hasSpecialTax = await result.getByText('농어촌특별세', { exact: true }).isVisible().catch(() => false);
    expect(hasEducationTax || hasSpecialTax).toBe(true);
  });
});
