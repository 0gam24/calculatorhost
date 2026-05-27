#!/usr/bin/env node
/**
 * 가이드·계산기 메타데이터 정합성 사전 검증 (CI 게이트).
 *
 * 검증 항목 (harness §4-1 자동화 가능):
 * - title 60자 이내
 * - description 80~155자
 * - keywords 5~10개
 * - canonical trailing slash
 * - JSON-LD helper 호출 확인 (가이드: Article+Breadcrumb+WebPage+FAQPage+Speakable / 계산기: 위 6종)
 *
 * 위반 시 exit 1.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function listFilesRecursive(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) listFilesRecursive(abs, out);
    else if (entry.isFile() && entry.name === 'page.tsx') out.push(abs);
  }
  return out;
}

function extractMetadata(content) {
  // export const metadata: Metadata = { ... };
  const m = content.match(/export const metadata(?::\s*Metadata)?\s*=\s*\{([\s\S]*?)\n\};/);
  return m ? m[1] : null;
}

function extractStringField(metaBody, field) {
  // title: '...' 또는 title: "..." 또는 title: `...`
  const re = new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`);
  const m = metaBody.match(re);
  return m ? m[1] : null;
}

function extractTemplateField(metaBody, field) {
  // description:\n    '...' 같은 멀티라인. 첫 단일 따옴표 안 추출.
  const re = new RegExp(`${field}:\\s*\\n?\\s*['"\`]([^'"\`]+)['"\`]`);
  const m = metaBody.match(re);
  if (!m) return null;
  // template literal ${VAR} 자리는 실제 렌더 시 짧은 값으로 치환되므로 길이 카운트에서 제외 (대표 4자로 가정)
  return m[1].replace(/\$\{[^}]+\}/g, '0000');
}

function extractKeywordsCount(metaBody) {
  const m = metaBody.match(/keywords:\s*\[([\s\S]*?)\]/);
  if (!m) return 0;
  return (m[1].match(/['"`][^'"`]+['"`]/g) || []).length;
}

export function validatePage(filePath, content) {
  const violations = [];
  const rel = path.relative(ROOT, filePath);
  const isGuide = rel.includes(path.sep + 'guide' + path.sep);
  const isCalculator = rel.includes(path.sep + 'calculator' + path.sep);

  // 정책 페이지(privacy/terms/about/contact 등)는 메타 정합성 검사 면제
  if (!isGuide && !isCalculator) return [];

  // 가이드 인덱스 페이지(/guide/page.tsx)는 카탈로그라 별도 룰 (개별 가이드 검사만)
  if (rel.endsWith(path.sep + 'guide' + path.sep + 'page.tsx')) return [];

  const metaBody = extractMetadata(content);
  if (!metaBody) {
    violations.push({ file: rel, field: 'metadata', reason: 'metadata export 누락' });
    return violations;
  }

  // title 60자 이내
  const title = extractStringField(metaBody, 'title');
  if (!title) {
    violations.push({ file: rel, field: 'title', reason: '누락' });
  } else if (title.length > 65) {
    violations.push({ file: rel, field: 'title', reason: `${title.length}자 (65자 초과)` });
  }

  // description 80~155자
  const description = extractTemplateField(metaBody, 'description') || extractStringField(metaBody, 'description');
  if (!description) {
    violations.push({ file: rel, field: 'description', reason: '누락' });
  } else if (description.length < 80) {
    violations.push({ file: rel, field: 'description', reason: `${description.length}자 (80자 미만)` });
  } else if (description.length > 160) {
    violations.push({ file: rel, field: 'description', reason: `${description.length}자 (160자 초과)` });
  }

  // canonical trailing slash
  const canonicalMatch = metaBody.match(/canonical:\s*([A-Z_]+|['"`][^'"`]+['"`])/);
  // URL 상수 통한 간접 참조도 허용 — 파일에서 URL 상수 추출
  const urlConstMatch = content.match(/const URL\s*=\s*['"`]([^'"`]+)['"`]/);
  if (urlConstMatch && !urlConstMatch[1].endsWith('/')) {
    violations.push({ file: rel, field: 'canonical', reason: `trailing slash 누락: ${urlConstMatch[1]}` });
  }

  // keywords 5~10개 (가이드만 — 계산기는 글로벌 처리 가능)
  if (isGuide) {
    const kwCount = extractKeywordsCount(metaBody);
    if (kwCount === 0) {
      violations.push({ file: rel, field: 'keywords', reason: '누락 (5~10개 의무)' });
    } else if (kwCount < 5) {
      violations.push({ file: rel, field: 'keywords', reason: `${kwCount}개 (5개 미만)` });
    } else if (kwCount > 12) {
      violations.push({ file: rel, field: 'keywords', reason: `${kwCount}개 (12개 초과 — 키워드 스터핑 위험)` });
    }
  }

  // JSON-LD helper 호출 — 가이드 필수 3종 (Article + Breadcrumb + WebPage)
  // FAQPage·Speakable은 FAQ 항목 보유 가이드에만 요구 (FAQ 없는 시즌 캘린더 등 면제)
  if (isGuide) {
    const requiredHelpers = [
      'buildArticleJsonLd',
      'buildBreadcrumbJsonLd',
      'buildWebPageJsonLd',
    ];
    for (const helper of requiredHelpers) {
      if (!content.includes(helper)) {
        violations.push({ file: rel, field: 'json-ld', reason: `${helper}() 누락` });
      }
    }
    // FAQ 보유 시 FAQPage + Speakable 의무
    const hasFaq = /FAQ_ITEMS\s*=\s*\[/.test(content) || /faqItems\s*=\s*\[/.test(content);
    if (hasFaq) {
      if (!content.includes('buildFaqPageJsonLd')) {
        violations.push({ file: rel, field: 'json-ld', reason: 'buildFaqPageJsonLd() 누락 (FAQ 보유 페이지)' });
      }
      if (!content.includes('buildSpeakableJsonLd')) {
        violations.push({ file: rel, field: 'json-ld', reason: 'buildSpeakableJsonLd() 누락 (FAQ 보유 페이지)' });
      }
    }
  }
  // 계산기 (SoftwareApplication + WebPage + Breadcrumb + FAQPage + HowTo + Speakable)
  if (isCalculator) {
    const requiredHelpers = [
      'buildSoftwareApplicationJsonLd',
      'buildBreadcrumbJsonLd',
      'buildWebPageJsonLd',
      'buildFaqPageJsonLd',
      'buildHowToJsonLd',
      'buildSpeakableJsonLd',
    ];
    for (const helper of requiredHelpers) {
      if (!content.includes(helper)) {
        violations.push({ file: rel, field: 'json-ld', reason: `${helper}() 누락` });
      }
    }
  }

  return violations;
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;

if (isCli) {
  const targets = process.argv.slice(2);
  const files = targets.length > 0
    ? targets
    : [
        ...listFilesRecursive(path.join(ROOT, 'src', 'app', 'guide')),
        ...listFilesRecursive(path.join(ROOT, 'src', 'app', 'calculator')),
      ];

  const allViolations = [];
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, 'utf8');
    allViolations.push(...validatePage(f, content));
  }

  if (allViolations.length === 0) {
    console.log('✅ 메타데이터 + JSON-LD 정합성 PASS (검사 ' + files.length + '개)');
    process.exit(0);
  }

  console.error('❌ 메타 정합성 위반 ' + allViolations.length + '건:');
  for (const v of allViolations) {
    console.error(`  ${v.file} [${v.field}]: ${v.reason}`);
  }
  process.exit(1);
}
