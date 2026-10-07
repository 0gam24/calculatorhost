// 눈 확인 오프셋(eyeOffset): 네이버 통합검색에서 웹문서 블록이 어디쯤 있는지 운영자가 눈으로 본 값.
//
// 원본: awoo `scripts/lib/eye-offset.mjs` (2026-09-15). 공식 API 로는 블록 위치를 잴 수 없어서
// 목록 위젯 상위 항목에 [첫 화면][한 번 스크롤][그 아래] 버튼을 두고 운영자가 본인 브라우저로 본 뒤 누른다.
//   1 = 첫 화면 · 2 = 한 번 스크롤 · 3 = 그 아래(닫힘)
// 계산기 키워드에서 특히 중요하다: 네이버 자체 계산기 위젯(연봉 실수령액·대출이자 등)이 있으면
// 웹문서가 한참 아래로 밀린다. 그런 쿼리는 운영자가 "그 아래"를 눌러 닫는다.
// Claude 가 자동화 브라우저로 대신 보지 않는다(수집과 같다).
//
// 저장: docs/ops/eye-offset.json (gitignore, 로컬 전용). 7일 지나면 무시한다.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const EYE_FILE = join(ROOT, 'docs', 'ops', 'eye-offset.json');
export const EYE_TTL_DAYS = 7;
export const EYE_CLOSED = 3;
export const EYE_LABEL = { 1: '첫 화면', 2: '한 번 스크롤', 3: '그 아래' };

const norm = (s) => String(s ?? '').replace(/\s+/g, '');
const kstDate = () => new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const daysBetween = (a, b) =>
  Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400_000);

/** 라벨·숫자 입력을 1|2|3 으로. 모르면 null. */
export function parseEyeValue(v) {
  const s = String(v ?? '').replace(/\s+/g, '');
  if (['1', '첫화면'].includes(s)) return 1;
  if (['2', '한번스크롤', '스크롤'].includes(s)) return 2;
  if (['3', '그아래', '아래'].includes(s)) return 3;
  return null;
}

export async function loadEyeStore() {
  try {
    const j = JSON.parse(await readFile(EYE_FILE, 'utf8'));
    return { updatedAt: j.updatedAt ?? null, byQuery: j.byQuery ?? {} };
  } catch {
    return { updatedAt: null, byQuery: {} };
  }
}

export async function saveEyeStore(store) {
  const out = {
    _comment:
      '운영자가 네이버 통합검색을 눈으로 보고 누른 웹문서 블록 위치. 1 첫 화면 · 2 한 번 스크롤 · 3 그 아래(닫힘). 7일 지나면 무시.',
    updatedAt: new Date().toISOString(),
    byQuery: store.byQuery,
  };
  await writeFile(EYE_FILE, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
}

/** 쿼리의 유효한 눈 확인 값(정확 일치 → 공백 무시). 없거나 7일 지났으면 null. */
export function eyeFor(store, query, today = kstDate()) {
  const by = store?.byQuery ?? {};
  let rec = by[query];
  if (!rec) {
    const nq = norm(query);
    rec = Object.entries(by).find(([k]) => norm(k) === nq)?.[1];
  }
  if (!rec || ![1, 2, 3].includes(rec.value) || !rec.date) return null;
  if (daysBetween(rec.date, today) > EYE_TTL_DAYS) return null;
  return rec.value;
}
