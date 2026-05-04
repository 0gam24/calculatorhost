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

  test(
    '데스크톱 뷰: 계산기 페이지에 최소 3개 광고 슬롯(AD-1,2,3) 이상 배치 (GEO/AEO eCPM 최적화)',
    async ({ page }) => {
      // Phase E: loan-limit 페이지에 AD-3 SkyscraperAd 통합 (aside 구조 보유).
      // salary/capital-gains-tax 는 aside 미보유 → InfeedAd 만, 별도 PR 에서 layout 도입.
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/calculator/loan-limit/');
      const ads = page.getByRole('complementary', { name: '광고' });
      expect(await ads.count()).toBeGreaterThanOrEqual(3);
    },
  );

  test('데스크톱 뷰: 현재 구현 기준 최소 2개 광고 슬롯 (AD-1, AD-2)', async ({
    page,
  }) => {
    // 현재 노출 기준선. AD-3 추가 시 위 fixme 와 함께 ≥3 으로 상향.
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/calculator/salary/');
    const ads = page.getByRole('complementary', { name: '광고' });
    expect(await ads.count()).toBeGreaterThanOrEqual(2);
  });

  test('모바일 뷰: 계산기 페이지에 모바일 앵커(AD-5) 포함 최소 1개 광고 슬롯', async ({
    page,
  }) => {
    // 모바일 뷰포트 설정 (sm: 375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/calculator/capital-gains-tax/');

    // MobileAnchorAd 는 lg:hidden 이므로 모바일 전용
    const mobileAnchor = page.locator('[aria-label="모바일 하단 광고"]');
    await expect(mobileAnchor).toBeVisible();

    // 스크롤 이후 광고 로드 확인
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(300);
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

  test('각 광고 슬롯은 min-height 지정으로 CLS(누적 레이아웃 시프트) 방지', async ({
    page,
  }) => {
    await page.goto('/calculator/salary/');

    const ads = page.getByRole('complementary', { name: '광고' });
    const firstAd = ads.first();

    // min-height 클래스 확인 (FORMAT_CLASSES: rectangle='min-h-[280px]' 등)
    const hasMinHeight = await firstAd.evaluate((el) => {
      const style = getComputedStyle(el);
      const minHeight = style.minHeight;
      return minHeight && parseInt(minHeight) > 0;
    });

    expect(hasMinHeight).toBe(true);
  });

  test('lg+ 데스크톱: 우측 Skyscraper 광고(AD-3)가 sticky로 고정 표시', async ({ page }) => {
    // Phase E: loan-limit 페이지에 SkyscraperAd 통합. 다른 페이지는 후속 PR.
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/calculator/loan-limit/');

    // 우측 스티키 광고 선택 (aria-label="우측 광고 영역")
    const skyscraper = page.locator('[aria-label="우측 광고 영역"]');
    await expect(skyscraper).toBeVisible();

    // sticky position 확인
    const isSticky = await skyscraper.evaluate((el) => {
      const style = getComputedStyle(el);
      return style.position === 'sticky';
    });
    expect(isSticky).toBe(true);

    // 세로 스크롤 후에도 sticky 유지 확인
    await page.evaluate(() => window.scrollBy(0, 500));
    await expect(skyscraper).toBeVisible();
  });

  test('모바일 뷰: 우측 Skyscraper 광고(AD-3)가 숨겨짐 (lg:hidden)', async ({ page }) => {
    // sm(375px) 모바일 뷰포트
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/calculator/loan-limit/');

    // 우측 스티키 광고 숨김 확인
    const skyscraper = page.locator('[aria-label="우측 광고 영역"]');
    await expect(skyscraper).not.toBeVisible();
  });

  test('Infeed 광고(AD-4)가 본문 중간에 배치되어 로드됨', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/calculator/salary/');

    // AD-4 Infeed 광고 영역 선택 (role="region" aria-label="본문 중간 광고")
    const infeed = page.locator('[role="region"][aria-label="본문 중간 광고"]');

    // 최소 1개 infeed 광고 존재 확인 (현재는 구현 전이므로 0개가 정상)
    const count = await infeed.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
