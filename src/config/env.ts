export type TestEnvironment = {
  baseUrl: string;
  apiBaseUrl: string;
  adminUsername: string;
  adminPassword: string;
  testEnv: string;
};

export const env: TestEnvironment = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  adminUsername: process.env.ADMIN_USERNAME ?? 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
  testEnv: process.env.TEST_ENV ?? 'demo'
};

