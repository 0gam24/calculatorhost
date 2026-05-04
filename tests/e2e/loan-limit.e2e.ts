import { expect, test } from '@playwright/test';

/**
 * 골든패스 #2 — 대출한도 (DSR/LTV/DTI)
 * 연소득을 +1억 추가했을 때 한도가 증가해야 한다.
 */
test.describe('대출한도 골든패스', () => {
  test('담보가치 +1억 클릭 시 최종 한도가 증가 (LTV binding)', async ({ page }) => {
    await page.goto('/calculator/loan-limit/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    expect(before).toMatch(/[1-9]/);

    // 담보가치 NumberInput 의 +1억 버튼만 정밀 클릭
    // 구조: <div root><label/><div><input id=collateral-value/></div><div>buttons</div></div>
    const collateralRoot = page
      .locator('input#collateral-value')
      .locator('..')
      .locator('..');
    await collateralRoot.getByRole('button', { name: '+1억' }).click();
    // 결과가 변경될 때까지 폴링
    await expect.poll(async () =>
      (await hero.textContent())?.trim() ?? '',
    ).not.toBe(before);

    const after = (await hero.textContent())?.trim() ?? '';
    const numericBefore = Number(before.replace(/[^0-9]/g, ''));
    const numericAfter = Number(after.replace(/[^0-9]/g, ''));
    expect(numericAfter).toBeGreaterThan(numericBefore);
  });
});
