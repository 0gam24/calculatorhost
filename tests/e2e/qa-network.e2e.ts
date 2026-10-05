import { createServer } from 'node:http';
import { test, expect, createQaRequest } from '../support/network-fixture';

async function closeProbe(server: ReturnType<typeof createServer>) {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

const browserRedirectTest = test.extend<{}, {
  redirectProbe: { origin: string; received: () => number };
}>({
  redirectProbe: [async ({}, use) => {
    let received = 0;
    const sink = createServer((_request, response) => { received++; response.end('unexpected'); });
    await new Promise<void>((resolve) => sink.listen(0, '127.0.0.1', resolve));
    const sinkAddress = sink.address();
    if (!sinkAddress || typeof sinkAddress === 'string') throw new Error('Missing sink');
    const redirect = createServer((_request, response) => {
      response.writeHead(302, { location: `http://127.0.0.1:${sinkAddress.port}/redirect-destination` });
      response.end();
    });
    await new Promise<void>((resolve) => redirect.listen(0, '127.0.0.1', resolve));
    const redirectAddress = redirect.address();
    if (!redirectAddress || typeof redirectAddress === 'string') throw new Error('Missing redirect');
    try { await use({ origin: `http://127.0.0.1:${redirectAddress.port}`, received: () => received }); }
    finally {
      await closeProbe(redirect);
      await closeProbe(sink);
    }
  }, { scope: 'worker' }],
  baseURL: async ({ redirectProbe }, use) => { await use(redirectProbe.origin); },
});

browserRedirectTest('browser redirects cannot bypass isolation and reach a different origin', async ({ page, redirectProbe }) => {
  const response = await page.goto('/redirect');
  expect(response?.status()).toBe(502);
  await expect(page.locator('body')).toHaveText('Redirect blocked during QA');
  expect(redirectProbe.received()).toBe(0);
});

test('common fixture is active before first navigation and prevents transport to another origin', async ({ page, qaNetwork }) => {
  let received = 0;
  const sink = createServer((_request, response) => { received++; response.end('unexpected request'); });
  sink.on('upgrade', (_request, socket) => { received++; socket.destroy(); });
  await new Promise<void>((resolve) => sink.listen(0, '127.0.0.1', resolve));
  const address = sink.address();
  if (!address || typeof address === 'string') throw new Error('Missing probe server');
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    await expect(page.goto(origin + '/first-document')).rejects.toThrow();
    const popup = await page.context().newPage();
    await expect(popup.goto(origin + '/popup-probe')).rejects.toThrow();
    expect(received).toBe(0);
    expect(qaNetwork.aborted.some((x) => x.path === '/first-document')).toBe(true);
  } finally { await closeProbe(sink); }
});

test('fetch, image, iframe, beacon and websocket are blocked before a probe server receives them', async ({ page, qaNetwork }) => {
  let received = 0;
  const sink = createServer((_request, response) => { received++; response.end('unexpected request'); });
  sink.on('upgrade', (_request, socket) => { received++; socket.destroy(); });
  await new Promise<void>((resolve) => sink.listen(0, '127.0.0.1', resolve));
  const address = sink.address();
  if (!address || typeof address === 'string') throw new Error('Missing probe server');
  try {
    await page.goto('/calculator/loan/', { waitUntil: 'domcontentloaded' });
    const origin = `http://127.0.0.1:${address.port}`;
    await page.evaluate((origin) => {
      fetch(origin + '/fetch', { method: 'POST', body: 'synthetic-probe' }).catch(() => {});
      const image = new Image(); image.src = origin + '/pixel'; document.body.append(image);
      const frame = document.createElement('iframe'); frame.src = origin + '/frame'; document.body.append(frame);
      navigator.sendBeacon(origin + '/beacon', 'synthetic-probe');
      const socket = new WebSocket(origin.replace('http:', 'ws:') + '/socket'); socket.onerror = () => {};
    }, origin);
    await expect.poll(() => qaNetwork.aborted.filter((x) => ['/fetch', '/pixel', '/frame', '/beacon'].includes(x.path)).length).toBe(4);
    await page.waitForTimeout(200);
    expect(received).toBe(0);
    expect((await page.context().serviceWorkers()).length).toBe(0);
  } finally { await closeProbe(sink); }
});

test('API proxy requests are mocked instead of invoking the local server', async ({ page }) => {
  await page.goto('/calculator/loan/', { waitUntil: 'domcontentloaded' });
  const result = await page.evaluate(async () => {
    const response = await fetch('/api/address?query=synthetic-probe');
    return { status: response.status, body: await response.json() };
  });
  expect(result).toEqual({ status: 503, body: { error: 'External data mocked during QA' } });
});

test('APIRequestContext refuses production, unknown hosts and data proxies before transport', async ({ qaRequest }) => {
  for (const url of ['https://calculatorhost.com/', 'https://unknown.example.invalid/collect', '/api/address']) {
    await expect(async () => qaRequest.get(url)).rejects.toThrow(/only permits local static GET/);
  }
  const response = await qaRequest.get('/robots.txt');
  expect(response.status()).toBe(200);
});

test('APIRequestContext does not follow an external redirect', async ({ context }) => {
  let received = 0;
  const redirect = createServer((_request, response) => {
    received++;
    response.writeHead(302, { location: 'https://unknown.example.invalid/redirect-probe' });
    response.end();
  });
  await new Promise<void>((resolve) => redirect.listen(0, '127.0.0.1', resolve));
  const address = redirect.address();
  if (!address || typeof address === 'string') throw new Error('Missing redirect probe');
  try {
    const guardedRequest = createQaRequest(context.request, `http://127.0.0.1:${address.port}`);
    const response = await guardedRequest.get('/redirect');
    expect(response.status()).toBe(302);
    expect(response.headers().location).toBe('https://unknown.example.invalid/redirect-probe');
    expect(received).toBe(1);
  } finally { await closeProbe(redirect); }
});
