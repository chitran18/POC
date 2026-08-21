import { createBdd } from 'playwright-bdd';
import { env } from '@config/env';
import { test, expect } from '@config/fixtures';

const { Given, Then } = createBdd(test);

Given('the admin is logged in', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(env.adminUsername, env.adminPassword);
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});

Then('the admin can access employee management actions', async ({ employeePage }) => {
  await employeePage.verifyEmployeeManagementAccess();
});
