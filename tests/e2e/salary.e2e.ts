import { expect, test } from '../support/network-fixture';

/**
 * 골든패스 #1 — 연봉실수령액
 * 기본값(연봉 5,000만원, 비과세 20만, 부양가족 1, 자녀 0)에서
 * 결과 카드에 0원이 아닌 hero 값이 표시되어야 한다.
 * (정확한 수치는 단위 테스트에서 검증; E2E는 통합 동작만 확인)
 */
const amount = (text: string | null) => Number((text ?? '').replace(/[^\d]/g, ''));

test.describe('연봉실수령액 골든패스', () => {
  test('기본값으로 페이지 진입 시 결과 hero에 비-0 금액 표시', async ({ page }) => {
    await page.goto('/calculator/salary/');

    const result = page.getByRole('region', { name: '계산 결과' });
    await expect(result).toBeVisible();

    const hero = result.locator('[data-hero-value]');
    await expect(hero).toBeVisible();
    const text = (await hero.textContent())?.trim() ?? '';
    // 0원 아니어야 함 (계산 정상 수행 신호)
    expect(text).not.toBe('0원');
    expect(text).toMatch(/[1-9]/);
  });

  test('월 실수령액 행과 4대보험 행이 모두 노출', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const result = page.getByRole('region', { name: '계산 결과' });

    // 결과 카드는 주요 3행만 바로 보여 주고 보험료·세금 행은 '결과 상세'를 펼쳐야 보인다.
    // 카드 제목도 '월 실수령액'이라 글자로 찾으면 두 곳이 걸리므로 행은 "라벨: 금액" 이름으로 찾는다.
    await result.locator('summary', { hasText: '결과 상세' }).click();
    for (const label of ['월 실수령액', '국민연금', '건강보험', '근로소득세']) {
      await expect(result.getByLabel(new RegExp(`^${label}: `))).toBeVisible();
    }
  });

  test('월 비과세 금액을 10만 원 늘리면 실수령액이 증가', async ({ page }) => {
    await page.goto('/calculator/salary/');
    const result = page.getByRole('region', { name: '계산 결과' });
    const hero = result.locator('[data-hero-value]');

    // 비과세 칸은 '내 조건 더 설정' 안에 있다 (+10만 빠른 버튼은 2026-09-30 화면 단순화로 없어짐)
    await page
      .getByRole('region', { name: '계산 입력' })
      .locator('summary', { hasText: '내 조건 더 설정' })
      .click();
    const nontaxable = page.getByLabel('월 비과세 금액', { exact: true });
    // 금액 칸은 포커스되면 쉼표 없는 값으로 다시 그려지므로 먼저 포커스해야 fill 이 기존 값을 대체한다
    await nontaxable.focus();
    const before = amount(await hero.textContent());
    expect(before).toBeGreaterThan(0);
    // 20만 → 30만: 비과세가 늘면 보험료·세금을 매기는 과세 급여가 줄어 실수령액 ↑
    await nontaxable.fill('300000');
    await nontaxable.blur();
    await expect(nontaxable).toHaveValue('300,000');
    await expect.poll(async () => amount(await hero.textContent())).toBeGreaterThan(before);
  });
});
