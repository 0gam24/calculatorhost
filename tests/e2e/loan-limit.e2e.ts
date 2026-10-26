import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #2 — 대출한도 (DSR/LTV/DTI)
 * 담보가치를 +1억 올렸을 때 최종 한도가 실시간으로 늘어나야 한다.
 *
 * 기본값(연소득 6천만, 담보 5억, 규제지역·무주택, 은행, 변동 4% 30년)에서는
 * LTV 40% 한도(2억)가 DSR 한도(약 3억)·주담대 최대한도(시가 15억 이하 6억)보다 낮아 한도를 정한다.
 * 담보 6억이면 LTV 한도 2.4억으로 늘어난다 (2026-10-14 대출 규칙 기준).
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

test.describe('대출한도 골든패스', () => {
  test('담보가치 +1억 클릭 시 최종 한도가 증가 (LTV binding)', async ({ page }) => {
    await page.goto('/calculator/loan-limit/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();
    const hero = result.locator('[data-hero-value]');
    // 전제: 기본값에서는 LTV 가 한도를 정한다. 규칙이 바뀌어 전제가 깨지면 여기서 바로 드러난다
    await expect(result.getByLabel(/^결정적 제약: LTV/)).toBeVisible();

    // '빠른 입력'은 금액 칸마다 있으므로 담보 가치 칸의 초기화 버튼 이름으로 범위를 좁혀 펼친다
    const collateralQuickInput = page.locator('details').filter({
      has: page.getByLabel('담보 가치 (주택가격) 초기화', { exact: true }),
    });
    await collateralQuickInput.locator('summary', { hasText: '빠른 입력' }).click();

    const before = amount(await hero.textContent());
    expect(before).toBeGreaterThan(0);
    await collateralQuickInput.getByRole('button', { name: '+1억', exact: true }).click();

    await expect(page.getByLabel('담보 가치 (주택가격)', { exact: true })).toHaveValue(
      '600,000,000',
    );
    // '결과 확인'을 누르지 않아도 결과가 바로 바뀌어야 한다
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
    await expect(result.getByLabel(/^결정적 제약: LTV/)).toBeVisible();
  });
});
