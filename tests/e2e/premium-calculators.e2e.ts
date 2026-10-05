import { expect, test, type Page, type Locator } from '../support/network-fixture';

const hero = (page: Page) =>
  page.locator('[data-calculation-result] > header > p[aria-label]').first();
const money = (text: string | null) => Number((text ?? '').replace(/[^\d.-]/g, ''));
const fillNumber = async (input: Locator, value: string) => {
  // Focus changes comma formatting; let React settle before Playwright selects all.
  await input.focus();
  await input.fill(value);
};
const ready = async (page: Page, slug: string) => {
  await page.goto(`/calculator/${slug}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(
    (slug) =>
      Object.keys(sessionStorage).some((key) => key.startsWith(`calculatorhost:input:v1:${slug}:`)),
    slug,
  );
  await expect(page.locator('[data-calculation-result]').first()).toBeVisible();
  await expect(hero(page)).toHaveText(/\d/);
};

const CALCULATORS = [
  'acquisition-tax',
  'area',
  'averaging-down',
  'bmi',
  'broker-fee',
  'capital-gains-tax',
  'child-tax-credit',
  'comprehensive-property-tax',
  'd-day',
  'deposit',
  'dti',
  'exchange',
  'freelancer-tax',
  'gift-tax',
  'housing-subscription',
  'inflation',
  'inheritance-tax',
  'loan',
  'loan-limit',
  'n-jobber-insurance',
  'property-tax',
  'rent-conversion',
  'rental-yield',
  'retirement',
  'salary',
  'savings',
  'severance',
  'split-buy',
  'split-sell',
  'vat',
  'vehicle-tax',
] as const;

for (const slug of CALCULATORS) {
  test(`route: ${slug} keeps usable controls, metadata, reading order, and finite results`, async ({
    page,
    isMobile,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`/calculator/${slug}/`);
    expect(response?.status()).toBe(200);
    const workspace = page.locator('[data-calculator-workspace]');
    const form = workspace.locator('[data-calculation-form]').first();
    const result = workspace.locator('[data-calculation-result]').first();
    await expect(form).toBeVisible();
    await expect(result).toBeVisible();
    expect(
      await form.evaluate((element) =>
        Boolean(
          element.compareDocumentPosition(document.querySelector('[data-calculation-result]')!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    if (isMobile) {
      const inputBounds = await form.boundingBox();
      const resultBounds = await result.boundingBox();
      expect(resultBounds!.y).toBeGreaterThanOrEqual(inputBounds!.y + inputBounds!.height - 1);
    }
    const issues = await workspace.evaluate((element) =>
      Array.from(
        element.querySelectorAll<HTMLElement>(
          'input:not([type=radio]):not([type=checkbox]),select,button,summary',
        ),
      )
        .filter(
          (control) =>
            control.getClientRects().length && getComputedStyle(control).visibility !== 'hidden',
        )
        .flatMap((control) => {
          const rect = control.getBoundingClientRect();
          const style = getComputedStyle(control);
          const description =
            control.id || control.textContent?.trim().slice(0, 50) || control.tagName;
          return [
            ...(rect.height < 47.5 ? [`${description}: height ${rect.height}`] : []),
            ...(control.tagName === 'INPUT' && Number.parseFloat(style.fontSize) < 16
              ? [`${description}: font ${style.fontSize}`]
              : []),
          ];
        }),
    );
    expect(issues).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
    ).toBeLessThanOrEqual(1);
    await expect(workspace).not.toContainText(/\b(?:NaN|Infinity|undefined)\b/);
    await expect(page.locator('h1')).toHaveCount(1);
    expect((await page.title()).length).toBeGreaterThan(8);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
      'href',
      `https://calculatorhost.com/calculator/${slug}/`,
    );
    const jsonld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonld.length).toBeGreaterThanOrEqual(3);
    const types = jsonld.flatMap((text) => {
      const parsed = JSON.parse(text);
      return (Array.isArray(parsed) ? parsed : [parsed]).flatMap((item) =>
        Array.isArray(item['@type']) ? item['@type'] : [item['@type']],
      );
    });
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('BreadcrumbList');
    expect(errors).toEqual([]);
  });
}

test('core: chosen savings handoff is explicit, private, and retained on back', async ({
  page,
}) => {
  const transmitted: string[] = [];
  page.on('request', (request) => {
    if (
      /google-analytics|googletagmanager|wcs\.naver|doubleclick|googlesyndication/.test(
        request.url(),
      )
    )
      transmitted.push(request.url());
  });
  await ready(page, 'salary');
  await fillNumber(page.locator('#yearly-amount'), '72000000');
  await page.locator('#yearly-amount').blur();
  const chosen = page.locator('#chosen-monthly-saving');
  await expect(chosen).toHaveValue('0');
  const next = page.getByRole('button', { name: /이 저축액으로 적금 계산/ });
  await next.click();
  await expect(page.getByRole('alert').filter({ hasText: /저축액/ })).toBeVisible();
  expect(new URL(page.url()).pathname).toContain('/salary');
  await chosen.fill('350000');
  await next.click();
  await expect(page).toHaveURL(/\/calculator\/savings\/?$/);
  await expect(page.locator('#monthly-deposit')).toHaveValue('350,000');
  expect(new URL(page.url()).search).toBe('');
  // Independent arithmetic: zero-rate savings is exactly deposits × months.
  await fillNumber(page.locator('#annual-rate'), '0');
  await fillNumber(page.locator('#term-months'), '12');
  await page.locator('#term-months').blur();
  await expect.poll(async () => money(await hero(page).textContent())).toBe(4_200_000);
  await page.goBack();
  await expect(page.locator('#yearly-amount')).toHaveValue('72,000,000');
  await expect(page.locator('#chosen-monthly-saving')).toHaveValue('350000');
  expect(new URL(page.url()).search).toBe('');
  expect(transmitted).toEqual([]);
});

test('core: decimal interest and money/duration unit switches preserve value', async ({ page }) => {
  await ready(page, 'loan');
  await fillNumber(page.locator('#annual-rate'), '4.5');
  await page.locator('#annual-rate').blur();
  await expect(page.locator('#annual-rate')).toHaveValue('4.5');
  const principal = page.locator('#principal');
  await fillNumber(principal, '24000000');
  // Switch immediately to catch pending value/debounce races.
  await page.getByRole('combobox', { name: '대출 금액 표시 단위' }).selectOption('만원');
  await principal.blur();
  await expect(principal).toHaveValue('2,400');
  await page.getByRole('combobox', { name: '대출 금액 표시 단위' }).selectOption('원');
  await expect(principal).toHaveValue('24,000,000');
  await fillNumber(page.locator('#annual-rate'), '0');
  await fillNumber(page.locator('#term'), '2');
  await page.locator('#term').blur();
  await expect.poll(async () => money(await hero(page).textContent())).toBe(1_000_000);
  await page.getByRole('radio', { name: '개월', exact: true }).click();
  await expect(page.locator('#term')).toHaveValue('24');
  await expect.poll(async () => money(await hero(page).textContent())).toBe(1_000_000);
  await page.getByRole('radio', { name: '년', exact: true }).click();
  await expect(page.locator('#term')).toHaveValue('2');
  await expect.poll(async () => money(await hero(page).textContent())).toBe(1_000_000);
  await expect(page.locator('#annual-rate').locator('..')).toContainText('%');
  await expect(page.locator('#term').locator('..')).toContainText('년');
});

test('core: blank, malformed, zero, and out-of-range inputs differ', async ({ page }) => {
  await ready(page, 'loan');
  const rate = page.locator('#annual-rate');
  for (const value of ['', 'abc', '-1', '21']) {
    await fillNumber(rate, value);
    await rate.blur();
    await expect(rate).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByRole('alert').first()).toBeVisible();
    await expect(hero(page)).toHaveText('입력을 확인해 주세요');
  }
  await fillNumber(rate, '0');
  await rate.blur();
  await expect(rate).toHaveAttribute('aria-invalid', 'false');
  await expect(hero(page)).toHaveText(/\d/);
  await fillNumber(page.locator('#principal'), '0');
  await page.locator('#principal').blur();
  await expect(page.locator('#principal')).toHaveAttribute('aria-invalid', 'true');
  await expect(hero(page)).toHaveText('입력을 확인해 주세요');
});

test('core: result copy, keyboard confirmation, criteria and official salary rates', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await ready(page, 'salary');
  const criteria = page
    .locator('details.evidence-panel')
    .filter({ has: page.locator('summary').filter({ hasText: /^계산 기준/ }) });
  await expect(criteria).not.toHaveAttribute('open', '');
  await criteria.locator(':scope > summary').click();
  await expect(criteria.locator('a[href*="nps.or.kr"]').first()).toBeVisible();
  await page.getByRole('button', { name: '결과 확인', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-calculation-result]')).toBeFocused();
  await page.getByRole('button', { name: '결과 복사', exact: true }).click();
  await expect(page.getByRole('button', { name: '복사했습니다', exact: true })).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('국민연금');
  expect(copied).toContain('4.75%');
  expect(copied).toContain('3.595%');
  expect(copied).toContain('13.14%');
  expect(copied).toContain((await hero(page).textContent())!.trim());
});

test('core: home has all 31 calculators and keyboard search reaches DTI', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#all-calculators a[href^="/calculator/"]')).toHaveCount(31);
  const links = await page
    .locator('#all-calculators a[href^="/calculator/"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));
  expect(new Set(links).size).toBe(31);
  const search = page.getByRole('combobox', { name: '계산기 검색' });
  await search.fill('총부채상환비율');
  await expect(page.locator('#search-suggestions a[href="/calculator/dti/"]')).toBeVisible();
  await search.press('Enter');
  await expect(page).toHaveURL(/\/calculator\/dti\/?$/);
  await expect(page.locator('[data-calculation-form]')).toBeVisible();
});

test('month: current month, human keyboard replacement, pension caps, and back persistence', async ({
  page,
}) => {
  await ready(page, 'salary');
  const month = page.locator('#calculation-month');
  const currentMonth = await page.evaluate(() => String(new Date().getMonth() + 1));
  await expect(month).toHaveValue(currentMonth);
  const annual = page.locator('#yearly-amount');
  await annual.focus();
  await annual.press('ControlOrMeta+A');
  await annual.pressSequentially('120000000');
  await annual.blur();
  await expect(annual).toHaveValue('120,000,000');
  const details = page
    .locator('[data-calculation-result] details')
    .filter({ has: page.locator('summary').filter({ hasText: /^결과 상세/ }) });
  await details.locator(':scope > summary').click();
  const pension = page.locator('[data-calculation-result] [aria-label^="국민연금:"]');
  await month.selectOption('6');
  // 2026 official worker rate 4.75%, Jan–Jun upper base 6,370,000.
  await expect(pension).toContainText('302,575원');
  await expect(pension).toContainText('6,370,000원');
  await month.selectOption('7');
  // Jul–Dec upper base 6,590,000; multiply independently of production code.
  await expect(pension).toContainText('313,025원');
  await expect(pension).toContainText('6,590,000원');
  await month.selectOption('6');
  await page.goto('/calculator/loan/', { waitUntil: 'networkidle' });
  await page.goBack({ waitUntil: 'networkidle' });
  await expect(month).toHaveValue('6');
  await expect(annual).toHaveValue('120,000,000');
});
