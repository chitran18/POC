import { expect, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async expectPageReady(): Promise<void> {
    await expect(this.page.locator('body')).toBeVisible();
  }
}

