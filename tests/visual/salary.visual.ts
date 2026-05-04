import { test, expect, devices } from '@playwright/test';

test.describe('Visual Regression: Salary Calculator', () => {
  test('desktop dark theme with results', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/calculator/salary/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Find input by placeholder or label
    const input = page.locator('input[type="number"]').first();
    await input.waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await input.fill('50000000');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('salary-desktop-dark.png');
  });

  test('desktop light theme with results', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/calculator/salary/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const input = page.locator('input[type="number"]').first();
    await input.waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await input.fill('50000000');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('salary-desktop-light.png');
  });

  test('mobile dark theme with results', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });

    await page.goto('/calculator/salary/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const input = page.locator('input[type="number"]').first();
    await input.waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await input.fill('50000000');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('salary-mobile-dark.png');
  });

  test('mobile light theme with results', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });

    await page.goto('/calculator/salary/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const input = page.locator('input[type="number"]').first();
    await input.waitFor({ timeout: 15000 });
    await page.waitForTimeout(1500);
    await input.fill('50000000');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(500);
    
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('salary-mobile-light.png');
  });
});
