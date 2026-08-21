import { test } from '@fixtures/test-fixtures';

test.describe('Employee API verification @api', () => {
  test('API client is available for employee state checks', async ({ apiClient }) => {
    await apiClient.verifyEmployeeDeleted('0');
  });
});
