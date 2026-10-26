import { expect, test, type Page } from '../support/network-fixture';

/**
 * 골든패스 #9 — 퇴직금
 * 기본값(2014-01-01 입사 ~ 2026-04-24 퇴직, 직전 3개월 월평균 임금 기초액 300만원)에
 * 근무 조건 확인과 퇴직 당시 1일 통상임금을 채우면 퇴직금이 표시되어야 한다.
 *
 * 근무 조건이 '확인 필요'이거나 1일 통상임금이 0(미확인)이면 확정 금액 대신 확인 안내를 띄우는 것이
 * 의도된 설계다 (2026-10-01 0d871e2 퇴직금 정확성 교정). 그래서 기본 상태만으로는 금액이 나오지 않는다.
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

/** 근무 조건을 '주 15시간 이상·별도 예외 없음'으로 확인하고 1일 통상임금 9만원을 넣는다 */
async function confirmConditions(page: Page) {
  await page
    .getByRole('radiogroup', { name: '근무 조건 확인', exact: true })
    .getByRole('radio', { name: '주 15시간 이상·별도 예외 없음', exact: true })
    .click();
  // 1일 통상임금 9만원은 1일 평균임금 10만원(300만원 × 3개월 ÷ 90일)보다 낮아 평균임금 기준으로 계산된다
  const ordinaryDailyWage = page.getByLabel('퇴직 당시 1일 통상임금', { exact: true });
  // 금액 칸은 포커스되면 쉼표 없는 값으로 다시 그려지므로 먼저 포커스해야 fill 이 기존 값을 대체한다
  await ordinaryDailyWage.focus();
  await ordinaryDailyWage.fill('90000');
  await ordinaryDailyWage.blur();
  await expect(ordinaryDailyWage).toHaveValue('90,000');
}

test.describe('퇴직금 골든패스', () => {
  test('근무 조건과 1일 통상임금을 확인하면 결과 hero에 비-0 퇴직금 표시', async ({ page }) => {
    await page.goto('/calculator/severance/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();
    const hero = result.locator('[data-hero-value]');
    // 확인 전에는 금액 대신 확인 안내를 보여 준다
    await expect(hero).toHaveText(/확인해 주세요/);

    await confirmConditions(page);
    await expect(hero).toHaveText(/^[1-9][\d,]*원$/);
  });

  test('평균임금 변경 시 퇴직금 값이 변동', async ({ page }) => {
    await page.goto('/calculator/severance/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('[data-hero-value]');
    await confirmConditions(page);
    await expect(hero).toHaveText(/^[1-9][\d,]*원$/);
    const before = amount(await hero.textContent());

    // 월평균 임금 기초액 300만 → 500만: 1일 평균임금이 올라 퇴직금이 늘어야 한다
    const wage = page.getByLabel('직전 3개월 월평균 임금 기초액', { exact: true });
    await wage.focus();
    await wage.fill('5000000');
    await wage.blur();
    await expect(wage).toHaveValue('5,000,000');
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
  });

  test('근속일수 관련 정보가 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/severance/');
    const result = page.getByRole('region', { name: '계산 결과' });
    await confirmConditions(page);

    // 재직일수·재직 연수는 결과 카드의 주요 행이라 바로 보인다
    await expect(result.getByLabel(/^재직일수: [\d,]+일$/)).toBeVisible();
    await expect(result.getByLabel(/^재직 연수: [\d.]+년$/)).toBeVisible();
  });
});
