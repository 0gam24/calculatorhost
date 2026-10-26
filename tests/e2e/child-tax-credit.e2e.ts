import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #17 — 자녀장려금
 * 기본값(맞벌이, 총소득·총급여 3천만원, 자녀 2명, 재산 1.7억원 미만)에서 예상 지급액이 표시되어야 한다.
 */
test.describe('자녀장려금 골든패스', () => {
  test('기본값으로 결과 표시', async ({ page }) => {
    await page.goto('/calculator/child-tax-credit/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('[data-hero-value]');
    await expect(hero).toBeVisible();
    // 0원이 아닌 원 단위 금액 (계산 정상 수행 신호)
    await expect(hero).toHaveText(/^[1-9][\d,]*원$/);
  });
});
