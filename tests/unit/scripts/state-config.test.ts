// state-config.mjs unit tests.
// Verifies marker-based section update preserves operator-managed
// content while replacing auto-managed sections.
import { describe, expect, it } from 'vitest';
import {
  AUTO_MARKER_START,
  AUTO_MARKER_END,
  buildAutoSection,
  replaceAutoSection,
} from '../../../scripts/state-config.mjs';

describe('AUTO marker constants', () => {
  it('exports START and END marker patterns', () => {
    expect(AUTO_MARKER_START).toContain('AUTO');
    expect(AUTO_MARKER_END).toContain('/AUTO');
  });
});

describe('buildAutoSection()', () => {
  it('wraps name and content with markers', () => {
    const out = buildAutoSection('infra', 'Site: live\n');
    expect(out).toContain('AUTO:infra');
    expect(out).toContain('/AUTO:infra');
    expect(out).toContain('Site: live');
  });
});

describe('replaceAutoSection()', () => {
  it('replaces the auto section while preserving operator content', () => {
    const original = [
      '# STATE',
      '<!-- AUTO:infra -->',
      'old: value',
      '<!-- /AUTO:infra -->',
      '## Operator notes (manual)',
      '- keep me alive',
      '',
    ].join('\n');
    const next = replaceAutoSection(original, 'infra', 'new: value\n');
    expect(next).toContain('new: value');
    expect(next).not.toContain('old: value');
    expect(next).toContain('keep me alive');
  });

  it('appends a new section when marker is missing', () => {
    const original = '# STATE\n\nmanual notes\n';
    const next = replaceAutoSection(original, 'infra', 'fresh: ok\n');
    expect(next).toContain('fresh: ok');
    expect(next).toContain('manual notes');
    expect(next).toContain('AUTO:infra');
  });

  it('updates only the named section, leaves other auto sections intact', () => {
    const original = [
      '<!-- AUTO:infra -->',
      'infra-old',
      '<!-- /AUTO:infra -->',
      '<!-- AUTO:env -->',
      'env-keep',
      '<!-- /AUTO:env -->',
    ].join('\n');
    const next = replaceAutoSection(original, 'infra', 'infra-new\n');
    expect(next).toContain('infra-new');
    expect(next).not.toContain('infra-old');
    expect(next).toContain('env-keep');
  });
});
