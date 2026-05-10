#!/usr/bin/env node
/**
 * generate-today.mjs
 *
 * today.md 일일 신규 콘텐츠 로그 자동 갱신.
 *
 * 동작:
 *  1. git log 로 최근 24시간(KST) 사이 main 에 추가된 page.tsx 파일 식별
 *     (src/app/guide/**, src/app/calculator/** 만 대상, /opengraph-image.png 등 제외)
 *  2. 각 파일에서 metadata.title + description 정규식 추출
 *  3. 오늘(KST) 날짜 섹션을 today.md 상단에 prepend (이미 존재하면 머지)
 *  4. 신규 항목이 없으면 today.md 변경 없이 종료 (idempotent)
 *
 * 실행:
 *   node scripts/generate-today.mjs            # 오늘 분 갱신
 *   node scripts/generate-today.mjs --dry-run  # 변경 미적용, 출력만
 *
 * 트리거: .github/workflows/today-update.yml (매일 03:30 KST cron + workflow_dispatch).
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = process.cwd();
const SITE = 'https://calculatorhost.com';
const TODAY_MD = resolve(REPO_ROOT, 'today.md');

// ─────────────────────────────────────────────────────────────
// KST 날짜 문자열 (YYYY-MM-DD)
// ─────────────────────────────────────────────────────────────
export function todayKst(now = new Date()) {
  const kst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  return kst.toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────────────────────
// page.tsx 파일에서 metadata.title / description 추출
// ─────────────────────────────────────────────────────────────
export function extractPageMeta(src) {
  const titleMatch = src.match(/title:\s*(['"`])([^'"`]+?)\1/);
  const descMatch = src.match(/description:\s*(?:\r?\n\s*)?(['"`])([^'"`]+?)\1/);
  return {
    title: titleMatch ? titleMatch[2] : null,
    description: descMatch ? descMatch[2] : null,
  };
}

// ─────────────────────────────────────────────────────────────
// 본문 요약 (≤ 120자, 영문 부호 정리)
// ─────────────────────────────────────────────────────────────
export function summarize(description, limit = 120) {
  if (!description) return '';
  const cleaned = description.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= limit) return cleaned;
  return cleaned.slice(0, limit - 1) + '…';
}

// ─────────────────────────────────────────────────────────────
// git log 로 최근 N시간 내 신규 page.tsx 추출
// ─────────────────────────────────────────────────────────────
export function gitNewPageFiles({ sinceIso, repoRoot = REPO_ROOT } = {}) {
  // diff-filter=A → 추가된 파일만. main 의 최근 commits.
  const cmd = `git log --diff-filter=A --name-only --pretty=format: --since="${sinceIso}" -- "src/app/guide/*/page.tsx" "src/app/calculator/*/page.tsx"`;
  let out = '';
  try {
    out = execSync(cmd, { cwd: repoRoot, encoding: 'utf8' });
  } catch {
    return [];
  }
  const unique = new Set();
  for (const line of out.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (!trimmed.endsWith('/page.tsx')) continue;
    unique.add(trimmed);
  }
  return Array.from(unique);
}

// ─────────────────────────────────────────────────────────────
// page.tsx 경로 → URL / type 파생
// ─────────────────────────────────────────────────────────────
export function pathToEntry(relPath, src) {
  // src/app/guide/<slug>/page.tsx 또는 src/app/calculator/<slug>/page.tsx
  const m = relPath.match(/^src\/app\/(guide|calculator)\/([^/]+)\/page\.tsx$/);
  if (!m) return null;
  const [, kind, slug] = m;
  const url = `${SITE}/${kind}/${slug}/`;
  const meta = extractPageMeta(src);
  return {
    kind,
    slug,
    url,
    title: meta.title ?? slug,
    summary: summarize(meta.description),
  };
}

// ─────────────────────────────────────────────────────────────
// 새 섹션을 today.md 에 머지 (이미 같은 날짜 섹션 있으면 항목 추가)
// ─────────────────────────────────────────────────────────────
export function mergeIntoTodayMd(existing, dateStr, entries) {
  const header = `# Today — calculatorhost 일일 신규 콘텐츠 로그

매일 03:30 KST 자동 갱신. 전 24시간 내 main 에 추가된 가이드·계산기 발행분.
원천: \`scripts/generate-today.mjs\` + \`.github/workflows/today-update.yml\` cron.

`;
  const sectionLines = [`## ${dateStr}`, ''];
  if (entries.length === 0) {
    sectionLines.push('- (신규 발행분 없음)');
  } else {
    for (const e of entries) {
      const typeLabel = e.kind === 'guide' ? '가이드' : '계산기';
      const summaryPart = e.summary ? ` — ${e.summary}` : '';
      sectionLines.push(`- [${typeLabel}] [${e.title}](${e.url})${summaryPart}`);
    }
  }
  const newSection = sectionLines.join('\n') + '\n';

  // 기존 파일이 없거나 헤더 없음 → 새로 생성
  if (!existing || !existing.includes('# Today')) {
    return header + newSection;
  }

  // 기존 today.md 에 같은 날짜 섹션이 있는지 검사
  const re = new RegExp(`(##\\s+${dateStr}\\s*\\n[\\s\\S]*?)(?=\\n##\\s+\\d{4}-\\d{2}-\\d{2}|$)`);
  if (re.test(existing)) {
    // 기존 섹션의 항목 set 와 새 항목 set 를 union, 슬러그 중복 제거
    const existingMatch = existing.match(re);
    const existingBlock = existingMatch ? existingMatch[1] : '';
    const existingUrls = new Set(
      Array.from(existingBlock.matchAll(/\]\((https:\/\/calculatorhost\.com\/[^)]+)\)/g)).map(
        (mm) => mm[1],
      ),
    );
    const newOnly = entries.filter((e) => !existingUrls.has(e.url));
    if (newOnly.length === 0) return existing; // 변경 없음
    // 기존 섹션 마지막 줄 뒤에 새 항목 append
    return existing.replace(re, (match) => {
      const trimmed = match.replace(/\n+$/, '');
      const appended = newOnly
        .map((e) => {
          const typeLabel = e.kind === 'guide' ? '가이드' : '계산기';
          const summaryPart = e.summary ? ` — ${e.summary}` : '';
          return `- [${typeLabel}] [${e.title}](${e.url})${summaryPart}`;
        })
        .join('\n');
      return `${trimmed}\n${appended}\n`;
    });
  }

  // 같은 날짜 섹션 없음 → 헤더 직후에 prepend
  const bodyStart = existing.indexOf('\n## ');
  if (bodyStart === -1) {
    return existing.trimEnd() + '\n\n' + newSection;
  }
  return existing.slice(0, bodyStart) + '\n\n' + newSection + existing.slice(bodyStart + 1);
}

// ─────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isMain) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  const today = todayKst();
  // since: 어제 같은 시각 (24h 윈도우)
  const sinceDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const sinceIso = sinceDate.toISOString();

  console.log(`[generate-today] 오늘(KST): ${today}`);
  console.log(`[generate-today] since: ${sinceIso}`);

  const newFiles = gitNewPageFiles({ sinceIso });
  console.log(`[generate-today] 신규 page.tsx 파일: ${newFiles.length}개`);

  const entries = [];
  for (const relPath of newFiles) {
    const fullPath = resolve(REPO_ROOT, relPath);
    if (!existsSync(fullPath)) continue;
    const src = readFileSync(fullPath, 'utf8');
    const entry = pathToEntry(relPath, src);
    if (entry) entries.push(entry);
  }

  for (const e of entries) {
    console.log(`  [${e.kind}] ${e.slug} — ${e.title}`);
  }

  const existing = existsSync(TODAY_MD) ? readFileSync(TODAY_MD, 'utf8') : '';
  const next = mergeIntoTodayMd(existing, today, entries);

  if (next === existing) {
    console.log('[generate-today] 변경 없음 (idempotent)');
    process.exit(0);
  }

  if (dryRun) {
    console.log('[generate-today] --dry-run, 변경 미적용');
    console.log('---');
    console.log(next);
    process.exit(0);
  }

  writeFileSync(TODAY_MD, next, 'utf8');
  console.log(`[generate-today] today.md 갱신 완료 (${entries.length}개 항목 반영)`);
}
