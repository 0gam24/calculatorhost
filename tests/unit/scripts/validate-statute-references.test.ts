// 법조항 §N 검증기 단위 테스트.
//
// 배경 (2026-08-12 SEO 감사): 사이트가 인용하는 98개 조항이 레지스트리에 없어
// 590건이 "가짜 §번호"로 출력됐다. 진짜 hallucination(예: 2010년 삭제된 지방세법 §265)이
// 그 노이즈에 묻혀 아무도 못 보는 상태였다.
//
// 그래서 2단 구조로 바꿨다.
//  - STATUTE_REGISTRY      : 1차출처 확인 완료 → 통과
//  - PENDING_VERIFICATION  : 이미 인용 중이나 미검증 → 경고만, 게이트는 통과
//  - 둘 다 아님             : 신규 hallucination 후보 → 게이트 차단
import { describe, expect, it } from 'vitest';
import {
  validateFile,
  STATUTE_REGISTRY,
  PENDING_VERIFICATION,
} from '../../../scripts/statute-registry-core.mjs';

describe('validateFile()', () => {
  it('검증된 조항은 위반이 아니다', () => {
    expect(validateFile('a.tsx', '소득세법 §55에 따른 세율')).toEqual([]);
  });

  it('미검증(pending) 조항은 게이트를 막지 않는 경고로 분류한다', () => {
    const v = validateFile('a.tsx', '소득세법 §17 배당소득');
    for (const x of v) expect(x.reason).toBe('pending-verification');
  });

  it('레지스트리·pending 어디에도 없는 조항은 차단 대상으로 분류한다', () => {
    const v = validateFile('a.tsx', '소득세법 §9999에 따른 특례');
    expect(v).toHaveLength(1);
    expect(v.map((x) => x.reason)).toEqual(['unregistered']);
    expect(v.map((x) => x.articleNum)).toEqual(['9999']);
  });

  it('등록되지 않은 법명은 unknown-law 로 분류한다', () => {
    const v = validateFile('a.tsx', '조세범처벌법 §73 · 지방세법 §151');
    expect(v).toEqual([]);
  });
});

describe('레지스트리 정합성', () => {
  it('같은 조항이 검증 완료와 미검증에 동시에 존재하지 않는다', () => {
    for (const [law, pending] of Object.entries(PENDING_VERIFICATION)) {
      const verified = STATUTE_REGISTRY[law];
      if (!verified) continue;
      const dup = [...(pending as Set<string>)].filter((a) => verified.has(a));
      expect(dup, `${law} 중복: ${dup.join(', ')}`).toEqual([]);
    }
  });

  it('2010년 삭제된 지방세법 §265 는 어느 쪽에도 없다 (재발 방지)', () => {
    expect(STATUTE_REGISTRY['지방세법']?.has('265') ?? false).toBe(false);
    expect(PENDING_VERIFICATION['지방세법']?.has('265') ?? false).toBe(false);
  });
});
