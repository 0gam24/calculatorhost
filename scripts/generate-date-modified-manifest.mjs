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
import { execFileSync } from 'node:child_process';
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

function shallowBoundaryCommits() {
  try {
    const shallowPath = execFileSync('git', ['rev-parse', '--git-path', 'shallow'], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const absolute = path.resolve(ROOT_DIR, shallowPath);
    if (!fs.existsSync(absolute)) return new Set();
    return new Set(fs.readFileSync(absolute, 'utf8').trim().split(/\s+/));
  } catch {
    return new Set();
  }
}

function getGitLastModifiedIso(absFile, boundaries) {
  try {
    const cwd = ROOT_DIR;
    const rel = path.relative(cwd, absFile).replace(/\\/g, '/');
    const out = execFileSync('git', ['log', '-1', '--format=%H %cI', '--', rel], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const [commit, iso] = out.split(/\s+/);
    // A shallow boundary presents every file as newly added. Preserve known
    // dates instead of stamping the entire site with that checkout commit.
    return boundaries.has(commit) ? '' : iso || '';
  } catch {
    return '';
  }
}

function main() {
  let previous = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    previous = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  }
  const boundaries = shallowBoundaryCommits();
  const appDir = path.join(ROOT_DIR, 'src', 'app');
  const relFiles = listPageFiles(appDir).map((f) => 'src/app/' + f);

  const entries = relFiles
    .map((rel) => {
      const route = pageFileToRoute(rel);
      if (!route) return null;
      const sources = [rel];
      if (route === '/updates/') sources.push('src/lib/constants/updates-log.ts');
      const dates = sources
        .map((file) => getGitLastModifiedIso(path.join(ROOT_DIR, file), boundaries))
        .filter((date) => date && !Number.isNaN(Date.parse(date)))
        .sort((a, b) => Date.parse(b) - Date.parse(a));
      return { file: rel, isoDate: dates[0] || '' };
    })
    .filter(Boolean);

  const manifest = buildManifest(entries, previous);
  const sortedKeys = Object.keys(manifest).sort();
  const ordered = {};
  for (const k of sortedKeys) ordered[k] = manifest[k];

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(ordered, null, 2) + '\n', 'utf8');

  console.log(
    `📅 date-modified manifest: ${Object.keys(manifest).length}개 라우트 → ${path.relative(ROOT_DIR, MANIFEST_PATH)}`,
  );
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;
if (isCli) {
  try {
    main();
  } catch (e) {
    console.error('❌', e.message);
    process.exit(0);
  }
}
