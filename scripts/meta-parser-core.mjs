/**
 * Next.js App Router `page.tsx` 메타데이터 파싱 공용 코어.
 *
 * 배경 (2026-08-12 SEO 감사): 감사 스크립트들이 각자 순진한 정규식으로 메타를 읽어
 * 대량 오탐을 냈다. 오탐은 진짜 회귀를 노이즈에 묻어버리므로 색인·트래픽 방어선을 무력화한다.
 *
 *  ❌ `canonical: URL` (변수 참조)          → "canonical 없음" 오판
 *  ❌ description 안의 `"` 에서 문자열 절단 → 113자를 6자로 오판
 *  ❌ `export const metadata = buildX()`     → "metadata export 누락" 오판
 *
 * 본 모듈이 위 3종을 정확히 처리한다. shebang 없음 = vitest 에서 직접 import 가능.
 *
 * 사용처: scripts/ralph-meta-audit.mjs, scripts/validate-guide-metadata.mjs
 */

/** 템플릿 리터럴 `${VAR}` 는 렌더 시 짧은 값으로 치환되므로 길이 카운트용 자리표시자로 정규화. */
const INTERPOLATION_PLACEHOLDER = '0000';

/**
 * 따옴표 종류를 역참조로 고정해 문자열 안의 다른 따옴표에서 잘리지 않게 한다.
 * `(?:\\.|(?!\1)[^\\])*` — 이스케이프 시퀀스는 통째로 소비, 종료 따옴표만 종료로 인정.
 */
function quotedValuePattern(prefix) {
  return new RegExp(`${prefix}(['"\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`);
}

/**
 * `export const metadata` 를 찾아 본문(객체 리터럴 내부)과 형태를 반환한다.
 *
 * @returns {{ present: boolean, computed: boolean, body: string | null }}
 *   - present:  metadata export 자체의 존재 여부
 *   - computed: `buildGuideCategoryMetadata('tax')` 같은 함수 호출형 (본문 정적 분석 불가 — 누락 아님)
 *   - body:     객체 리터럴일 때 중괄호 내부 텍스트
 */
export function extractMetadataBody(src) {
  if (typeof src !== 'string') return { present: false, computed: false, body: null };

  const decl = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*/.exec(src);
  if (!decl) return { present: false, computed: false, body: null };

  const rest = src.slice(decl.index + decl[0].length);

  // 함수 호출형 — 본문을 정적으로 읽을 수 없으나 metadata 는 정상 생성됨.
  if (/^[A-Za-z_$][\w$]*\s*\(/.test(rest)) {
    return { present: true, computed: true, body: null };
  }

  if (!rest.startsWith('{')) return { present: true, computed: true, body: null };

  const body = sliceBalancedBraces(rest);
  return { present: true, computed: false, body };
}

/**
 * 여는 중괄호부터 짝이 맞는 닫는 중괄호까지 잘라 내부 텍스트를 반환.
 * 문자열·템플릿 리터럴 안의 중괄호는 무시한다 (`{` 가 든 설명문에서 조기 종료 방지).
 */
function sliceBalancedBraces(text) {
  let depth = 0;
  let quote = null;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(1, i);
    }
  }
  return null;
}

/**
 * 메타 본문에서 문자열 필드를 추출한다. 줄바꿈 후 값이 오는 형태도 지원.
 * `ogTitle` 이 `title` 로 잡히지 않도록 키 앞 단어 경계를 강제한다.
 */
export function extractQuotedField(body, field) {
  if (!body) return null;
  const re = quotedValuePattern(`(?<![A-Za-z0-9_$])${field}\\s*:\\s*(?:\\n\\s*)?`);
  const m = body.match(re);
  if (!m) return null;
  return m[2].replace(/\$\{[^}]*\}/g, INTERPOLATION_PLACEHOLDER);
}

/** 파일 최상위 `const NAME = '문자열'` 을 수집 (canonical 변수 참조 해석용). */
export function collectStringConsts(src) {
  const out = new Map();
  if (typeof src !== 'string') return out;
  const re = /(?:^|\n)\s*const\s+([A-Za-z_$][\w$]*)\s*=\s*(['"`])((?:\\.|(?!\2)[^\\])*)\2/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    out.set(m[1], m[3]);
  }
  return out;
}

/**
 * canonical 값을 해석한다. 문자열 리터럴과 변수 참조(`canonical: URL`) 양쪽 지원.
 * @returns {string | null}
 */
export function resolveCanonical(src, body) {
  if (!body) return null;

  const literal = body.match(quotedValuePattern('canonical\\s*:\\s*'));
  if (literal) return literal[2];

  const ref = body.match(/canonical\s*:\s*([A-Za-z_$][\w$]*)/);
  if (!ref) return null;

  return collectStringConsts(src).get(ref[1]) ?? null;
}

/** keywords 배열 항목 수. */
export function extractKeywordsCount(body) {
  if (!body) return 0;
  const m = body.match(/keywords\s*:\s*\[([\s\S]*?)\]/);
  if (!m) return 0;
  return (m[1].match(/(['"`])(?:\\.|(?!\1)[^\\])*\1/g) || []).length;
}

/** 한글 1자 = 1자로 세는 표시 길이(SERP 기준 근사). */
export function displayLength(text) {
  return typeof text === 'string' ? [...text].length : 0;
}
