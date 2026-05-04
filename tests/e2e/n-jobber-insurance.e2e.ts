import { expect, test } from '@playwright/test';

/**
 * 골든패스 #18 — N잡러 건강보험
 * 기본값(주근로 5천만원, 부업소득 1천만원, 비피부양자)에서
 * 결과 카드에 계산 결과가 표시되어야 한다.
 */
// TODO(Phase I): N잡러 건강보험 페이지 셀렉터 정정 필요 (ResultCard 미사용).
test.describe.skip('N잡러 건강보험 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 계산 결과 표시', async ({ page }) => {
    await page.goto('/calculator/n-jobber-insurance/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text.length).toBeGreaterThan(0);
  });

  test('주 근로소득 변경 시 결과가 변동', async ({ page }) => {
    await page.goto('/calculator/n-jobber-insurance/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.textContent())?.trim() ?? '';

    // 주 근로소득 입력 변경 (첫 번째 입력)
    const inputs = page.locator('input[type="number"]');
    await inputs.first().fill('100000000');
    await page.waitForTimeout(300);

    const after = (await result.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('부업 소득 추가 시 결과가 변동', async ({ page }) => {
    await page.goto('/calculator/n-jobber-insurance/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.textContent())?.trim() ?? '';

    // 부업소득 입력 변경 (두 번째 입력)
    const inputs = page.locator('input[type="number"]');
    await inputs.nth(1).fill('20000000');
    await page.waitForTimeout(300);

    const after = (await result.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });
});
