import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #7 — 취득세
 * 기본값(1주택 6억원 매매)에서 결과 카드에 취득세가 표시되어야 한다.
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

test.describe('취득세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 취득세 표시', async ({ page }) => {
    await page.goto('/calculator/acquisition-tax/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('[data-hero-value]');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('취득가액 변경 시 취득세 값이 변동', async ({ page }) => {
    await page.goto('/calculator/acquisition-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('[data-hero-value]');

    // 금액 칸은 포커스되면 쉼표 없는 값으로 다시 그려진다. 먼저 포커스해 두지 않으면 fill 이
    // 기존 값 뒤에 이어 붙어("600000000900000000") 입력 오류가 난다.
    const priceInput = page.getByLabel('취득가액', { exact: true });
    await priceInput.focus();
    const before = amount(await hero.textContent());
    expect(before).toBeGreaterThan(0);
    // 취득가액 6억 → 9억: 세율 구간이 올라가 납부액이 늘어야 한다
    await priceInput.fill('900000000');
    await priceInput.blur();
    await expect(priceInput).toHaveValue('900,000,000');
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
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
