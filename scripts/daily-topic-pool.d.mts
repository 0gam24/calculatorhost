export interface DailyTopic {
  slug: string;
  title: string;
  category: string;
  months?: number[];
}
export declare const POOL_FROZEN: boolean;
export declare const DAILY_TOPIC_POOL: DailyTopic[];
export declare function readExistingSlugs(repoRoot?: string): Set<string>;
export declare function pickDailyTopic(options?: { existingSlugs?: Set<string>; now?: Date }): DailyTopic | null;
export declare function remainingTopicCount(existingSlugs?: Set<string>): number;
