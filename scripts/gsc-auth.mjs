#!/usr/bin/env node
/**
 * GSC OAuth 일회용 인증 (본인 구글 계정). 의존성 0.
 *
 * 서비스 계정 벽(GSC '사용자 추가' 실패)을 우회 — GSC 속성을 소유한 본인 계정으로 직접 인증.
 * 브라우저에서 "허용" 한 번 → refresh token 을 gsc-oauth-token.json 에 저장.
 * 이후 scripts/gsc-pull.mjs 가 그 토큰으로 자동 조회.
 *
 * 사전 준비(.env.local): OAuth 클라이언트(데스크톱) 자격증명.
 *   GSC_OAUTH_CLIENT_FILE=gsc-oauth-client.json     # 다운로드한 OAuth 클라이언트 JSON (권장)
 *   또는
 *   GSC_OAUTH_CLIENT_ID=...
 *   GSC_OAUTH_CLIENT_SECRET=...
 *
 * 실행(운영자 본인 터미널에서): npm run gsc:auth
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { exec } from 'node:child_process';

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const PORT = 5858;
const REDIRECT = `http://localhost:${PORT}`;
const TOKEN_OUT = resolve(process.cwd(), 'gsc-oauth-token.json');

function loadEnvLocal() {
  const p = resolve(process.cwd(), '.env.local');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (key && !(key in process.env)) process.env[key] = val;
  }
}

function getClient() {
  const file = process.env.GSC_OAUTH_CLIENT_FILE;
  if (file) {
    const fp = resolve(process.cwd(), file);
    if (existsSync(fp)) {
      const j = JSON.parse(readFileSync(fp, 'utf8'));
      const c = j.installed || j.web || j;
      if (c.client_id && c.client_secret) return { id: c.client_id, secret: c.client_secret };
    }
  }
  if (process.env.GSC_OAUTH_CLIENT_ID && process.env.GSC_OAUTH_CLIENT_SECRET) {
    return { id: process.env.GSC_OAUTH_CLIENT_ID, secret: process.env.GSC_OAUTH_CLIENT_SECRET };
  }
  return null;
}

function openBrowser(url) {
  const cmd =
    process.platform === 'win32' ? `cmd /c start "" "${url}"`
    : process.platform === 'darwin' ? `open "${url}"`
    : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

async function main() {
  loadEnvLocal();
  const client = getClient();
  if (!client) {
    console.error('[gsc-auth] OAuth 클라이언트 자격증명이 없습니다.');
    console.error('  → .env.local 에 GSC_OAUTH_CLIENT_FILE=gsc-oauth-client.json (다운로드한 JSON) 지정.');
    console.error('  → 셋업: .claude/reports/GSC-SETUP.md (OAuth 방식)');
    process.exit(2);
  }

  const authUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: client.id,
      redirect_uri: REDIRECT,
      response_type: 'code',
      scope: SCOPE,
      access_type: 'offline',
      prompt: 'consent',
    }).toString();

  const code = await new Promise((resolveP, rejectP) => {
    const timer = setTimeout(() => {
      server.close();
      rejectP(new Error('시간 초과(5분). 다시 실행하세요.'));
    }, 5 * 60 * 1000);
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, REDIRECT);
      const c = u.searchParams.get('code');
      const err = u.searchParams.get('error');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      if (c) {
        res.end('<h2>✅ 인증 완료</h2><p>이 창을 닫고 터미널로 돌아가세요.</p>');
        clearTimeout(timer);
        server.close();
        resolveP(c);
      } else if (err) {
        res.end(`<h2>오류</h2><p>${err}</p>`);
        clearTimeout(timer);
        server.close();
        rejectP(new Error(err));
      } else {
        res.end('대기 중…');
      }
    });
    server.listen(PORT, () => {
      console.log('\n[gsc-auth] 브라우저가 열립니다. 본인 구글 계정으로 로그인 → "허용"을 누르세요.');
      console.log('  (안 열리면 아래 주소를 직접 복사해 여세요)\n');
      console.log(authUrl + '\n');
      console.log('  ※ "Google에서 확인하지 않은 앱" 경고가 나오면: 고급 → 이동(안전하지 않음) 클릭 — 본인 앱이라 정상입니다.\n');
      openBrowser(authUrl);
    });
  });

  const tokRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: client.id,
      client_secret: client.secret,
      redirect_uri: REDIRECT,
      grant_type: 'authorization_code',
    }),
  });
  if (!tokRes.ok) throw new Error(`토큰 교환 실패 ${tokRes.status}: ${(await tokRes.text()).slice(0, 200)}`);
  const tok = await tokRes.json();
  if (!tok.refresh_token) {
    throw new Error('refresh_token 미발급 — 동의 화면에서 이미 승인한 적이 있으면, 구글 계정 보안 → 앱 권한에서 해제 후 재시도.');
  }

  writeFileSync(
    TOKEN_OUT,
    JSON.stringify({ refresh_token: tok.refresh_token, client_id: client.id, client_secret: client.secret }, null, 2),
    'utf8',
  );
  console.log(`[gsc-auth] ✅ 저장: gsc-oauth-token.json (gitignore됨)`);
  console.log('  이제 npm run gsc 로 실적 수집 가능합니다.');
}

main().catch((e) => {
  console.error('[gsc-auth] 오류:', e.message);
  process.exit(1);
});
