import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #6 — 중개수수료
 * 기본값(매매 5억원)에서 결과 카드에 비-0 수수료가 표시되어야 한다.
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

test.describe('중개수수료 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 수수료 표시', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('[data-hero-value]');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('매매가 입력 시 중개수수료 값이 변동', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('[data-hero-value]');

    // 금액 칸은 포커스되면 쉼표 없는 값으로 다시 그려진다. 먼저 포커스해 두지 않으면 fill 이
    // 기존 값 뒤에 이어 붙어("5000000001000000000") 입력 오류가 난다.
    const priceInput = page.getByLabel('매매가', { exact: true });
    await priceInput.focus();
    const before = amount(await hero.textContent());
    expect(before).toBeGreaterThan(0);
    // 매매가 5억 → 10억: 거래금액과 요율 구간이 올라가 수수료가 늘어야 한다
    await priceInput.fill('1000000000');
    await priceInput.blur();
    await expect(priceInput).toHaveValue('1,000,000,000');
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
  });

  test('물건 종류 변경(RadioGroup button) 시 수수료 계산 정상 동작', async ({ page }) => {
    await page.goto('/calculator/broker-fee/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // RadioGroup 버튼으로 오피스텔 선택
    await page.getByRole('radio', { name: '오피스텔' }).click();
    await page.waitForTimeout(300);

    const hero = result.locator('[data-hero-value]');
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).toMatch(/[1-9]/);
  });
});
