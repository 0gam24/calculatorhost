/**
 * scripts/load-my-env.mjs 의 타입 선언.
 * Next.js config(TypeScript) 에서 import 시 사용.
 */

export interface LoadMyEnvOptions {
  /** true 면 콘솔 출력 억제 */
  silent?: boolean;
  /** 작업 디렉토리 (기본 process.cwd()) */
  cwd?: string;
}

export interface LoadMyEnvResult {
  /** 새로 로드된 키 개수 */
  loaded: number;
  /** 건너뛴 키 개수 (이미 환경에 있거나 빈 값) */
  skipped: number;
  /** 데이터 출처 ('.my' 또는 null) */
  source: string | null;
  /** 로드된 키 이름 목록 */
  keys: string[];
}

/**
 * .my 파일을 파싱해 process.env 에 주입.
 * 이미 환경에 있는 키는 덮어쓰지 않음 (CI/CD·Cloudflare 환경변수 우선).
 */
export function loadMyEnv(options?: LoadMyEnvOptions): LoadMyEnvResult;
