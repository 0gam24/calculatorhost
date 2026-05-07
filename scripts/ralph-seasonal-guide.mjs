#!/usr/bin/env node

/**
 * Ralph (Phase P) — 시즈널 가이드 자동 발행 시스템
 *
 * 목적: 매월 한국 시간대 기준 현재 달의 시즈널 토픽 가이드 발행 여부 확인
 *      - 미발행: stuck.md에 신호 등재 → content-writer 다음 회차에서 작성
 *      - 이미 발행: 1년 이상 지났으면 갱신 권고
 *
 * 실행: npm run ralph:seasonal (또는 CI/CD 월 1일 자동 실행)
 * 의존성: Node.js 내장 fs, path, Date (외부 라이브러리 0)
 *
 * 참고: docs/seasonal-guide-calendar.md (진실 공급원)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

/**
 * 월별 시즈널 가이드 정의 (docs/seasonal-guide-calendar.md 동기화)
 * format: { month: N, slug: "...", title: "...", published: boolean, lastModified: "YYYY-MM-DD" }
 */
const SEASONAL_GUIDES = {
  1: { slug: 'january-vehicle-tax-prepayment', title: '자동차세 연납 6.4% 할인 가이드', published: true },
  2: { slug: 'february-tax-refund-tracking', title: '연말정산 환급 추적 완벽 가이드', published: true },
  3: { slug: 'march-corporate-tax', title: '법인세 신고 가이드', published: true },
  4: [
    { slug: 'april-vat-preliminary-q1', title: '부가세 1차 예정신고 가이드', published: true },
    { slug: 'april-comprehensive-property-tax-exclusion', title: '종부세 합산배제 특례', published: true },
  ],
  5: { slug: 'may-comprehensive-income-tax', title: '5월 종합소득세 신고 완벽 가이드', published: true },
  6: { slug: 'june-property-tax', title: '재산세 1차 납부 완벽 가이드', published: true },
  7: { slug: 'july-vat-and-tax-withholding', title: '7월 부가세 확정신고·연말정산 사전점검', published: false },
  8: { slug: 'august-capital-gains-tax-review', title: '양도세 절세 5가지 체크리스트', published: false },
  9: { slug: 'september-property-tax-second', title: '재산세 2차 납부 및 세대 합산 확인', published: false },
  10: { slug: 'october-vat-q3-preliminary', title: '부가세 3차 예정신고 가이드', published: false },
  11: { slug: 'november-year-end-tax-prep', title: '2026년 연말정산 완벽 준비', published: false },
  12: { slug: 'december-capital-gains-tax-deadline', title: '12월 말 양도세 비과세 조건 최종 확인', published: false },
};

/**
 * 한국 시간대 기준 현재 월 반환 (1-12)
 */
function getCurrentMonthKoreanTime() {
  const koreaTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  return koreaTime.getMonth() + 1;
}

/**
 * 다음 달 계산 (12월이면 1월)
 */
function getNextMonth(currentMonth) {
  return currentMonth === 12 ? 1 : currentMonth + 1;
}

/**
 * 가이드 페이지 파일 경로
 */
function getGuidePath(slug) {
  return path.join(projectRoot, 'src', 'app', 'guide', slug, 'page.tsx');
}

/**
 * 파일 마지막 수정 시간 반환 (YYYY-MM-DD)
 */
function getFileModifiedDate(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const mtime = new Date(stats.mtime);
    return mtime.toISOString().split('T')[0]; // YYYY-MM-DD
  } catch {
    return null;
  }
}

/**
 * 1년 이상 경과 여부 확인
 */
function isOlderThanOneYear(dateString) {
  const lastMod = new Date(dateString + 'T00:00:00Z');
  const now = new Date();
  const diffDays = Math.floor((now - lastMod) / (1000 * 60 * 60 * 24));
  return diffDays >= 365;
}

/**
 * stuck.md 파일 읽기/파싱
 */
function readStuckFile() {
  const stuckPath = path.join(projectRoot, '.claude', 'stuck.md');
  if (!fs.existsSync(stuckPath)) {
    return { content: '', signals: [] };
  }
  const content = fs.readFileSync(stuckPath, 'utf-8');
  // 간단한 파싱: "## RALPH" 섹션 찾기
  return { content, signals: content.split('\n').filter(line => line.includes('[RALPH]')) };
}

/**
 * stuck.md에 신호 추가 (중복 제거)
 */
function appendToStuckFile(signal) {
  const stuckPath = path.join(projectRoot, '.claude', 'stuck.md');
  const { content, signals } = readStuckFile();

  // 이미 같은 신호가 있으면 스킵
  if (signals.some(s => s.includes(signal.slug))) {
    console.log(`  ⏭️  Skip (이미 stuck.md에 등재됨): ${signal.slug}`);
    return;
  }

  // stuck.md가 없으면 생성
  if (!fs.existsSync(stuckPath)) {
    fs.mkdirSync(path.dirname(stuckPath), { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const signalLine = `- [RALPH] ${timestamp} — ${signal.slug} — ${signal.title}\n`;

  let newContent = content;
  if (!content.includes('## RALPH')) {
    newContent += '\n## RALPH (Phase P 자동화)\n';
  }

  fs.appendFileSync(stuckPath, signalLine, 'utf-8');
  console.log(`  ✅ stuck.md에 신호 추가: ${signal.slug}`);
}

/**
 * 메인 로직
 */
function main() {
  console.log('\n═══════════════════════════════════════');
  console.log('Ralph Phase P — 시즈널 가이드 자동화');
  console.log('═══════════════════════════════════════\n');

  const currentMonth = getCurrentMonthKoreanTime();
  const nextMonth = getNextMonth(currentMonth);

  console.log(`📅 한국 시간대 현재 월: ${currentMonth}월`);
  console.log(`📅 다음 달(발행 예정): ${nextMonth}월\n`);

  // 현재 달과 다음 달 모두 확인
  const targetMonths = [currentMonth, nextMonth];
  let publishedCount = 0;
  let reviewCount = 0;
  let missingCount = 0;

  for (const month of targetMonths) {
    const guideEntry = SEASONAL_GUIDES[month];
    if (!guideEntry) {
      console.log(`⚠️  ${month}월: 정의되지 않음\n`);
      continue;
    }

    // 배열 처리 (4월처럼 2개 가이드)
    const guides = Array.isArray(guideEntry) ? guideEntry : [guideEntry];

    console.log(`\n[${month}월]`);
    for (const guide of guides) {
      const filePath = getGuidePath(guide.slug);
      const exists = fs.existsSync(filePath);

      if (exists) {
        publishedCount++;
        const lastMod = getFileModifiedDate(filePath);
        const isOld = lastMod && isOlderThanOneYear(lastMod);

        if (isOld) {
          reviewCount++;
          console.log(`  🔄 갱신 권고: ${guide.slug}`);
          console.log(`     최종 수정: ${lastMod} (1년 이상 경과)`);
          // 선택: 갱신 신호를 stuck.md에 추가할 수도 있음
          // appendToStuckFile({ slug: guide.slug, title: `[갱신 권고] ${guide.title}` });
        } else {
          console.log(`  ✅ 발행됨: ${guide.slug} (최종 수정: ${lastMod})`);
        }
      } else {
        missingCount++;
        console.log(`  ❌ 미발행: ${guide.slug}`);
        console.log(`     → stuck.md에 신호 등재 중...`);
        appendToStuckFile({ slug: guide.slug, title: guide.title });
      }
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log('📊 발행 현황');
  console.log('═══════════════════════════════════════');
  console.log(`✅ 발행됨: ${publishedCount}개`);
  console.log(`🔄 갱신 권고: ${reviewCount}개`);
  console.log(`❌ 미발행 (신호 등재): ${missingCount}개`);
  console.log('\n💡 다음 단계:');
  if (missingCount > 0) {
    console.log(`   → content-writer가 다음 회차에서 stuck.md의 미발행 가이드 작성`);
  } else {
    console.log(`   → 모든 가이드가 발행된 상태`);
  }
  console.log('\n📝 자세한 진행상황은 .claude/progress.md 참고\n');
}

// 실행
main();
