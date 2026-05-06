import { test, expect, devices } from '@playwright/test';

test.describe('Visual Regression: Updates Page', () => {
  test('desktop dark theme', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/updates');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      return new Promise(resolve => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => setTimeout(resolve, 500));
        } else {
          setTimeout(resolve, 1000);
        }
      });
    });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('updates-desktop-dark.png');
  });

  test('desktop light theme', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/updates');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('updates-desktop-light.png');
  });

  test('mobile dark theme', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });
    await page.goto('/updates');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      return new Promise(resolve => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => setTimeout(resolve, 500));
        } else {
          setTimeout(resolve, 1000);
        }
      });
    });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('updates-mobile-dark.png');
  });

  test('mobile light theme', async ({ page }) => {
    const pixel7 = devices['Pixel 7'];
    await page.setViewportSize({ width: pixel7.viewport.width, height: pixel7.viewport.height });
    await page.goto('/updates');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('updates-mobile-light.png');
  });
});
