import { expect, test } from '@playwright/test';

/**
 * 골든패스 #9 — 퇴직금
 * 기본값(12년 근무, 월급 300만원)에서 퇴직금이 표시되어야 한다.
 */
test.describe('퇴직금 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 퇴직금 표시', async ({ page }) => {
    await page.goto('/calculator/severance/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('평균임금 변경 시 퇴직금 값이 변동', async ({ page }) => {
    await page.goto('/calculator/severance/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    // 월급을 500만으로 변경
    const wageInput = page.locator('input[id="monthly-ordinary-wage"]');
    await wageInput.fill('5000000');
    await page.waitForTimeout(300);
    const after = (await hero.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('근속일수 관련 정보가 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/severance/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // 재직일수 또는 재직연수가 표시되어야 함
    const hasServiceDays = await result.getByText('재직일수', { exact: true }).isVisible().catch(() => false);
    const hasServiceYears = await result.getByText('재직 연수', { exact: true }).isVisible().catch(() => false);
    expect(hasServiceDays || hasServiceYears).toBe(true);
  });
});
