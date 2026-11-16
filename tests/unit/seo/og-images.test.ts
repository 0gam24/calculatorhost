// 네이버 콘텐츠 마크업(04-02): og:image 는 문서마다 고유해야 검색 썸네일로 쓰인다.
// 가이드·계산기는 폴더마다 opengraph-image.png 를 두고, 페이지 metadata 에 images 를 따로 적지 않는다
// (적으면 Next 가 파일을 무시하고 공통 이미지를 쓴다). 새 글을 쓰면 `npm run gen-og` 뒤 이미지도 커밋한다.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const APP = path.resolve(__dirname, '../../../src/app');

function pageDirs(section: string): string[] {
  return fs
    .readdirSync(path.join(APP, section), { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'category')
    .filter((d) => fs.existsSync(path.join(APP, section, d.name, 'page.tsx')))
    .map((d) => path.join(section, d.name));
}

const guides = pageDirs('guide');
const calculators = pageDirs('calculator');

describe('페이지별 고유 OG 이미지', () => {
  it('가이드·계산기 목록을 찾는다', () => {
    expect(guides.length).toBeGreaterThan(300);
    expect(calculators.length).toBeGreaterThan(30);
  });

  it.each([...guides, ...calculators])('%s 에 opengraph-image.png 와 대체 텍스트가 있다', (dir) => {
    expect(fs.existsSync(path.join(APP, dir, 'opengraph-image.png'))).toBe(true);
    const alt = path.join(APP, dir, 'opengraph-image.alt.txt');
    if (dir.startsWith('guide')) expect(fs.readFileSync(alt, 'utf8').trim().length).toBeGreaterThan(0);
  });

  it.each(guides)('%s metadata 는 공통 이미지를 따로 지정하지 않는다', (dir) => {
    const source = fs.readFileSync(path.join(APP, dir, 'page.tsx'), 'utf8');
    expect(source).not.toMatch(/openGraph:\s*\{[^}]*images:/);
  });
});
