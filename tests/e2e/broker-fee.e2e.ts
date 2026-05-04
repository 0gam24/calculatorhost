import { expect, test } from '@playwright/test';

/**
 * 골든패스 #6 — 중개수수료
 * 기본값(매매 5억원)에서 결과 카드에 비-0 수수료가 표시되어야 한다.
 */
test.describe('중개수수료 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 수수료 표시', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('매매가 입력 시 중개수수료 값이 변동', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    // 거래금액을 10억으로 변경
    const priceInput = page.locator('input[id="sale-price"]');
    await priceInput.fill('1000000000');
    await page.waitForTimeout(300);
    const after = (await hero.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });

  test('물건 종류 변경(RadioGroup button) 시 수수료 계산 정상 동작', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // RadioGroup 버튼으로 오피스텔 선택
    await page.getByRole('radio', { name: '오피스텔' }).click();
    await page.waitForTimeout(300);

    const hero = result.locator('.hero-number');
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).toMatch(/[1-9]/);
  });
});
