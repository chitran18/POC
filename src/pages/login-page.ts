import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public usernameInput = () => this.page.getByPlaceholder('Username');
  public passwordInput = () => this.page.getByPlaceholder('Password');
  public loginButton = () => this.page.getByRole('button', { name: /login/i });
  public dashboardHeader = () => this.page.getByRole('heading', { name: /dashboard/i });

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.loginButton()).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await expect(this.dashboardHeader()).toBeVisible();
  }
}
