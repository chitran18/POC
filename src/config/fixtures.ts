import { Page } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { OrangeHrmApiClient } from '@api/orangehrm-api-client';
import { env } from '@config/env';
import { EmployeePage } from '@pages/employee-page';
import { LoginPage } from '@pages/login-page';
import { EmployeeTestData, createEmployeeTestData } from '@utils/test-data';

type ScenarioContext = {
  empNumber?: string;
};

type Fixtures = {
  apiClient: OrangeHrmApiClient;
  authenticatedPage: Page;
  employee: EmployeeTestData;
  employeePage: EmployeePage;
  scenario: ScenarioContext;
};

export const test = base.extend<Fixtures>({
  apiClient: async ({ authenticatedPage }, use) => {
    await use(new OrangeHrmApiClient(authenticatedPage.request));
  },

  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(env.adminUsername, env.adminPassword);
    await use(page);
  },

  employee: async ({}, use) => {
    await use(createEmployeeTestData());
  },

  employeePage: async ({ authenticatedPage }, use) => {
    await use(new EmployeePage(authenticatedPage));
  },

  scenario: async ({}, use) => {
    await use({});
  }
});

export { expect } from '@playwright/test';
