import { Page, test as base } from '@playwright/test';
import { OrangeHrmApiClient } from '@api/orangehrm-api-client';
import { env } from '@config/env';
import { LoginPage } from '@pages/login-page';

type Fixtures = {
  apiClient: OrangeHrmApiClient;
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use) => {
    await use(new OrangeHrmApiClient(request));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(env.adminUsername, env.adminPassword);
    await use(page);
  }
});

export { expect } from '@playwright/test';
