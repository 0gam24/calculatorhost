export type AuthMode = 'hub' | 'legacy' | null;
export interface NaverAuth {
  mode: AuthMode;
  headers: Record<string, string>;
}
export declare function endpointFor(mode: 'hub' | 'legacy', name: string): string;
export declare function authFor(env: Record<string, string | undefined>): NaverAuth;
export declare function loadEnv(root: string): Promise<Record<string, string | undefined>>;
export declare function apiGet(auth: NaverAuth, name: string, params: Record<string, string | number>): Promise<any>;
export declare function apiTrend(auth: NaverAuth, body: unknown): Promise<any>;
