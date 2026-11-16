// 구조화 데이터는 화면에 보이는 내용과 같아야 한다 (네이버 구조화 데이터 08-01·08-05·08-06).
// 페이지 소스(page.tsx)에서 직접 확인해 새 글이 같은 실수를 반복하지 않게 막는다.
// - 화면 빵부스러기(<Breadcrumb items> / <GuideHeader breadcrumbItems>)와 buildBreadcrumbJsonLd 의 이름·링크가 같다
// - buildHowToJsonLd 를 쓰는 페이지는 <HowToSteps> 로 같은 단계를 화면에 보여준다
// - buildDefinedTermSetJsonLd 를 쓰는 페이지는 <GlossaryTerms> 로 같은 정의를 화면에 보여준다(용어사전·허브는 본문에 이미 있음)
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../../..');
const SITE = 'https://calculatorhost.com';

function pages(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) pages(p, acc);
    else if (e.name === 'page.tsx') acc.push(p);
  }
  return acc;
}

interface Crumb {
  name?: string;
  link?: string;
}

function readCrumbs(node: ts.Expression | undefined): Crumb[] | null {
  if (!node || !ts.isArrayLiteralExpression(node)) return null;
  return node.elements.map((el) => {
    const crumb: Crumb = {};
    if (!ts.isObjectLiteralExpression(el)) return crumb;
    for (const p of el.properties) {
      if (!ts.isPropertyAssignment(p) || !ts.isIdentifier(p.name)) continue;
      const v = ts.isStringLiteralLike(p.initializer) ? p.initializer.text : undefined;
      if (p.name.text === 'name') crumb.name = v;
      if (p.name.text === 'href') crumb.link = v && (v.startsWith('http') ? v : SITE + v);
      if (p.name.text === 'url') crumb.link = v;
    }
    return crumb;
  });
}

const files = pages(path.join(ROOT, 'src/app'));
const parsed = files.map((file) => {
  const text = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let visible: Crumb[] | null = null;
  let ld: Crumb[] | null = null;
  const visit = (node: ts.Node) => {
    if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) {
      const owner = node.parent.parent as ts.JsxOpeningLikeElement;
      const tag = owner.tagName.getText(sf);
      const attr = node.name.getText(sf);
      if ((tag === 'Breadcrumb' && attr === 'items') || (tag === 'GuideHeader' && attr === 'breadcrumbItems'))
        visible ??= readCrumbs(node.initializer.expression);
    }
    if (ts.isCallExpression(node) && node.expression.getText(sf) === 'buildBreadcrumbJsonLd')
      ld ??= readCrumbs(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { rel: path.relative(ROOT, file).replace(/\\/g, '/'), text, visible, ld };
});

describe('빵부스러기 화면 = JSON-LD', () => {
  const withBoth = parsed.filter((p) => p.visible && p.ld);
  it('대부분의 페이지에서 두 배열을 찾는다', () => {
    expect(withBoth.length).toBeGreaterThan(400);
  });
  it.each(withBoth.map((p) => [p.rel, p] as const))('%s', (_rel, p) => {
    const visible = p.visible as unknown as Crumb[];
    const ld = p.ld as unknown as Crumb[];
    expect(ld.length).toBe(visible.length);
    visible.forEach((v, i) => {
      if (i > 0 && v.name !== undefined && ld[i]?.name !== undefined) expect(ld[i]?.name).toBe(v.name);
      if (v.link) expect(ld[i]?.link).toBe(v.link);
    });
  });
});

describe('마크업한 HowTo·용어 정의는 화면에도 있다', () => {
  it.each(parsed.filter((p) => p.text.includes('buildHowToJsonLd(')).map((p) => [p.rel, p.text] as const))(
    '%s 는 <HowToSteps> 를 렌더한다',
    (_rel, text) => {
      expect(text).toContain('<HowToSteps');
    },
  );

  // 용어사전·카테고리 허브는 정의문을 본문 목록으로 이미 보여준다
  const termsVisibleInBody = /src\/app\/(glossary|category\/[a-z-]+)\/page\.tsx$/;
  it.each(
    parsed
      .filter((p) => p.text.includes('buildDefinedTermSetJsonLd(') && !termsVisibleInBody.test(p.rel))
      .map((p) => [p.rel, p.text] as const),
  )('%s 는 <GlossaryTerms> 를 렌더한다', (_rel, text) => {
    expect(text).toContain('<GlossaryTerms');
  });
});
