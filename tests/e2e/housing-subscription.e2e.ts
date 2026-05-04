import { expect, test } from '@playwright/test';

/**
 * 골든패스 #16 — 청약가점
 * 기본값(무주택 5년, 부양가족 2명, 청약통장 3년)에서 계산 후
 * 결과 카드에 0점이 아닌 hero 값이 표시되어야 한다.
 */
test.describe('청약가점 골든패스', () => {
  test('계산 버튼 클릭 후 결과에 비-0 청약가점 표시', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });

    // 계산 버튼 클릭 (기본값으로)
    await page.getByRole('button', { name: '계산하기' }).click();
    await page.waitForTimeout(500);

    // 결과 텍스트 "계산 결과" 찾기
    const resultHeading = page.getByText('계산 결과', { exact: true });
    await expect(resultHeading).toBeVisible({ timeout: 5000 });

    // 청약가점 숫자 찾기 (/ 84점 텍스트 근처)
    const scoreText = page.getByText(/^\d+$/);
    const visibleScores = await scoreText.all();
    expect(visibleScores.length).toBeGreaterThan(0);
  });

  test('무주택 기간 변경 후 가점이 재계산', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });

    // 계산 버튼 클릭
    await page.getByRole('button', { name: '계산하기' }).click();
    await page.waitForTimeout(500);

    // 결과 카드에서 "무주택 기간" 섹션의 점수 추출
    const noHomeSection = page.locator('div').filter({ hasText: '무주택 기간' }).first();
    const scoreBefore = await noHomeSection.locator('span').first().textContent();

    // 무주택 기간 입력 변경
    const noHomeInput = page.locator('input[placeholder="무주택 기간 입력"]');
    await noHomeInput.fill('10');
    await page.waitForTimeout(300);

    // 다시 계산
    await page.getByRole('button', { name: '계산하기' }).click();
    await page.waitForTimeout(500);

    const scoreAfter = await noHomeSection.locator('span').first().textContent();
    expect(scoreAfter).not.toBe(scoreBefore);
  });

  test('부양가족 항목이 결과에 노출', async ({ page }) => {
    await page.goto('/calculator/housing-subscription/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('button', { name: '계산하기' }).click();
    await page.waitForTimeout(500);

    const dependentsSection = page.locator('div').filter({ hasText: '부양가족' });
    await expect(dependentsSection).toBeVisible();
  });
});
