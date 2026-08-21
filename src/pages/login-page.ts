import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.page.getByRole('button', { name: /login/i })).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: /login/i }).click();
    await expect(this.page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  }
}

