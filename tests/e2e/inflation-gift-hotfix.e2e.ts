import { test, expect, type Page } from '@playwright/test';

const hero = (page: Page) =>
  page.locator('[data-calculation-result] > header > p[aria-label]').first();
const numeric = (text: string | null) => Number((text ?? '').replace(/[^\d.-]/g, ''));
const fill = async (page: Page, id: string, value: string) => {
  const field = page.locator('#' + id);
  await field.focus();
  await field.fill(value);
  await field.blur();
};
const amountIs = async (page: Page, value: number) => {
  await expect.poll(async () => numeric(await hero(page).textContent())).toBe(value);
};
const ready = async (page: Page) => {
  await page.goto('/calculator/inflation/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() =>
    Object.keys(sessionStorage).some((k) => k.startsWith('calculatorhost:input:v1:inflation:')),
  );
};
test.beforeEach(async ({ context, baseURL }) => {
  const ownHost = new URL(baseURL!).hostname;
  // Synthetic QA inputs never reach third-party ads or analytics.
  await context.route('**/*', (route) =>
    new URL(route.request().url()).hostname === ownHost ? route.continue() : route.abort(),
  );
});

test('inflation: future cost, purchasing power, input retention and formulas agree', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await ready(page);
  await fill(page, 'amount', '10000000');
  await fill(page, 'years', '1');
  await fill(page, 'annualInflationPercent', '2');
  await amountIs(page, 10_200_000);
  await expect(hero(page)).toHaveAttribute('aria-label', /같은 물건의 미래 필요 금액/);
  await expect(page.getByText('현재보다 200,000원 더 필요합니다.', { exact: false })).toHaveCount(
    1,
  );
  await expect(
    page.locator('[data-calculation-result] [aria-label^="추가 필요 금액:"]'),
  ).toContainText('200,000원');
  await page.locator('input[value="presentValue"]').check();
  await amountIs(page, 9_803_921);
  await expect(page.locator('label[for="amount"]')).toContainText('미래에 받을 금액');
  await page.locator('input[value="purchasingPower"]').check();
  await amountIs(page, 9_803_921);
  await expect(page.locator('label[for="amount"]')).toContainText('현재 금액');
  expect(numeric(await page.locator('#amount').inputValue())).toBe(10_000_000);
  await expect(page.locator('#years')).toHaveValue('1');
  await expect(page.locator('#annualInflationPercent')).toHaveValue('2');
  await fill(page, 'years', '10');
  await amountIs(page, 8_203_482);
  await page.locator('input[value="futureValue"]').check();
  await amountIs(page, 12_189_944);
  const details = page.locator('[data-calculation-result] details').first();
  await details.locator(':scope > summary').click();
  await expect(page.locator('[aria-label^="연평균 금액 변화:"]')).toContainText('218,994원/년');
  await expect(
    page.getByText('미래 필요 금액 = 현재 비용 × 인플레이션계수', { exact: true }),
  ).toHaveCount(1);
  await expect(page.locator('body')).not.toContainText('-200,000원');
  await expect(page.locator('body')).not.toContainText('필요 저축액)');
  await page.reload({ waitUntil: 'networkidle' });
  await amountIs(page, 12_189_944);
  await page.goto('/calculator/gift-tax/');
  await page.goBack({ waitUntil: 'networkidle' });
  await amountIs(page, 12_189_944);
  expect(errors).toEqual([]);
});

test('inflation: zero, tiny changes, blank and invalid inputs stay distinct', async ({ page }) => {
  await ready(page);
  await fill(page, 'years', '10');
  await fill(page, 'annualInflationPercent', '0');
  await amountIs(page, 10_000_000);
  await expect(page.locator('[aria-label^="계산 기간:"]')).toHaveAttribute(
    'aria-label',
    '계산 기간: 10년',
  );
  for (const mode of ['futureValue', 'presentValue', 'purchasingPower']) {
    await page.locator(`input[value="${mode}"]`).check();
    await fill(page, 'amount', '0');
    await amountIs(page, 0);
    await expect(page.locator('[data-calculation-result]')).not.toContainText(/NaN|Infinity/);
  }
  await page.locator('input[value="futureValue"]').check();
  await fill(page, 'amount', '1');
  await fill(page, 'years', '1');
  await fill(page, 'annualInflationPercent', '0.01');
  await amountIs(page, 1);
  await expect(page.locator('[aria-label^="계산 기간:"]')).toHaveAttribute(
    'aria-label',
    '계산 기간: 1년',
  );
  await fill(page, 'years', '0');
  await amountIs(page, 1);
  await fill(page, 'years', '1.5');
  await expect(page.locator('#years')).toHaveAttribute('aria-invalid', 'true');
  await expect(hero(page)).toHaveText('입력을 확인해 주세요');
  await fill(page, 'years', '1');
  await fill(page, 'amount', '');
  await expect(page.locator('#amount')).toHaveAttribute('aria-invalid', 'true');
  await expect(hero(page)).toHaveText('입력을 확인해 주세요');
  await fill(page, 'amount', '-1');
  await expect(page.locator('#amount')).toHaveAttribute('aria-invalid', 'true');
  await fill(page, 'amount', '0');
  await amountIs(page, 0);
});

test('gift: explicit deadline hydrates without clock-dependent text', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/calculator/gift-tax/', { waitUntil: 'networkidle' });
  await expect(page.getByText(/2026년 1월 증여 → 2026년 4월\s*30일까지/)).toBeVisible();
  await expect(hero(page)).toHaveText(/\d/);
  expect(errors).toEqual([]);
});
