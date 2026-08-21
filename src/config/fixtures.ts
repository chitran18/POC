import { test as base } from 'playwright-bdd';
import { OrangeHrmApiClient } from '@api/orangehrm-api-client';
import { EmployeePage } from '@pages/employee-page';
import { LoginPage } from '@pages/login-page';
import { EmployeeTestData, createEmployeeTestData } from '@utils/test-data';

type ScenarioContext = {
  empNumber?: string;
};

type OrangeHrmFixtures = {
  apiClient: OrangeHrmApiClient;
  employee: EmployeeTestData;
  employeePage: EmployeePage;
  loginPage: LoginPage;
  scenario: ScenarioContext;
};

export const test = base.extend<OrangeHrmFixtures>({
  apiClient: async ({ page }, use) => {
    await use(new OrangeHrmApiClient(page.request));
  },

  employee: async ({}, use) => {
    await use(createEmployeeTestData());
  },

  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  scenario: async ({}, use) => {
    await use({});
  }
});

export { expect } from '@playwright/test';
