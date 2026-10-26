import { expect, test } from '../support/network-fixture';

/**
 * 연차 계산기 골든패스
 * - 기본값(입사일 = 오늘에서 1년 전, 기준일 = 오늘, 주 40시간, 5명 이상): 1년차 15일
 * - 입사 2026-01-01, 기준일 2026-12-31: 1년 미만 월 연차 11일 + "하루만 더 다니면" 안내
 *   (대법원 2021다227100: 1년을 마친 다음 날 근로관계가 있어야 15일)
 * - 주 14시간: 주 15시간 미만 안내 (근로기준법 §18③)
 */
test.describe('연차 계산기 골든패스', () => {
  test('기본값으로 1년차 15일 표시', async ({ page }) => {
    await page.goto('/calculator/annual-leave/', { waitUntil: 'domcontentloaded' });

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible({ timeout: 10_000 });
    await expect(result).toContainText('지금 쓸 수 있는 연차');
    await expect(result).toContainText('15일');
  });

  test('딱 1년 되기 전날이면 월 연차 11일과 하루 더 안내', async ({ page }) => {
    await page.goto('/calculator/annual-leave/', { waitUntil: 'domcontentloaded' });

    await page.locator('input[id="annual-leave-hire-date"]').fill('2026-01-01');
    const until = page.locator('input[id="annual-leave-until-date"]');
    await until.fill('2026-12-31');
    await until.blur();

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toContainText('11일', { timeout: 10_000 });
    await expect(result).toContainText('하루만 더 다니면');
  });

  test('주 14시간이면 주 15시간 미만 안내가 보인다', async ({ page }) => {
    await page.goto('/calculator/annual-leave/', { waitUntil: 'domcontentloaded' });

    const weeklyHours = page.locator('input[id="annual-leave-weekly-hours"]');
    await weeklyHours.fill('14');
    await weeklyHours.blur();

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toContainText('주 15시간 미만', { timeout: 10_000 });
  });
});
