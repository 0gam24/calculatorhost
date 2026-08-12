export declare const STATUTE_REGISTRY: Record<string, Set<string>>;
export declare const PENDING_VERIFICATION: Record<string, Set<string>>;
export declare const PATTERN: RegExp;
export declare function normalize(name: string): string;
export declare function validateFile(
  filePath: string,
  content: string,
): Array<{
  filePath: string;
  lawName: string;
  articleNum: string;
  reason: 'unregistered' | 'pending-verification' | 'unknown-law';
}>;
