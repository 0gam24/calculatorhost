import { expect, test } from '@playwright/test';

/**
 * 골든패스 #17 — 자녀장려금
 * 기본값(맞벌이, 연소득 3천만원, 자녀 2명)에서
 * 결과 카드에 0원이 아닌 hero 값이 표시되어야 한다.
 */
test.describe('자녀장려금 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 금액 표시', async ({ page }) => {
    await page.goto('/calculator/child-tax-credit/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('가구 유형을 홑벌이로 변경 시 자녀장려금이 변동', async ({ page }) => {
    await page.goto('/calculator/child-tax-credit/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.locator('.hero-number').textContent())?.trim() ?? '';

    // 가구 유형을 "홑벌이"로 변경
    await page.getByRole('button', { name: /홑벌이|single/ }).click();
    await page.waitForTimeout(300);

    const after = (await result.locator('.hero-number').textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('자녀 수 변경 시 자녀장려금이 변동', async ({ page }) => {
    await page.goto('/calculator/child-tax-credit/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.locator('.hero-number').textContent())?.trim() ?? '';

    // 자녀 수 입력 찾아서 변경 (label이 "자녀" 관련)
    const childInputs = page.locator('input[type="number"]');
    const lastInput = childInputs.last();
    await lastInput.fill('3');
    await page.waitForTimeout(300);

    const after = (await result.locator('.hero-number').textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });
});
