export type EmployeeTestData = {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
  updatedLastName: string;
};

export function createEmployeeTestData(prefix = 'qa'): EmployeeTestData {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    firstName: `Auto${prefix}`,
    middleName: 'E2E',
    lastName: `User${suffix}`,
    employeeId: suffix.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10),
    updatedLastName: `Updated${suffix}`
  };
}

