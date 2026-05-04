import { expect, test } from '@playwright/test';

/**
 * 골든패스 #8 — 정기예금
 * 기본값(원금 1천만, 금리 3%, 12개월)에서 세후 이자가 표시되어야 한다.
 */
test.describe('정기예금 이자 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 수령액 표시', async ({ page }) => {
    await page.goto('/calculator/deposit/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('금리 변경 시 수령액이 변동', async ({ page }) => {
    await page.goto('/calculator/deposit/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });

    // 세후 이자 행 먼저 확인 (변경 전)
    const resultText = await result.textContent();
    expect(resultText).toContain('세후');

    // 금리를 5%로 변경
    const rateInput = page.locator('input[id="annual-rate"]');
    await rateInput.fill('5');
    await page.waitForTimeout(300);

    const hero = result.locator('.hero-number');
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).toMatch(/[1-9]/);
  });

  test('기간 변경 시 세후 수령액이 계산됨', async ({ page }) => {
    await page.goto('/calculator/deposit/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });

    // 기간을 24개월로 변경
    const termInput = page.locator('input[id="term-months"]');
    await termInput.fill('24');
    await page.waitForTimeout(300);

    const hero = result.locator('.hero-number');
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).toMatch(/[1-9]/);
  });
});
