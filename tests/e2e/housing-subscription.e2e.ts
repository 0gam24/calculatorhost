import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #16 — 청약가점
 * 기본값(무주택 5년, 부양가족 2명, 통장 3년)에서 자동 계산된 가점 확인
 */
test.describe('청약가점 골든패스', () => {
  test('결과 확인 클릭 후 결과 표시', async ({ page }) => {
    // 이벤트 핸들러가 붙은 뒤에 누르도록 load 까지 기다린다
    await page.goto('/calculator/housing-subscription/');
    // 가점은 입력 즉시 자동 계산된다. '결과 확인' 버튼은 결과 카드로 초점을 옮긴다
    // ('계산하기' 버튼은 2026-09-30 화면 단순화로 '결과 확인'으로 바뀜)
    await page.getByRole('button', { name: '결과 확인', exact: true }).click();
    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeFocused();

    const score = result.locator('[data-hero-value]');
    await expect(score).toBeVisible();
    const text = (await score.textContent())?.trim() ?? '';
    expect(parseInt(text, 10)).toBeGreaterThan(0);
  });
});
