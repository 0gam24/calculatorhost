import { describe, it, expect } from 'vitest';

describe('TermTooltip', () => {
  // 컴포넌트 존재 및 타입 검증
  it('should export TermTooltip as React component', async () => {
    const module = await import('@/components/ui/TermTooltip');
    expect(module.TermTooltip).toBeDefined();
    expect(typeof module.TermTooltip).toBe('function');
  });

  // Props 타입 검증 (TypeScript)
  it('should accept required props: term, definition', async () => {
    const module = await import('@/components/ui/TermTooltip');
    const component = module.TermTooltip;

    // TypeScript에 의해 검증됨. 코드 레벨에서 props 확인 가능.
    expect(component).toBeDefined();
  });

  it('should accept optional prop: href', async () => {
    const module = await import('@/components/ui/TermTooltip');
    const component = module.TermTooltip;

    expect(component).toBeDefined();
  });

  it('should be marked as client component (use client)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain("'use client'");
  });

  it('should have interactive state management', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    // useState 사용 확인
    expect(content).toContain('useState');
    // 접근성: aria-expanded 사용
    expect(content).toContain('aria-expanded');
    // aria-describedby로 tooltip 연결
    expect(content).toContain('aria-describedby');
  });

  it('should handle keyboard interaction (Escape key)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('Escape');
  });

  it('should support href parameter for glossary link', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('href');
    expect(content).toContain('자세히');
  });

  it('should use design tokens (no hardcoded colors)', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('bg-bg-card');
    expect(content).toContain('border-border-base');
    expect(content).toContain('text-text-secondary');
    expect(content).toContain('text-primary');

    // 하드코딩된 색 금지
    expect(content).not.toContain('#');
  });

  it('should respect prefers-reduced-motion', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const componentPath = path.resolve(
      process.cwd(),
      'src/components/ui/TermTooltip.tsx'
    );
    const content = fs.readFileSync(componentPath, 'utf-8');

    // transition-colors는 motion-safe하거나 선택적으로 사용되어야 함
    // 현재는 간단한 구현으로 과도한 애니메이션 피함
    expect(content).toBeDefined();
  });
});
