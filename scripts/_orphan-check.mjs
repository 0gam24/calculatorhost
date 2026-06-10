import { execSync } from 'node:child_process';
import { globSync } from 'node:fs';

const pages = globSync('src/app/**/page.tsx').map(p => p.split('\\').join('/'));

const slugs = [];
for (const p of pages) {
  const m = p.match(/src\/app\/(guide|calculator|category)\/([^/]+)\/page\.tsx/);
  if (m) slugs.push({ type: m[1], slug: m[2], path: p });
}

const results = [];
for (const { type, slug, path } of slugs) {
  // 둘 다 검색: with and without trailing slash
  const patterns = [`/${type}/${slug}/`, `/${type}/${slug}"`, `/${type}/${slug}'`, `/${type}/${slug}\``];
  const allFiles = new Set();
  for (const pat of patterns) {
    let out = '';
    try {
      out = execSync(
        `grep -rl ${JSON.stringify(pat)} src/app src/components src/lib content --include="page.tsx" --include="*.tsx" --include="*.ts" --include="*.mdx"`,
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      );
    } catch (e) {
      out = e.stdout || '';
    }
    out.trim().split('\n').filter(Boolean).forEach(f => allFiles.add(f.split('\\').join('/')));
  }
  // exclude self + guide index
  const filtered = [...allFiles].filter(f => f !== path && f !== 'src/app/guide/page.tsx');
  results.push({ type, slug, inboundCount: filtered.length, refs: filtered });
}

const printGroup = (label, arr) => {
  console.log(`\n=== ${label} (n=${arr.length}) ===`);
  for (const o of arr) {
    const refsShort = o.refs.map(r => r.replace('src/app/', '').replace('src/components/', 'C:').replace('src/lib/', 'L:').replace('/page.tsx', '').replace('.tsx','').replace('.ts','')).join(', ');
    console.log(`  [${o.inboundCount}] ${o.type}/${o.slug}${o.inboundCount > 0 ? '  <- ' + refsShort : ''}`);
  }
};

console.log(`총 ${results.length} 페이지 분석 (guide 인덱스 제외)`);
const orphan0 = results.filter(r => r.inboundCount === 0).sort((a,b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));
const orphan1 = results.filter(r => r.inboundCount === 1).sort((a,b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));
const orphan2 = results.filter(r => r.inboundCount === 2).sort((a,b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));

printGroup('인바운드 0개 (완전 고아)', orphan0);
printGroup('인바운드 1개 (취약)', orphan1);
printGroup('인바운드 2개 (보통)', orphan2);

const dist = {};
for (const r of results) dist[r.inboundCount] = (dist[r.inboundCount] || 0) + 1;
console.log('\n=== 인바운드 분포 ===');
for (const k of Object.keys(dist).sort((a,b) => Number(a) - Number(b))) {
  console.log(`  ${k}개: ${dist[k]} 페이지`);
}
