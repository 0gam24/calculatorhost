import { expect, test } from '@playwright/test';

/**
 * 골든패스 #1 — 연봉실수령액
 * 기본값(연봉 5,000만원, 비과세 20만, 부양가족 1, 자녀 0)에서
 * 결과 카드에 0원이 아닌 hero 값이 표시되어야 한다.
 * (정확한 수치는 단위 테스트에서 검증; E2E는 통합 동작만 확인)
 */
test.describe('연봉실수령액 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 금액 표시', async ({ page }) => {
    await page.goto('/calculator/salary/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('.hero-number');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    // 0원 아니어야 함 (계산 정상 수행 신호)
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('월 실수령액 행과 4대보험 행이 모두 노출', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const result = page.getByRole('region', { name: '계산 결과' });

    await expect(result.getByText('월 실수령액', { exact: true })).toBeVisible();
    await expect(result.getByText('국민연금', { exact: true })).toBeVisible();
    // "건강보험" 은 행 라벨 + "건강보험료 × 12.95%" 노트에도 포함 → exact 로 행 라벨만
    await expect(result.getByText('건강보험', { exact: true })).toBeVisible();
    await expect(result.getByText('근로소득세', { exact: true })).toBeVisible();
  });

  test('비과세 +10만 단위 버튼 클릭 시 실수령액이 변동(증가)', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('.hero-number');

    const before = (await hero.textContent())?.trim() ?? '';
    // 비과세 +10만 버튼: 비과세가 늘면 과세소득이 줄어 실수령액 ↑
    await page.getByRole('button', { name: '+십만', exact: false }).first().click();
    // 디바운스 150ms 대기
    await page.waitForTimeout(300);
    const after = (await hero.textContent())?.trim() ?? '';
    expect(after).not.toBe(before);
  });
});
