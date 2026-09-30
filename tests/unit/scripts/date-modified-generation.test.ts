import { afterEach, describe, expect, it } from 'vitest';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';

const dirs: string[] = [];
afterEach(() =>
  dirs.splice(0).forEach((dir) => {
    if (
      dirname(resolve(dir)) !== resolve(tmpdir()) ||
      !basename(dir).startsWith('calculatorhost-')
    ) {
      throw new Error('Unexpected temporary fixture path');
    }
    rmSync(dir, { recursive: true, force: true });
  }),
);

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'calculatorhost-lastmod-'));
  dirs.push(dir);
  for (const folder of ['scripts', 'src/app/calculator/salary', 'src/data']) {
    mkdirSync(join(dir, folder), { recursive: true });
  }
  for (const file of ['generate-date-modified-manifest.mjs', 'date-modified-core.mjs']) {
    copyFileSync(resolve('scripts', file), join(dir, 'scripts', file));
  }
  writeFileSync(
    join(dir, 'src/app/calculator/salary/page.tsx'),
    'export default function Page() { return null; }',
  );
  writeFileSync(
    join(dir, 'src/data/date-modified-manifest.json'),
    JSON.stringify({
      '/calculator/salary/': '2026-05-01T00:00:00Z',
    }),
  );
  return dir;
}

function generate(dir: string) {
  execFileSync(process.execPath, ['scripts/generate-date-modified-manifest.mjs'], {
    cwd: dir,
    stdio: 'pipe',
  });
  return JSON.parse(readFileSync(join(dir, 'src/data/date-modified-manifest.json'), 'utf8'));
}

describe('Date manifest generation in checkout environments', () => {
  it('preserves existing reliable dates when no git history is available', () => {
    expect(generate(fixture())['/calculator/salary/']).toBe('2026-05-01T00:00:00Z');
  });

  it('does not replace every page date with a shallow checkout boundary', () => {
    const origin = fixture();
    const git = (...args: string[]) => execFileSync('git', args, { cwd: origin, stdio: 'pipe' });
    git('init');
    git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'add', '.');
    git(
      '-c',
      'user.name=Fixture',
      '-c',
      'user.email=fixture@example.invalid',
      'commit',
      '-m',
      'fixture',
    );
    const clone = mkdtempSync(join(tmpdir(), 'calculatorhost-shallow-'));
    dirs.push(clone);
    execFileSync('git', ['clone', '--depth=1', '--no-local', origin, clone], { stdio: 'pipe' });
    expect(
      execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
        cwd: clone,
        encoding: 'utf8',
      }).trim(),
    ).toBe('true');
    expect(generate(clone)['/calculator/salary/']).toBe('2026-05-01T00:00:00Z');
  }, 30_000);
});
