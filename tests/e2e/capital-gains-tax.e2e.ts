import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #10 — 양도소득세
 * 기본값(일반·주택, 양도가액 6억, 취득가액 5억, 보유 5년, 1주택)에서 양도소득세가 표시되어야 한다.
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

test.describe('양도소득세 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 양도소득세 표시', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('[data-hero-value]');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('양수가를 큰 폭으로 변경 시 양도소득세 값이 변동', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('[data-hero-value]');

    // 금액 칸은 포커스되면 쉼표 없는 값으로 다시 그려진다. 먼저 포커스해 두지 않으면 fill 이
    // 기존 값 뒤에 이어 붙어("600000000800000000") 입력 오류가 난다.
    const salePrice = page.getByLabel('양도가액', { exact: true });
    await salePrice.focus();
    const before = amount(await hero.textContent());
    expect(before).toBeGreaterThan(0);
    // 양도가액 6억 → 8억 (취득가액 5억 그대로라 양도차익이 커진다)
    await salePrice.fill('800000000');
    await salePrice.blur();
    await expect(salePrice).toHaveValue('800,000,000');
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
  });

  test('과세표준 항목이 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/capital-gains-tax/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // 결과 카드는 주요 3행만 바로 보여 주고 나머지는 '결과 상세'를 펼쳐야 보인다
    await result.locator('summary', { hasText: '결과 상세' }).click();
    await expect(result.getByText('과세표준', { exact: true })).toBeVisible();
  });
});
