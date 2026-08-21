import { APIRequestContext, expect } from '@playwright/test';
import { env } from '@config/env';

export class OrangeHrmApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async verifyEmployeeExists(empNumber: string): Promise<void> {
    const response = await this.request.get(`${env.apiBaseUrl}/web/index.php/api/v2/pim/employees/${empNumber}`);

    expect(response.ok(), `Expected employee ${empNumber} to be available through API`).toBeTruthy();
  }

  async verifyEmployeeDeleted(empNumber: string): Promise<void> {
    const response = await this.request.get(`${env.apiBaseUrl}/web/index.php/api/v2/pim/employees/${empNumber}`);

    expect([404, 410], `Expected deleted employee ${empNumber} to be absent`).toContain(response.status());
  }
}
