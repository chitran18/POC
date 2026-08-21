import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { EmployeeTestData } from '@utils/test-data';

export class EmployeePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public pimMenuLink = () => this.page.getByRole('link', { name: /pim/i });
  public pimHeader = () => this.page.getByRole('heading', { name: /pim/i });
  public addEmployeeLink = () => this.page.getByRole('link', { name: /add employee/i });
  public searchButton = () => this.page.getByRole('button', { name: /search/i });
  private inputByLabel = (label: string) =>
    this.page.locator(`//*[normalize-space()="${label}"]/ancestor::*[contains(@class,"oxd-input-group")][1]//input`);

  async openPim() {
    await this.pimMenuLink().click();
    await expect(this.pimHeader()).toBeVisible();
  }

  async verifyEmployeeManagementAccess() {
    await this.openPim();
    await expect(this.addEmployeeLink()).toBeVisible();
    await expect(this.searchButton()).toBeVisible();
  }

  async addEmployee(employee: EmployeeTestData): Promise<string> {
    await this.addEmployeeLink().click();
    await this.page.getByPlaceholder('First Name').fill(employee.firstName);
    await this.page.getByPlaceholder('Middle Name').fill(employee.middleName);
    await this.page.getByPlaceholder('Last Name').fill(employee.lastName);

    await this.inputByLabel('Employee Id').fill(employee.employeeId);

    await this.page.getByRole('button', { name: /save/i }).click();
    await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();

    return this.currentEmpNumber();
  }

  async updateEmployeeLastName(employee: EmployeeTestData) {
    await this.page.getByPlaceholder('Last Name').fill(employee.updatedLastName);
    await this.page.getByRole('button', { name: /save/i }).first().click();
    await expect(this.page.getByText(/successfully updated/i)).toBeVisible();
  }

  async searchEmployee(employee: EmployeeTestData) {
    await this.openPim();
    await this.inputByLabel('Employee Id').fill(employee.employeeId);
    await this.page.getByRole('button', { name: /search/i }).click();
    await expect(this.page.getByText(employee.employeeId, { exact: true })).toBeVisible();
  }

  async deleteEmployee(employee: EmployeeTestData) {
    await this.searchEmployee(employee);
    await this.page.getByRole('button').filter({ has: this.page.locator('i.bi-trash') }).first().click();
    await this.page.getByRole('button', { name: /yes, delete/i }).click();
    await expect(this.page.getByText(/successfully deleted/i)).toBeVisible();
  }

  private async currentEmpNumber(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/empNumber\/(\d+)/);

    if (!match) {
      throw new Error(`Unable to read OrangeHRM empNumber from URL: ${url}`);
    }

    return match[1];
  }
}
