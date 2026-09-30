import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SNAPSHOT_FILES, validateBuildInputs } from './build-inputs-core.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const documents = {};
const pageFiles = [];

function listPages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) listPages(absolute);
    else if (entry.name === 'page.tsx')
      pageFiles.push(path.relative(root, absolute).replaceAll('\\', '/'));
  }
}

try {
  for (const name of [...SNAPSHOT_FILES, 'date-modified-manifest.json']) {
    documents[name] = JSON.parse(fs.readFileSync(path.join(root, 'src/data', name), 'utf8'));
  }
  listPages(path.join(root, 'src/app'));
  const errors = validateBuildInputs(documents, pageFiles);
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(
    `[build-inputs] ${SNAPSHOT_FILES.length} committed data snapshots and ${Object.keys(documents['date-modified-manifest.json']).length} page dates validated; no synchronization or account access.`,
  );
} catch (error) {
  console.error(`[build-inputs] ${error.message}`);
  process.exitCode = 1;
}
