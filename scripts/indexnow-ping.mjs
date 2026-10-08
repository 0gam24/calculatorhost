#!/usr/bin/env node
/**
 * indexnow-ping: push 한 커밋에서 바뀐 페이지를 네이버 IndexNow 로 알린다.
 *
 * 네이버 IndexNow 는 소유확인과 별개로 루트의 키 파일(public/<key>.txt)만 보고 요청을 받는다.
 * GitHub Actions 는 꺼 둔 채로(2026-09-30 운영자 지시), 매일 자동 운영이 push·배포 확인 뒤 이 스크립트를 부른다.
 * 네이버가 받은 갱신 정보는 다른 IndexNow 참여 검색엔진(Bing 등)과도 공유된다.
 *
 * 사용:
 *   node scripts/indexnow-ping.mjs                     # 직전 커밋(HEAD~1..HEAD)에서 바뀐 페이지
 *   node scripts/indexnow-ping.mjs --since=origin/main~3
 *   node scripts/indexnow-ping.mjs --url=https://calculatorhost.com/calculator/vat/
 *   node scripts/indexnow-ping.mjs --dry-run           # 보내지 않고 목록만
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, buildPayload, isValidKey, urlsFromChangedFiles } from './lib/indexnow-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = 'https://searchadvisor.naver.com/indexnow';
const argv = process.argv.slice(2);
const opt = (p) => argv.find((a) => a.startsWith(p))?.slice(p.length);

function findKey() {
  for (const name of readdirSync(join(ROOT, 'public'))) {
    const m = name.match(/^([a-fA-F0-9-]{8,128})\.txt$/);
    if (!m) continue;
    const body = readFileSync(join(ROOT, 'public', name), 'utf8').trim();
    if (body === m[1] && isValidKey(body)) return body;
  }
  return null;
}

async function main() {
  const key = findKey();
  if (!key) throw new Error('public/ 에 IndexNow 키 파일(<key>.txt, 내용=key)이 없습니다');

  let urls;
  const one = opt('--url=');
  if (one) urls = [one];
  else {
    const since = opt('--since=') ?? 'HEAD~1';
    const files = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', since, 'HEAD', '--', 'src/app'], {
      cwd: ROOT,
      encoding: 'utf8',
    })
      .split(/\r?\n/)
      .filter(Boolean);
    urls = urlsFromChangedFiles(files);
    if (urls.length) urls.push(`${SITE}/sitemap.xml`);
  }
  if (!urls.length) return console.log('[indexnow] 바뀐 페이지 없음, 보내지 않음');

  const payload = buildPayload({ key, urls });
  console.log(`[indexnow] ${payload.urlList.length}개: ${payload.urlList.join(' ')}`);
  if (argv.includes('--dry-run')) return;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = (await res.text()).slice(0, 200);
  console.log(`[indexnow] 네이버 응답 ${res.status} ${text}`);
  if (!res.ok) process.exitCode = 1;
}

main().catch((e) => {
  console.error('[indexnow] 실패:', e.message);
  process.exit(1);
});
