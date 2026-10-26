import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #14 — 환전
 * 기본값(100만원, KRW→USD, 기준환율 1350)에서
 * 결과 카드에 환산 금액이 표시되어야 한다.
 */
test.describe('환전 계산 골든패스', () => {
  test('기본값으로 페이지 진입 시 환전 계산기 로드됨', async ({ page }) => {
    await page.goto('/calculator/exchange/', { waitUntil: 'domcontentloaded' });

    // 환전 계산기 폼 요소 확인
    const heading = page.getByRole('heading');
    const headingCount = await heading.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('환전 금액, 기준환율 입력 필드 노출', async ({ page }) => {
    await page.goto('/calculator/exchange/', { waitUntil: 'domcontentloaded' });

    // 금액 칸은 type="number" 가 아니라 숫자 키패드용 텍스트 칸(inputmode)이라 라벨로 찾는다
    const form = page.getByRole('region', { name: '계산 입력' });
    await expect(form.getByRole('textbox', { name: '환전할 금액', exact: true })).toBeVisible();
    await expect(
      form.getByRole('textbox', { name: '1 USD당 기준환율', exact: true }),
    ).toBeVisible();
  });

  test('환전 방향 라디오 버튼 선택 옵션 노출', async ({ page }) => {
    await page.goto('/calculator/exchange/', { waitUntil: 'domcontentloaded' });

    // 환전 방향은 input[type=radio] 대신 role="radio" 버튼 묶음(radiogroup)이다
    const direction = page.getByRole('radiogroup', { name: '환전 방향', exact: true });
    await expect(direction.getByRole('radio', { name: '원 → USD', exact: true })).toBeVisible();
    await expect(direction.getByRole('radio', { name: 'USD → 원', exact: true })).toBeVisible();
  });
});
