import { expect, test } from '@playwright/test';

/**
 * 골든패스 #5 — 광고 운영 방식 가드
 *
 * 2026-08-12 운영자 결정: **수동 광고 슬롯 전면 폐지, Google Auto ads 단독 운영.**
 * 손으로 박아 둔 광고 박스가 페이지 곳곳에 고정돼 있으면 프리미엄 인상을 해치고,
 * 배치 최적화도 Auto ads 쪽이 더 잘한다는 판단. 되돌릴 때는 git 이력 참조.
 *
 * 따라서 이 골든패스가 지키는 것은 다음 두 가지다.
 *  1) Auto ads 스크립트가 살아 있을 것 (= 수익 표면이 사라지지 않았을 것)
 *  2) 수동 슬롯 마크업이 다시 들어오지 않을 것 (= 결정이 조용히 되돌려지지 않을 것)
 */
const SAMPLE_PAGES = [
  '/',
  '/calculator/salary/',
  '/calculator/capital-gains-tax/',
  '/guide/inheritance-tax-calculation-2026/',
];

test.describe('광고 운영 방식', () => {
  test('Auto ads 스크립트가 모든 주요 페이지에 로드된다', async ({ page }) => {
    for (const path of SAMPLE_PAGES) {
      await page.goto(path);
      const script = page.locator('script[src*="adsbygoogle.js"]');
      await expect(script, `${path} 에 Auto ads 스크립트가 있어야 함`).toHaveCount(1);
    }
  });

  test('수동 광고 슬롯 마크업이 존재하지 않는다', async ({ page }) => {
    for (const path of SAMPLE_PAGES) {
      await page.goto(path);

      // 구 AdSlot/InfeedAd/SkyscraperAd/MobileAnchorAd 가 남긴 접근성 라벨
      const legacyLabels = page.locator(
        '[aria-label="광고"], [aria-label="모바일 하단 광고"], [aria-label="우측 광고 영역"], [aria-label="본문 중간 광고"]',
      );
      await expect(legacyLabels, `${path} 에 수동 슬롯이 남아 있음`).toHaveCount(0);
    }
  });

  test('ads.txt 가 게시자 ID와 함께 서빙된다', async ({ page }) => {
    const res = await page.request.get('/ads.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('pub-');
  });
});
