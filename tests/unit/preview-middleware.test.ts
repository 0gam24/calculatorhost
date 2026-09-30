import { expect, it, vi } from 'vitest';
import { onRequest } from '../../functions/_middleware';

const run = onRequest as unknown as (context: {
  request: Request;
  next: () => Promise<Response>;
}) => Promise<Response>;

it('enforces preview headers even when Functions bypass static _headers', async () => {
  const next = vi.fn(async () => new Response('calculator'));
  const response = await run({
    request: new Request('https://review.calculatorhost.pages.dev/calculator/loan/'),
    next,
  });
  expect(response.headers.get('X-Robots-Tag')).toContain('noindex');
  expect(response.headers.get('Content-Security-Policy')).toContain("connect-src 'self'");
  expect(next).toHaveBeenCalledOnce();
});

it('never reaches external API handlers on a review host', async () => {
  const next = vi.fn(async () => new Response('external'));
  const response = await run({
    request: new Request('https://review.calculatorhost.pages.dev/api/public/ecos'),
    next,
  });
  expect(response.status).toBe(503);
  expect(next).not.toHaveBeenCalled();
});

it('retains production API behavior and does not add preview directives', async () => {
  const next = vi.fn(async () => new Response('production'));
  const response = await run({
    request: new Request('https://calculatorhost.com/api/public/ecos'),
    next,
  });
  expect(await response.text()).toBe('production');
  expect(response.headers.get('X-Robots-Tag')).toBeNull();
  expect(response.headers.get('Content-Security-Policy')).toBeNull();
});
