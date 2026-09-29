import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: 'http://localhost:4179', trace: 'retain-on-failure' },
  webServer: { command: 'node --import ./tests/mock-shopify.mjs scripts/dev.mjs', url: 'http://localhost:4179', reuseExistingServer: false },
  projects: [ { name: 'desktop', use: { ...devices['Desktop Chrome'] } }, { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } } ],
});
