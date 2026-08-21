import { test, expect } from '@fixtures/test-fixtures';
import { EmployeePage } from '@pages/employee-page';
import { createEmployeeTestData } from '@utils/test-data';

test.describe('Employee lifecycle @e2e @smoke @regression', () => {
  test('admin can create, validate, update, verify, and delete an employee', async ({
    authenticatedPage,
    apiClient
  }) => {
    const employee = createEmployeeTestData();
    const employeePage = new EmployeePage(authenticatedPage);

    await employeePage.openPim();
    const empNumber = await employeePage.addEmployee(employee);

    await expect(authenticatedPage.getByPlaceholder('Last Name')).toHaveValue(employee.lastName);

    await employeePage.updateEmployeeLastName(employee);
    await employeePage.searchEmployee(employee);

    await apiClient.verifyEmployeeExists(empNumber);

    await employeePage.deleteEmployee(employee);
    await apiClient.verifyEmployeeDeleted(empNumber);
  });
});
