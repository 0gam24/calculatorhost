/**
 * Cloudflare Pages Functions 환경변수 타입
 * Phase 2 API 프록시 구성
 */

interface KVNamespace {
  get(key: string, type?: string | { type: string }): Promise<unknown>;
  put(key: string, value: unknown, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  /**
   * Rate limiting을 위한 KV Namespace
   * Cloudflare 대시보드에서 생성 후 wrangler.toml에 ID 입력
   */
  RATE_LIMIT_KV?: KVNamespace;

  /**
   * 국토부 실거래가 API 인증키
   * Cloudflare Pages 프로젝트 환경변수에서 설정
   * 코드에서는 context.env.MOLIT_REALTOR_API_KEY로 접근
   */
  MOLIT_REALTOR_API_KEY?: string;

  /**
   * 행안부 도로명주소 API 인증키
   * Cloudflare Pages 프로젝트 환경변수에서 설정
   * 코드에서는 context.env.JUSO_API_KEY로 접근
   */
  JUSO_API_KEY?: string;
}

/**
 * Cloudflare Pages Function 타입
 * 핸들러가 context.env에 위의 Env 타입 적용
 */
type PagesFunction<E = unknown> = (
  context: {
    request: Request;
    functionPath: string;
    waitUntil: (promise: Promise<unknown>) => void;
    passThroughOnException: () => void;
    next: () => Promise<Response>;
    env: Env & E;
  },
) => Response | Promise<Response>;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 개발 환경용 환경변수 (실제 키는 Cloudflare 대시보드에서 설정)
      MOLIT_REALTOR_API_KEY?: string;
      JUSO_API_KEY?: string;
    }
  }
}
