import { test as base, type APIRequestContext } from '@playwright/test';
import { localQaOrigin, localQaRequestUrl, qaRequestAction } from './network-policy';

export { expect, devices } from '@playwright/test';
export type { Page, Locator } from '@playwright/test';

interface QaNetwork { aborted: Array<{ host: string; path: string; method: string }>; closing: boolean }
interface QaRequest { get: APIRequestContext['get'] }

export function createQaRequest(client: APIRequestContext, baseURL: string): QaRequest {
  localQaOrigin(baseURL);
  return { get: (url, options) => client.get(
    localQaRequestUrl(url, baseURL), { ...options, maxRedirects: 0 },
  ) };
}

export const test = base.extend<{ qaNetwork: QaNetwork; qaRequest: QaRequest }>({
  serviceWorkers: 'block',
  page: async ({ context, qaNetwork }, use) => {
    // Depend on the automatic guard before page creation. Keep the guard until
    // every page/popup closes, then drain handlers without a transmission gap.
    void qaNetwork;
    const page = await context.newPage();
    await use(page);
    qaNetwork.closing = true;
    await Promise.all(context.pages().map((openPage) => openPage.close()));
    await context.unrouteAll({ behavior: 'wait' });
  },
  qaNetwork: [async ({ context, baseURL }, use, testInfo) => {
    const origin = localQaOrigin(baseURL);
    const state: QaNetwork = { aborted: [], closing: false };
    // Automatic fixture completes before page creation/navigation, including popups/frames.
    await context.route('**/*', async (route) => {
      const request = route.request();
      const action = qaRequestAction(request.url(), request.method(), origin);
      if (action === 'local') {
        // A browser redirect can bypass routing for subsequent destinations.
        // Fetch only the initial loopback response and never forward a redirect.
        try {
          const response = await route.fetch({ maxRedirects: 0 });
          if (response.status() >= 300 && response.status() < 400) await route.fulfill({
            status: 502, contentType: 'text/plain', body: 'Redirect blocked during QA',
          });
          else await route.fulfill({ response });
        } catch (error) {
          // Only expected disposal errors after the test has ended are ignored.
          // Active-test transport failures still fail the suite.
          if (!state.closing || !(error instanceof Error) ||
              !/Route is already handled|Target page, context or browser has been closed|Fetch response has been disposed/.test(error.message)) throw error;
        }
        return;
      }
      if (action === 'mock-api') return route.fulfill({
        status: 503, contentType: 'application/json', body: '{"error":"External data mocked during QA"}',
      });
      const url = new URL(request.url());
      const probePaths = ['/first-document', '/fetch', '/pixel', '/frame', '/beacon'];
      state.aborted.push({ host: url.hostname,
        path: probePaths.includes(url.pathname) ? url.pathname : '[redacted]', method: request.method() });
      return route.abort('blockedbyclient');
    });
    // No external sockets (or development HMR sockets) are needed by functional tests.
    await context.routeWebSocket('**/*', (socket) => socket.close());
    await use(state);
    await testInfo.attach('qa-network-isolation', {
      contentType: 'application/json', body: Buffer.from(JSON.stringify(state)),
    });
  }, { auto: true }],
  qaRequest: async ({ context, baseURL }, use) => {
    localQaOrigin(baseURL);
    await use(createQaRequest(context.request, baseURL!));
  },
});
