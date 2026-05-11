#!/usr/bin/env node
/**
 * STATE.md 자동 영역 갱신 스크립트.
 *
 * 자율로 확인 가능한 항목만 자동 갱신:
 *  - 사이트 라이브 여부 (HTTP HEAD)
 *  - public/ads.txt 게시자 ID 추출
 *  - GitHub Actions 워크플로 활성화 상태 (gh CLI 의존, 미설치 시 skip)
 *
 * 운영자 수동 영역(마커 밖)은 절대 건드리지 않음.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { replaceAutoSection } from './state-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const STATE_FILE = path.join(ROOT_DIR, '.claude', 'STATE.md');
const ADS_TXT = path.join(ROOT_DIR, 'public', 'ads.txt');

const SITE_URL = process.env.SITE_URL || 'https://calculatorhost.com';
const TIMEOUT_MS = 8000;

function nowKST() {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(new Date());
}

async function checkSiteLive() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(SITE_URL, {
      method: 'HEAD',
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (state-check)' },
      redirect: 'manual',
    });
    clearTimeout(timer);
    const ok = res.ok || (res.status >= 300 && res.status < 400);
    return { ok, status: res.status, server: res.headers.get('server') || '' };
  } catch (e) {
    return { ok: false, status: 0, server: '', error: e.message };
  }
}

function readAdsPublisher() {
  try {
    const content = fs.readFileSync(ADS_TXT, 'utf8');
    const m = content.match(/pub-(\d+)/);
    return m ? `pub-${m[1]}` : null;
  } catch {
    return null;
  }
}

function ghWorkflows() {
  try {
    const json = execSync('gh api repos/0gam24/calculatorhost/actions/workflows --paginate', {
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 10000,
      encoding: 'utf8',
    });
    const data = JSON.parse(json);
    return data.workflows || [];
  } catch {
    return null; // gh 미설치 또는 인증 미됨
  }
}

function buildInfraSection({ live, publisher }) {
  const lines = [
    `> 마지막 자동 점검: ${nowKST()} (Asia/Seoul)`,
    '',
    `- 도메인: ${SITE_URL}`,
    `- 사이트 라이브: ${live.ok ? `✅ HTTP ${live.status}` : `❌ HTTP ${live.status || 'N/A'} ${live.error || ''}`}`,
    `- 호스팅: ${live.server || 'unknown'} (Cloudflare Pages 추정)`,
    `- AdSense 게시자: ${publisher ? `✅ ${publisher}` : '❌ public/ads.txt 미발견'}`,
  ];
  return lines.join('\n');
}

function buildAdsenseSection({ publisher }) {
  return [
    `> 마지막 자동 점검: ${nowKST()} (Asia/Seoul)`,
    '',
    `- public/ads.txt 게시자 ID: ${publisher || '없음'}`,
    `- AdSense 운영 상태: ${publisher ? '✅ 라이브 (ads.txt 배포됨)' : '❌ 비활성'}`,
  ].join('\n');
}

function buildWorkflowsSection(workflows) {
  if (!workflows) {
    return `> gh CLI 미설치 또는 인증 미됨 — 수동 확인 필요\n`;
  }
  const lines = [`> 마지막 자동 점검: ${nowKST()} (Asia/Seoul)`, ''];
  for (const wf of workflows) {
    const badge = wf.state === 'active' ? '✅ active' : `⏸️ ${wf.state}`;
    lines.push(`- ${badge}: ${wf.name} (${wf.path})`);
  }
  return lines.join('\n');
}

async function main() {
  console.log(`\n📋 STATE.md 자동 영역 갱신 (${nowKST()})\n`);

  const [live, workflows] = await Promise.all([
    checkSiteLive(),
    Promise.resolve(ghWorkflows()),
  ]);
  const publisher = readAdsPublisher();

  console.log(`  사이트: ${live.ok ? '✅' : '❌'} HTTP ${live.status}`);
  console.log(`  ads.txt: ${publisher || '없음'}`);
  console.log(`  워크플로: ${workflows ? `${workflows.length}개` : 'gh 미접근'}`);

  if (!fs.existsSync(STATE_FILE)) {
    console.error(`❌ STATE.md 없음: ${STATE_FILE}`);
    process.exit(2);
  }

  let content = fs.readFileSync(STATE_FILE, 'utf8');
  content = replaceAutoSection(content, 'infra', buildInfraSection({ live, publisher }));
  content = replaceAutoSection(content, 'adsense', buildAdsenseSection({ publisher }));
  content = replaceAutoSection(content, 'workflows', buildWorkflowsSection(workflows));
  fs.writeFileSync(STATE_FILE, content, 'utf8');

  console.log(`\n✅ ${path.relative(ROOT_DIR, STATE_FILE)} 자동 영역 갱신 완료\n`);
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;
if (isCli) {
  main().catch((err) => {
    console.error('❌ check-state 에러:', err.message);
    process.exit(0);
  });
}
