import { expect, test } from '../support/network-fixture';

/**
 * 주휴수당 계산기 골든패스
 * - 기본값(2026 최저시급 10,320원, 주 40시간, 개근): 1주 주휴수당 82,560원
 * - 주 14시간 입력 시 주 15시간 미만 안내 메시지 표시
 */
test.describe('주휴수당 골든패스', () => {
  test('기본값으로 결과에 82,560원 표시', async ({ page }) => {
    await page.goto('/calculator/weekly-holiday-allowance/', {
      waitUntil: 'domcontentloaded',
    });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 10_000 });
    await expect(result).toContainText('82,560원');
  });

  test('주 14시간이면 주 15시간 미만 안내가 보인다', async ({ page }) => {
    await page.goto('/calculator/weekly-holiday-allowance/', {
      waitUntil: 'domcontentloaded',
    });

    const weeklyHours = page.locator('input[id="weekly-holiday-weekly-hours"]');
    await weeklyHours.fill('14');
    await weeklyHours.blur();

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 10_000 });
    await expect(result).toContainText('주 15시간 미만');
  });
});
