#!/usr/bin/env node
/**
 * dateModified manifest 생성.
 *
 * 모든 page.tsx 의 마지막 git 커밋 시각을 ISO 날짜로 추출 → JSON 매니페스트.
 * 빌드 시점 (prebuild) 에 한 번 생성. jsonld helper 가 import 해서 freshness 신호 자동.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { buildManifest, pageFileToRoute } from './date-modified-core.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'src', 'data', 'date-modified-manifest.json');

function listPageFiles(dir, base = '') {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listPageFiles(abs, rel));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      out.push(rel.replace(/\\/g, '/'));
    }
  }
  return out;
}

function getGitLastModifiedIso(absFile) {
  try {
    const cwd = ROOT_DIR;
    const rel = path.relative(cwd, absFile).replace(/\\/g, '/');
    const out = execSync(`git log -1 --format=%cI -- "${rel}"`, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || '';
  } catch {
    return '';
  }
}

function main() {
  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const relFiles = listPageFiles(appDir).map((f) => 'src/app/' + f);

  const entries = relFiles.map((rel) => {
    const route = pageFileToRoute(rel);
    if (!route) return null;
    const abs = path.join(ROOT_DIR, rel);
    return { file: rel, isoDate: getGitLastModifiedIso(abs) };
  }).filter(Boolean);

  const manifest = buildManifest(entries);
  const sortedKeys = Object.keys(manifest).sort();
  const ordered = {};
  for (const k of sortedKeys) ordered[k] = manifest[k];

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(ordered, null, 2) + '\n', 'utf8');

  console.log(`📅 date-modified manifest: ${Object.keys(manifest).length}개 라우트 → ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;
if (isCli) {
  try { main(); } catch (e) { console.error('❌', e.message); process.exit(0); }
}
