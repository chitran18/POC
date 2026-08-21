import { createBdd } from 'playwright-bdd';
import { test, expect } from '@config/fixtures';

const { Given, When, Then } = createBdd(test);

Given('the admin is logged in', async ({ authenticatedPage }) => {
  await expect(authenticatedPage.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});

When('the admin creates a new employee', async ({ employee, employeePage, scenario }) => {
  await employeePage.openPim();
  scenario.empNumber = await employeePage.addEmployee(employee);
});

Then('the employee profile shows the created data', async ({ authenticatedPage, employee }) => {
  await expect(authenticatedPage.getByPlaceholder('Last Name')).toHaveValue(employee.lastName);
});

When('the admin updates the employee last name', async ({ employee, employeePage }) => {
  await employeePage.updateEmployeeLastName(employee);
});

Then('the employee can be found in the employee list', async ({ employee, employeePage }) => {
  await employeePage.searchEmployee(employee);
});

Then('the employee exists through the API', async ({ apiClient, scenario }) => {
  await apiClient.verifyEmployeeExists(requireEmpNumber(scenario));
});

When('the admin deletes the employee', async ({ employee, employeePage }) => {
  await employeePage.deleteEmployee(employee);
});

Then('the employee is deleted through the API', async ({ apiClient, scenario }) => {
  await apiClient.verifyEmployeeDeleted(requireEmpNumber(scenario));
});

function requireEmpNumber(scenario: { empNumber?: string }): string {
  if (!scenario.empNumber) {
    throw new Error('Employee number was not captured after employee creation.');
  }

  return scenario.empNumber;
}
