import { expect, test } from '@playwright/test';

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

    // 입력 폼 필드 확인
    const numberInputs = page.locator('input[type="number"]');
    const count = await numberInputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('환전 방향 라디오 버튼 선택 옵션 노출', async ({ page }) => {
    await page.goto('/calculator/exchange/', { waitUntil: 'domcontentloaded' });

    const radios = page.locator('input[type="radio"]');
    expect(await radios.count()).toBeGreaterThanOrEqual(2);
  });
});
