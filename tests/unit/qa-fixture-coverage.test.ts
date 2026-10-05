import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('all general browser suites use pre-transmission isolation', () => {
  for (const directory of ['e2e', 'visual']) {
    for (const file of readdirSync(resolve('tests', directory)).filter((name) => /\.(e2e|spec|visual)\.ts$/.test(name))) {
      it(`${directory}/${file} uses the safe fixture and guarded HTTP requests`, () => {
        const source = readFileSync(resolve('tests', directory, file), 'utf8');
        expect(source).toContain("from '../support/network-fixture'");
        expect(source).not.toMatch(/(?:page\.request|\brequest)\.(?:get|post|fetch)\(/);
        expect(source).not.toContain("context.route('**/*'");
      });
    }
  }
});
