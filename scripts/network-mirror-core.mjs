export function extractPageMeta(source) {
  const title = source.match(/title:\s*(['"`])([^'"`]+?)\1/);
  const description = source.match(/description:\s*(?:\r?\n\s*)?(['"`])([^'"`]+?)\1/);
  const published =
    source.match(/const\s+DATE_PUBLISHED\s*=\s*['"](\d{4}-\d{2}-\d{2})['"]/) ??
    source.match(/datePublished:\s*['"](\d{4}-\d{2}-\d{2})['"]/);
  const modified =
    source.match(/const\s+DATE_MODIFIED\s*=\s*['"](\d{4}-\d{2}-\d{2})['"]/) ??
    source.match(/dateModified:\s*['"](\d{4}-\d{2}-\d{2})['"]/);
  return {
    title: title?.[2] ?? null,
    description: description?.[2] ?? null,
    datePublished: published?.[1] ?? null,
    dateModified: modified?.[1] ?? null,
  };
}

export function latestMirroredModification(manifest, routes) {
  const dates = routes.map((route) => {
    const date = manifest[route];
    if (typeof date !== 'string' || !Number.isFinite(Date.parse(date)))
      throw new Error(`Missing committed modification date: ${route}`);
    return date;
  });
  if (!dates.length) throw new Error('No committed modification dates for network mirror pages');
  return new Date(Math.max(...dates.map((date) => Date.parse(date)))).toISOString();
}
