import { expect, test } from '@playwright/test';

/**
 * 골든패스 #3 — 다크↔라이트 토글 + localStorage 영속성
 */
/**
 * 토글 클릭 전 hydration 동기 보장: ThemeToggle 의 useState 초기값('dark')이
 * useEffect 로 documentElement.data-theme 와 동기화될 때까지 기다린다.
 * 동기 신호 = 토글 버튼의 aria-label 이 현재 테마의 반대를 가리킴.
 */
async function waitForThemeSync(
  page: import('@playwright/test').Page,
  current: 'dark' | 'light',
) {
  const expectedAria = current === 'dark' ? /라이트 모드로 전환/ : /다크 모드로 전환/;
  const toggle = page.getByRole('button', { name: expectedAria });
  await expect(toggle).toBeVisible();
  return toggle;
}

test.describe('테마 토글', () => {
  test('토글 클릭 시 data-theme 속성과 localStorage 모두 갱신', async ({ page }) => {
    await page.goto('/');
    const initial = (await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme'),
    )) as 'dark' | 'light' | null;
    expect(initial === 'dark' || initial === 'light').toBe(true);

    const toggle = await waitForThemeSync(page, initial as 'dark' | 'light');
    await toggle.click();

    const next = initial === 'dark' ? 'light' : 'dark';
    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.getAttribute('data-theme')),
    ).toBe(next);

    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe(next);
  });

  test('새로고침 후에도 토글한 테마가 유지된다', async ({ page }) => {
    await page.goto('/');
    const initial = (await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme'),
    )) as 'dark' | 'light';

    const toggle = await waitForThemeSync(page, initial);
    await toggle.click();
    const next = initial === 'dark' ? 'light' : 'dark';
    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.getAttribute('data-theme')),
    ).toBe(next);

    await page.reload();
    const persisted = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme'),
    );
    expect(persisted).toBe(next);
  });
});
