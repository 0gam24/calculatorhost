import { test, expect, devices } from '@playwright/test';

test.describe('Visual Regression: Acquisition Tax Calculator', () => {
  test('desktop dark theme with results', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/calculator/acquisition-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const inputs = page.locator('input#acquisition-price');
    const firstInput = inputs.first();
    await firstInput.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(1500);
    await firstInput.fill('600000000');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('acquisition-tax-desktop-dark.png');
  });

  test('desktop light theme with results', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/calculator/acquisition-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const inputs = page.locator('input#acquisition-price');
    const firstInput = inputs.first();
    await firstInput.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(1500);
    await firstInput.fill('600000000');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('acquisition-tax-desktop-light.png');
  });

  test('mobile dark theme with results', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });

    await page.goto('/calculator/acquisition-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const inputs = page.locator('input#acquisition-price');
    const firstInput = inputs.first();
    await firstInput.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(1500);
    await firstInput.fill('600000000');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('acquisition-tax-mobile-dark.png');
  });

  test('mobile light theme with results', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });

    await page.goto('/calculator/acquisition-tax/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    const inputs = page.locator('input#acquisition-price');
    const firstInput = inputs.first();
    await firstInput.waitFor({ state: 'visible', timeout: 5000 });
    await page.waitForTimeout(1500);
    await firstInput.fill('600000000');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('acquisition-tax-mobile-light.png');
  });
});
