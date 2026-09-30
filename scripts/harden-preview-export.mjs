import fs from 'node:fs';
import path from 'node:path';
import { isCloudflarePreview, noindexHtml, PREVIEW_HEADERS } from './preview-export-core.mjs';

if (!isCloudflarePreview(process.env)) {
  console.log('[preview-export] production/local export unchanged');
} else {
  const root = path.resolve('out');
  let count = 0;
  function visit(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, item.name);
      if (item.isDirectory()) visit(absolute);
      else if (item.name.endsWith('.html')) {
        const html = noindexHtml(fs.readFileSync(absolute, 'utf8'));
        if (!html.includes('<meta name="robots" content="noindex, nofollow, noarchive"/>'))
          throw Error(`Missing preview noindex: ${path.relative(root, absolute)}`);
        fs.writeFileSync(absolute, html);
        count++;
      }
    }
  }
  visit(root);
  const headers = path.join(root, '_headers');
  fs.appendFileSync(headers, PREVIEW_HEADERS);
  fs.writeFileSync(path.join(root, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  console.log(
    `[preview-export] ${count} HTML documents noindex; preview HTTP noindex and same-origin CSP enforced`,
  );
}
