#!/usr/bin/env node

/**
 * YORO Phase P — Ralph B: 외부 링크 헬스 체크
 *
 * 모든 page.tsx + content/ 에서 외부 링크(https://)를 추출하고
 * 도메인별 HEAD 요청으로 상태 확인 → 실패 URL을 stuck.md 에 기록
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, '.claude', 'reports');
const STUCK_FILE = path.join(ROOT_DIR, '.claude', 'stuck.md');

const TIMEOUT_MS = 10000;
const MAX_RETRIES = 1;

// 한국 시간대 포맷터
function formatDateKST(date = new Date()) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);
}

/**
 * page.tsx + content/ MDX 파일에서 모든 외부 URL 추출
 */
function extractExternalLinks() {
  const links = new Map(); // domain -> [urls]

  // page.tsx 파일들
  const pagesDir = path.join(ROOT_DIR, 'src', 'app');
  const contentDir = path.join(ROOT_DIR, 'content');

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir, { recursive: true });
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (!stat.isFile()) continue;
      if (!fullPath.endsWith('.tsx') && !fullPath.endsWith('.mdx') && !fullPath.endsWith('.md')) continue;

      try {
        const content = fs.readFileSync(fullPath, 'utf8');

        // URL 패턴 추출 (href, url, link 속성 + URL 문자열)
        const urlPattern = /https?:\/\/[^\s"')`}>\]]+/g;
        const matches = content.match(urlPattern) || [];

        for (let url of matches) {
          // URL 정리 (마지막 문자 정제)
          url = url.replace(/[,;.!?"\')}`}>\]]*$/, '');

          // 자체 도메인 제외
          if (url.includes('calculatorhost.com')) continue;

          try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;

            if (!links.has(domain)) {
              links.set(domain, new Set());
            }
            links.get(domain).add(url);
          } catch (e) {
            // 잘못된 URL 무시
          }
        }
      } catch (e) {
        console.error(`파일 읽기 실패: ${fullPath}`, e.message);
      }
    }
  }

  scanDirectory(pagesDir);
  scanDirectory(contentDir);

  return links;
}

/**
 * 도메인당 HEAD 요청 1회만 수행 (대표 URL).
 *
 * 한국 정부·공공기관 사이트 다수가 HEAD 메서드 거부(405) 또는 봇 차단(403) →
 * 1) Method: GET (body 무시), 2) 브라우저 풍 User-Agent, 3) 405/403/404 시
 * GET 폴백 한 번 더 시도. 정상 응답(200/201/204/3xx) 모두 OK 처리.
 */
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const COMMON_HEADERS = {
  'User-Agent': BROWSER_UA,
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
};

async function fetchOnce(testUrl, method, signal) {
  return fetch(testUrl, {
    method,
    headers: COMMON_HEADERS,
    signal,
    // manual 로 받으면 3xx 도 status 코드로 노출 → '도메인 살아 있음' 판정 가능.
    // follow 는 chain 중간 timeout / TLS issue 시 entire request 실패로 처리되어 N/A 양산.
    redirect: 'manual',
  });
}

async function checkDomainHealth(domain, urls) {
  // 도메인당 첫 번째 URL만 확인
  const testUrl = Array.from(urls)[0];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      // 1차 HEAD 시도 (서버가 허용하면 빠르고 가벼움)
      let response = await fetchOnce(testUrl, 'HEAD', controller.signal);

      // HEAD 가 봇 차단 / 메서드 거부 (4xx 일부) → GET 폴백
      if (response.status === 405 || response.status === 403 || response.status === 404) {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), TIMEOUT_MS);
        try {
          response = await fetchOnce(testUrl, 'GET', controller2.signal);
        } finally {
          clearTimeout(timeout2);
        }
      }

      clearTimeout(timeout);

      // 200~299 와 3xx(redirect) 모두 정상으로 간주.
      // redirect: 'follow' 인데도 3xx 가 반환되면 fetch 가 추적 한도에 걸린 케이스 →
      // 도메인 자체는 살아 있으므로 OK 처리.
      const ok = response.ok || (response.status >= 300 && response.status < 400);

      return {
        status: response.status,
        ok,
        statusText: response.statusText,
        testUrl,
      };
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        return {
          status: 0,
          ok: false,
          statusText: error.name === 'AbortError' ? 'Timeout' : error.message,
          testUrl,
        };
      }
      // 재시도
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

/**
 * stuck.md 갱신 (30일 이상 미동기 API 기록)
 */
function updateStuckFile(failedDomains) {
  let content = '';

  if (fs.existsSync(STUCK_FILE)) {
    content = fs.readFileSync(STUCK_FILE, 'utf8');
  } else {
    content = '# stuck.md — YORO 헬스 체크 이슈\n\n';
  }

  // "## Link Health" 섹션 업데이트 또는 추가
  let linkHealthSection = `## Link Health (${formatDateKST()})\n\n`;

  for (const domain of failedDomains) {
    linkHealthSection += `- **${domain}**: 4xx/5xx 응답 감지 (ralph-link-health 실행 권장)\n`;
  }
  linkHealthSection += '\n';

  // 기존 Link Health 섹션 제거 후 새로 추가
  const linkHealthRegex = /## Link Health \([^)]+\)\n\n[\s\S]*?(?=\n## |\n$)/;
  if (linkHealthRegex.test(content)) {
    content = content.replace(linkHealthRegex, linkHealthSection);
  } else {
    content = linkHealthSection + content;
  }

  fs.writeFileSync(STUCK_FILE, content, 'utf8');
}

/**
 * 보고서 생성
 */
async function main() {
  console.log('\n🔗 외부 링크 헬스 체크 (ralph-link-health)\n');
  console.log(`기준 시간: ${formatDateKST()}\n`);

  const links = extractExternalLinks();
  const domains = Array.from(links.keys()).sort();

  if (domains.length === 0) {
    console.log('ℹ️  외부 링크를 찾을 수 없습니다.\n');
    process.exit(0);
  }

  console.log(`🔍 감지된 도메인: ${domains.length}개\n`);

  // 테이블 헤더
  console.log('┌─────────────────────────┬────────┬──────────────────────────────┐');
  console.log('│ 도메인                  │ 상태   │ 테스트 URL                   │');
  console.log('├─────────────────────────┼────────┼──────────────────────────────┤');

  const results = [];
  const failedDomains = [];

  for (const domain of domains) {
    const urls = links.get(domain);
    const result = await checkDomainHealth(domain, urls);
    results.push({ domain, ...result, urlCount: urls.size });

    const statusBadge = result.ok ? '✅' : '❌';
    const statusCode = result.status || 'N/A';
    const displayUrl = result.testUrl.substring(0, 28);

    console.log(
      `│ ${domain.padEnd(23)} │ ${statusBadge} ${String(statusCode).padEnd(4)} │ ${displayUrl.padEnd(28)} │`
    );

    if (!result.ok && result.status >= 400) {
      failedDomains.push(domain);
    }
  }

  console.log('└─────────────────────────┴────────┴──────────────────────────────┘');

  // 통계
  const healthyCount = results.filter(r => r.ok).length;
  const failedCount = results.filter(r => !r.ok).length;

  console.log(`\n📊 요약: 정상 ${healthyCount}/${domains.length}, 실패 ${failedCount}/${domains.length}\n`);

  // 보고서 파일 생성
  const reportPath = path.join(REPORTS_DIR, `link-health-${new Date().toISOString().split('T')[0]}.md`);

  let reportContent = `# 외부 링크 헬스 체크 보고서\n\n`;
  reportContent += `**생성 시간**: ${formatDateKST()}\n\n`;
  reportContent += `## 요약\n\n`;
  reportContent += `- 도메인 수: ${domains.length}\n`;
  reportContent += `- 정상: ${healthyCount}\n`;
  reportContent += `- 실패: ${failedCount}\n\n`;

  if (failedCount > 0) {
    reportContent += `## 실패 도메인\n\n`;
    for (const result of results.filter(r => !r.ok)) {
      reportContent += `### ${result.domain}\n\n`;
      reportContent += `- **상태 코드**: ${result.status} ${result.statusText}\n`;
      reportContent += `- **테스트 URL**: ${result.testUrl}\n`;
      reportContent += `- **참조 페이지**: ${links.get(result.domain).size}곳\n\n`;
    }
  }

  reportContent += `## 모든 도메인 목록\n\n`;
  for (const result of results) {
    const badge = result.ok ? '✅' : '❌';
    reportContent += `- ${badge} ${result.domain} (${result.status || 'N/A'})\n`;
  }

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(reportPath, reportContent, 'utf8');

  console.log(`📄 보고서: ${path.relative(ROOT_DIR, reportPath)}\n`);

  // stuck.md 갱신
  if (failedDomains.length > 0) {
    updateStuckFile(failedDomains);
    console.log(`⚠️  실패 도메인을 stuck.md 에 기록했습니다.\n`);
  }

  // exit 0 (실패해도 차단 안 함)
  process.exit(0);
}

main().catch(err => {
  console.error('❌ 에러:', err.message);
  process.exit(0);
});
