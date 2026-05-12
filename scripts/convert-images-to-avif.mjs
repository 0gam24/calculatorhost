#!/usr/bin/env node
/**
 * public/ 의 PNG 이미지를 AVIF 로 변환 (sharp).
 *
 * AVIF = WebP/PNG 대비 30~50% 작은 용량 + alpha 채널 지원.
 * Cloudflare Pages 정적 호스팅 + Next.js images.unoptimized 환경에서는
 * 빌드 시점에 직접 변환해야 함. <picture><source type="image/avif"> 패턴 사용 가능.
 *
 * 동작:
 *  - public/*.png → public/*.avif (동일 파일명, 확장자만 다름)
 *  - 이미 .avif 가 있고 PNG mtime 보다 최신이면 스킵
 *  - 의존성: sharp (이미 devDependency)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const TARGETS = [
  'og-default.png',
  'icon-192.png',
  'icon-512.png',
  'icon-512-maskable.png',
];

async function convertOne(filename) {
  const pngPath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(pngPath)) {
    console.log(`  ⏭️  스킵: ${filename} 없음`);
    return { converted: false, skipped: true };
  }
  const avifPath = pngPath.replace(/\.png$/, '.avif');

  // 캐시: AVIF 가 있고 PNG mtime 보다 최신이면 스킵
  if (fs.existsSync(avifPath)) {
    const pngStat = fs.statSync(pngPath);
    const avifStat = fs.statSync(avifPath);
    if (avifStat.mtimeMs >= pngStat.mtimeMs) {
      return { converted: false, skipped: true };
    }
  }

  await sharp(pngPath)
    .avif({ quality: 60, effort: 4 })
    .toFile(avifPath);

  const pngSize = fs.statSync(pngPath).size;
  const avifSize = fs.statSync(avifPath).size;
  const reduction = Math.round((1 - avifSize / pngSize) * 100);

  console.log(
    `  ✅ ${filename} → ${path.basename(avifPath)} (${(pngSize / 1024).toFixed(1)}KB → ${(avifSize / 1024).toFixed(1)}KB, -${reduction}%)`,
  );
  return { converted: true, skipped: false };
}

async function main() {
  console.log(`\n🖼️  AVIF 이미지 변환 (sharp)\n`);
  let convertedCount = 0;
  let skippedCount = 0;
  for (const filename of TARGETS) {
    try {
      const r = await convertOne(filename);
      if (r.converted) convertedCount++;
      if (r.skipped) skippedCount++;
    } catch (e) {
      console.error(`  ❌ ${filename}: ${e.message}`);
    }
  }
  console.log(`\n  변환 ${convertedCount}, 스킵 ${skippedCount}\n`);
}

const isCli = process.argv[1]
  ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  : false;
if (isCli) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(0);
  });
}
