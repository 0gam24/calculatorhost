/**
 * .my 파일을 process.env 로 주입하는 헬퍼.
 *
 * 동작:
 *   - 프로젝트 루트의 .my 파일을 줄 단위로 파싱
 *   - 빈 줄·주석(#)·잘못된 형식 무시
 *   - 이미 process.env 에 있는 키는 덮어쓰지 X (CI/CD·Cloudflare 환경변수 우선)
 *   - .my 가 없으면 조용히 무시 (배포 환경 fallback)
 *
 * 보안:
 *   - 절대 키 값을 콘솔에 출력하지 않음
 *   - 키 이름과 출처만 로그
 *
 * 사용처:
 *   - scripts/sync-public-data.mjs 시작 시
 *   - next.config.ts 시작 시 (빌드 타임 환경변수)
 *   - 모든 Node 스크립트의 첫 줄
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const VALUE_REQUIRED_PREFIXES = []; // 모든 키 허용
const SAFE_TO_LOG_PREFIXES = ['NEXT_PUBLIC_']; // 공개 ID만 로그에 키 이름 노출 (값은 X)

/**
 * .my 파일 파싱 + process.env 주입
 * @returns {{ loaded: number, skipped: number, source: string|null, keys: string[] }}
 */
export function loadMyEnv(options = {}) {
  const { silent = false } = options;
  const cwd = options.cwd || process.cwd();
  const myPath = resolve(cwd, '.my');

  if (!existsSync(myPath)) {
    if (!silent) {
      console.log('[load-my-env] .my 파일 없음 — process.env / 시스템 환경변수만 사용');
    }
    return { loaded: 0, skipped: 0, source: null, keys: [] };
  }

  let content;
  try {
    content = readFileSync(myPath, 'utf8');
  } catch (e) {
    console.warn(`[load-my-env] .my 읽기 실패: ${e.message}`);
    return { loaded: 0, skipped: 0, source: null, keys: [] };
  }

  let loaded = 0;
  const loadedKeys = [];
  const emptyValueKeys = [];   // 빈 값 (KEY= 또는 빈 값)
  const alreadySetKeys = [];   // 이미 환경에 존재
  let invalidLines = 0;        // = 없거나 형식 오류

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) {
      invalidLines++;
      continue;
    }

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (!key) {
      invalidLines++;
      continue;
    }

    // 양쪽 따옴표 자동 제거 (사용자 실수 방지): "키" 또는 '키' 형태
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).trim();
    }

    if (!value) {
      emptyValueKeys.push(key);
      continue;
    }

    if (process.env[key]) {
      alreadySetKeys.push(key);
      continue;
    }

    process.env[key] = value;
    loaded++;
    loadedKeys.push(key);
  }

  if (!silent) {
    if (loaded > 0) {
      const display = loadedKeys.map((k) =>
        SAFE_TO_LOG_PREFIXES.some((p) => k.startsWith(p)) ? k : `${k} [hidden]`,
      );
      console.log(`[load-my-env] .my 에서 ${loaded}개 키 로드: ${display.join(', ')}`);
    }
    if (emptyValueKeys.length > 0) {
      console.log(
        `[load-my-env] ${emptyValueKeys.length}개 키 빈 값 (= 뒤가 비어있음): ${emptyValueKeys.join(', ')}`,
      );
    }
    if (alreadySetKeys.length > 0) {
      console.log(
        `[load-my-env] ${alreadySetKeys.length}개 키 이미 환경에 있음 (덮어쓰지 않음): ${alreadySetKeys.join(', ')}`,
      );
    }
    if (invalidLines > 0) {
      console.log(`[load-my-env] ${invalidLines}개 잘못된 형식 줄 건너뜀 (=  없음 등)`);
    }
  }

  const skipped = emptyValueKeys.length + alreadySetKeys.length + invalidLines;
  return { loaded, skipped, source: '.my', keys: loadedKeys };
}

// 직접 실행 시 (node scripts/load-my-env.mjs) 동작 확인용
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  loadMyEnv();
}
