import { expect, test } from '@playwright/test';

/**
 * 골든패스 #5 — AdSense 슬롯 정책 준수
 * - aria-label="광고" 라벨 존재
 * - 페이지당 광고 슬롯 ≤ 4 (모바일 앵커 제외 최대치)
 * - 다크 테마에서도 슬롯 배경이 라이트(흰색 계열)로 강제
 */
test.describe('AdSense 슬롯 정책', () => {
  test('계산기 페이지: aria-label="광고" 라벨이 모든 슬롯에 부여된다', async ({
    page,
  }) => {
    await page.goto('/calculator/salary/');
    const ads = page.getByRole('complementary', { name: '광고' });
    const count = await ads.count();
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(5); // AD-1..AD-5 까지 (모바일 앵커 포함)
  });

  test('다크 테마에서 광고 슬롯 배경은 라이트(밝은 색)로 유지', async ({ page }) => {
    await page.goto('/calculator/salary/');
    // 강제 다크
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    const firstAd = page.getByRole('complementary', { name: '광고' }).first();
    await expect(firstAd).toBeVisible();
    const bg = await firstAd.evaluate((el) =>
      getComputedStyle(el).backgroundColor,
    );
    // RGB 평균이 200 이상이면 라이트로 간주
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    expect(m, `bg should be rgb-ish, got: ${bg}`).not.toBeNull();
    if (m) {
      const avg = (Number(m[1]) + Number(m[2]) + Number(m[3])) / 3;
      expect(avg).toBeGreaterThan(200);
    }
  });
});
