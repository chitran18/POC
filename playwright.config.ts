import { defineConfig } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com';

const testDir = defineBddConfig({
  importTestFrom: './src/config/fixtures.ts',
  paths: ['./src/features/**/*.feature'],
  require: ['./src/steps/**/*.ts', './src/config/hooks.ts'],
  quotes: 'backtick',
  featuresRoot: './src/features',
  disableWarnings: { importTestFrom: true }
});

export default defineConfig({
  testDir,
  timeout: 120_000,
  expect: {
    timeout: 10_000
  },
  reporter: [
    cucumberReporter('json', { outputFile: 'test-report/report.json' }),
    ['html', { open: 'never' }],
    cucumberReporter('html', {
      outputFile: 'test-report/reportHTML.html',
      externalAttachments: true
    })
  ],
  use: {
    baseURL,
    trace: 'on',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 30_000
  },
  projects: [
    {
      name: 'orangeHRM',
      use: { browserName: 'chromium' }
    }
  ],
  workers: 1,
  outputDir: 'test-results'
});
