/**
 * scripts/ralph-auto-guide.mjs 의 타입 선언.
 * tests/unit/scripts/ralph-auto-guide.test.ts 에서 import 시 사용.
 */

export interface SeasonalTopic {
  slug: string;
  title: string;
  month: number;
}

export interface GuideJsonResponse {
  title: string;
  description: string;
  keywords: string[];
  leadParagraph: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  conclusion: string;
  authorityLinks: Array<{
    url: string;
    label: string;
  }>;
}

export function sanitizeSlug(input: string): string;
export function pickNextUnpublishedTopic(now?: Date): SeasonalTopic | null;
export function buildSystemPrompt(): string;
export function buildUserPrompt(topic: SeasonalTopic): string;
export function extractJsonFromResponse(text: string): GuideJsonResponse;
export function assembleTsxFromJson(slug: string, json: GuideJsonResponse): string;
