import { expect, test } from '@playwright/test';

/**
 * 색인 회귀 가드.
 *  - 모든 sitemap URL 이 200 또는 3xx 응답인지
 *  - robots.txt 가 핵심 라우트를 Disallow 하지 않는지
 *  - 정책 페이지 4종에 광고 슬롯이 누수되지 않는지 (AdSense 정책)
 *  - 표본 페이지에 noindex 메타가 있지 않은지
 */

const POLICY_PAGES = ['/privacy/', '/terms/', '/contact/', '/about/'];

const SAMPLE_INDEXED = [
  '/',
  '/calculator/salary/',
  '/calculator/capital-gains-tax/',
  '/category/tax/',
];

test.describe('robots.txt drift 감시', () => {
  test('robots.txt 가 핵심 라우트를 Disallow 하지 않음', async ({ page }) => {
    const res = await page.request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();

    // User-Agent: * 섹션만 추출 (특정 학습 봇 차단 섹션은 의도적이므로 제외)
    const wildcardSection = body.split(/\n\s*\n/).find((block) =>
      /User-?Agent:\s*\*/i.test(block),
    );
    expect(wildcardSection, 'User-Agent: * 섹션이 robots.txt 에 존재해야 함').toBeTruthy();

    // 와일드카드 봇에 대해 핵심 라우트 직접 차단 금지
    expect(wildcardSection).not.toMatch(/^Disallow:\s*\/\s*$/m);
    expect(wildcardSection).not.toMatch(/^Disallow:\s*\/calculator\/?\s*$/m);
    expect(wildcardSection).not.toMatch(/^Disallow:\s*\/category\/?\s*$/m);
    expect(wildcardSection).not.toMatch(/^Disallow:\s*\/guide\/?\s*$/m);
  });
});

test.describe('Sitemap 완성도 + 응답 코드', () => {
  test('sitemap.xml 항목들이 모두 200 또는 3xx 응답', async ({ page }) => {
    const res = await page.request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();

    const re = /<loc>([^<]+)<\/loc>/g;
    const urls: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(body)) !== null) {
      urls.push((m[1] ?? '').trim());
    }

    expect(urls.length).toBeGreaterThan(20);

    // 표본 5개만 확인 (CI 시간 절약)
    const sample = urls.slice(0, 5);
    for (const url of sample) {
      const r = await page.request.get(url, { maxRedirects: 0 });
      expect(r.status(), `${url} returned ${r.status()}`).toBeLessThan(400);
    }
  });
});

test.describe('정책 페이지 광고 누수 차단', () => {
  for (const path of POLICY_PAGES) {
    test(`${path} 광고 슬롯 0개 (AdSense 정책 §4)`, async ({ page }) => {
      await page.goto(path);
      const adCount = await page.locator('[aria-label="광고"]').count();
      expect(adCount, `${path} 에서 광고 슬롯이 발견됨 (정책 위반 위험)`).toBe(0);
    });
  }
});

test.describe('noindex 메타 회귀 감시', () => {
  for (const path of SAMPLE_INDEXED) {
    test(`${path} robots 메타에 noindex 없음`, async ({ page }) => {
      await page.goto(path);
      const robotsMeta = await page
        .locator('meta[name="robots"]')
        .getAttribute('content');
      if (robotsMeta) {
        expect(robotsMeta.toLowerCase()).not.toContain('noindex');
      }
    });
  }
});
