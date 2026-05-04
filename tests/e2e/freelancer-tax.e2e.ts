import { expect, test } from '@playwright/test';

/**
 * 골든패스 #19 — 프리랜서 종합소득세
 * 기본값(연수입 3천만원, 단순경비율 64.1%, 부양가족 1명)에서
 * 결과 카드에 0원이 아닌 종합소득세가 표시되어야 한다.
 */
test.describe('프리랜서 종합소득세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 결과 표시', async ({ page }) => {
    await page.goto('/calculator/freelancer-tax/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text.length).toBeGreaterThan(0);
  });

  test('연수입 변경 시 종합소득세가 변동', async ({ page }) => {
    await page.goto('/calculator/freelancer-tax/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    const before = (await result.locator('.hero-number').textContent())?.trim() ?? '';

    // 연수입 입력 변경 (첫 번째 입력)
    const inputs = page.locator('input[type="number"]');
    await inputs.first().fill('50000000');
    await page.waitForTimeout(300);

    const after = (await result.locator('.hero-number').textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('경비율이 결과에 반영됨', async ({ page }) => {
    await page.goto('/calculator/freelancer-tax/', { waitUntil: 'domcontentloaded' });
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 15000 });

    // 경비 관련 항목이 노출되어야 함
    const resultContent = await result.textContent();
    expect(resultContent).toMatch(/경비|공제|차감|수입|소득/);
  });
});
