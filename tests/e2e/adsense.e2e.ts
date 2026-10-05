import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #5 — 광고 운영 방식 가드
 *
 * 2026-08-12 운영자 결정: **수동 광고 슬롯 전면 폐지, Google Auto ads 단독 운영.**
 * 손으로 박아 둔 광고 박스가 페이지 곳곳에 고정돼 있으면 프리미엄 인상을 해치고,
 * 배치 최적화도 Auto ads 쪽이 더 잘한다는 판단. 되돌릴 때는 git 이력 참조.
 *
 * 로컬 QA는 외부 광고를 활성화하지 않고 수동 슬롯 재도입·ads.txt 회귀를 검사한다.
 * 운영 도메인의 로더 생명주기는 외부 전송 없는 별도 모킹 검사로 확인한다.
 */
const SAMPLE_PAGES = [
  '/',
  '/calculator/salary/',
  '/calculator/capital-gains-tax/',
  '/guide/inheritance-tax-calculation-2026/',
];

test.describe('광고 운영 방식', () => {
  test('로컬 QA에서 실제 Auto ads 스크립트를 활성화하지 않는다', async ({ page }) => {
    for (const path of SAMPLE_PAGES) {
      await page.goto(path);
      const script = page.locator('script[src*="adsbygoogle.js"]');
      await expect(script, `${path} 로컬 QA는 실제 광고를 활성화하지 않아야 함`).toHaveCount(0);
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

  test('ads.txt 가 게시자 ID와 함께 서빙된다', async ({ qaRequest }) => {
    const res = await qaRequest.get('/ads.txt');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('pub-');
  });
});
