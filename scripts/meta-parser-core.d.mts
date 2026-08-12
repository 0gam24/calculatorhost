export declare function extractMetadataBody(src: string): {
  present: boolean;
  computed: boolean;
  body: string | null;
};
export declare function extractQuotedField(
  body: string | null,
  field: string,
): string | null;
export declare function collectStringConsts(src: string): Map<string, string>;
export declare function resolveCanonical(
  src: string,
  body: string | null,
): string | null;
export declare function extractKeywordsCount(body: string | null): number;
export declare function displayLength(text: string | null | undefined): number;
