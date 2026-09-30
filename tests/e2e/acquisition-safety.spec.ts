import { expect, test, type Locator, type Page } from '@playwright/test';

const result = (page: Page) => page.locator('[data-calculation-result]').first();
const hero = (page: Page) => result(page).locator(':scope > header > p[aria-label]').first();
const choose = async (page: Page, group: string, option: string) => {
  await page
    .getByRole('radiogroup', { name: group, exact: true })
    .getByRole('radio', { name: option, exact: true })
    .click();
};
const fillAmount = async (input: Locator, amount: number) => {
  // Focus removes comma formatting before selecting the complete draft.
  await input.focus();
  await input.fill(String(amount));
  await input.blur();
};
const expectTotal = async (page: Page, amount: number) => {
  await expect
    .poll(async () => Number(((await hero(page).textContent()) ?? '').replace(/[^\d.-]/g, '')))
    .toBe(amount);
  await expect(result(page).getByRole('button', { name: '결과 복사', exact: true })).toBeVisible();
  await expect(page.getByTestId('acquisition-conditions')).toHaveCount(0);
};
const expectBlocked = async (page: Page) => {
  const guard = page.getByTestId('acquisition-conditions');
  await expect(guard).toHaveAttribute('aria-invalid', 'true');
  await expect(
    result(page).getByRole('heading', { name: '조건 확인 필요', exact: true }),
  ).toBeVisible();
  await expect(hero(page)).not.toHaveText(/\d[\d,]*\s*원/);
  await expect(result(page).getByRole('button', { name: '결과 복사', exact: true })).toHaveCount(0);
  await expect(result(page).getByRole('link')).toHaveCount(0);
  await page.getByRole('button', { name: '결과 확인', exact: true }).click();
  await expect(guard).toBeFocused();
  await expect(result(page)).not.toBeFocused();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/calculator/acquisition-tax/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() =>
    Object.keys(sessionStorage).some((key) =>
      key.startsWith('calculatorhost:input:v1:acquisition-tax:'),
    ),
  );
  await expectTotal(page, 6_600_000);
});

test('acquisition: ordinary residential 600m and 750m have independent tax totals', async ({
  page,
  context,
}) => {
  // <= national size: acquisition 1%/2% + local education 0.1%/0.2%, rural 0.
  await expectTotal(page, 6_600_000);
  await fillAmount(page.locator('#acquisition-price'), 750_000_000);
  await expectTotal(page, 16_500_000);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await result(page).getByRole('button', { name: '결과 복사', exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('16,500,000');
  expect(new URL(page.url()).search).toBe('');
});

test('acquisition: ordinary 700m and 800m retain statutory rounded rates and size-based rural tax', async ({
  page,
}) => {
  // Independently fixed statutory fixtures: 7억 => 1.67%, 8억 => 2.33%.
  // Education is 10% of acquisition; rural is .2% only over national size.
  await fillAmount(page.locator('#acquisition-price'), 700_000_000);
  await expectTotal(page, 12_859_000);
  await choose(page, '국민주택규모를 초과하나요?', '초과함');
  await expectTotal(page, 14_259_000);
  await fillAmount(page.locator('#acquisition-price'), 800_000_000);
  await expectTotal(page, 22_104_000);
  await choose(page, '국민주택규모를 초과하나요?', '초과하지 않음');
  await expectTotal(page, 20_504_000);
});

test('acquisition: first-home relief and unsupported target block totals', async ({ page }) => {
  await expectTotal(page, 6_600_000);
  await page.locator('#first-home').check();
  await expectBlocked(page);
  await page.locator('#first-home').uncheck();
  await choose(page, '대상', '농지 (미지원)');
  await expectBlocked(page);
});

test('acquisition: non-adjusted three homes and adjusted two homes use distinct surcharge totals', async ({
  page,
}) => {
  await fillAmount(page.locator('#acquisition-price'), 800_000_000);
  await choose(page, '취득 후 세대 기준 주택 수', '3주택');
  // Acquisition 64m + education 3.2m; rural exempt at <= national size.
  await expectTotal(page, 67_200_000);
  await choose(page, '취득 후 세대 기준 주택 수', '2주택');
  await choose(page, '조정대상지역인가요?', '예');
  await choose(page, '국민주택규모를 초과하나요?', '초과함');
  // Acquisition 64m + education 3.2m + rural 4.8m.
  await expectTotal(page, 72_000_000);
});

test('acquisition: unconfirmed gift shows no action result; confirmed ordinary gift is 15.2m', async ({
  page,
}) => {
  await choose(page, '취득 방법', '증여');
  await expectBlocked(page);
  await fillAmount(page.locator('#gift-tax-base'), 400_000_000);
  await choose(page, '채무를 함께 인수하는 부담부증여인가요?', '아니요');
  // Acquisition 3.5% + local education .3%; rural exempt at <= national size.
  await expectTotal(page, 15_200_000);
});

test('acquisition: adjusted gift requires exception confirmation and respects whole-house threshold', async ({
  page,
}) => {
  await choose(page, '취득 방법', '증여');
  await fillAmount(page.locator('#gift-tax-base'), 400_000_000);
  await choose(page, '채무를 함께 인수하는 부담부증여인가요?', '아니요');
  await choose(page, '조정대상지역인가요?', '예');
  await fillAmount(page.locator('#gift-whole-house-standard-price'), 300_000_000);
  await expectBlocked(page);
  await choose(
    page,
    '증여자가 1세대 1주택이고, 배우자·직계존비속에게 증여하나요?',
    '해당하지 않음',
  );
  // Statutory acquisition 12% + education .4%, with rural exemption.
  await expectTotal(page, 49_600_000);
  await choose(
    page,
    '증여자가 1세대 1주택이고, 배우자·직계존비속에게 증여하나요?',
    '두 조건 모두 해당',
  );
  await expectTotal(page, 15_200_000);
});

test('acquisition: inheritance is blocked until special-rule confirmation; ordinary total is 17.76m', async ({
  page,
}) => {
  await choose(page, '취득 방법', '상속');
  await expectBlocked(page);
  await fillAmount(page.locator('#standard-price'), 600_000_000);
  await choose(page, '상속 1가구 1주택 취득 특례 적용 여부', '해당 없음');
  // Ordinary inheritance 2.8% + education .16%; rural exempt.
  await expectTotal(page, 17_760_000);
  await choose(page, '상속 1가구 1주택 취득 특례 적용 여부', '특례 해당 (미지원)');
  await expectBlocked(page);
});

test('acquisition: unsupported original acquisition cannot present a zero-won result', async ({
  page,
}) => {
  await choose(page, '취득 방법', '원시취득 (미지원)');
  await expectBlocked(page);
  await expect(hero(page)).not.toHaveText(/^0\s*원$/);
});
