#!/usr/bin/env node
/**
 * 파비콘 생성: public/icon.svg(소스) → public/favicon.ico (16/32/48 멀티해상도) + public/apple-icon.png(180)
 * - 의존성: sharp (기존 devDependency). ICO 컨테이너는 PNG 임베드 방식으로 직접 작성.
 * - 재실행: node scripts/gen-favicon.mjs (또는 npm run favicon:gen)
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = resolve(root, 'public/icon.svg');
const icoPath = resolve(root, 'public/favicon.ico');
const applePath = resolve(root, 'public/apple-icon.png');

const svg = await readFile(svgPath);

// 1) favicon.ico — PNG 임베드 ICO (16/32/48)
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(svg, { density: 384 }).resize(s, s).png().toBuffer()),
);

// ICONDIR(6) + N*ICONDIRENTRY(16) + PNG blobs
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type=1 (icon)
header.writeUInt16LE(sizes.length, 4); // count

const entries = [];
let offset = 6 + sizes.length * 16;
for (let i = 0; i < sizes.length; i++) {
  const e = Buffer.alloc(16);
  const s = sizes[i];
  e.writeUInt8(s >= 256 ? 0 : s, 0); // width
  e.writeUInt8(s >= 256 ? 0 : s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bpp
  e.writeUInt32LE(pngs[i].length, 8); // size
  e.writeUInt32LE(offset, 12); // offset
  offset += pngs[i].length;
  entries.push(e);
}

const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(icoPath, ico);

// 2) apple-icon.png (180x180, iOS 홈화면)
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile(applePath);

console.log(`✅ favicon.ico (${sizes.join('/')}px, ${ico.length}B) + apple-icon.png 생성 완료`);
