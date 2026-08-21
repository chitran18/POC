# Test Strategy

## Coverage

- Authentication: valid admin login and session creation.
- Employee lifecycle: create, validate, update, API verify, delete.
- Role validation: admin can perform employee management actions; lower roles should be restricted where credentials are available.
- API verification: confirm employee state through authenticated OrangeHRM endpoints.
- Stability: retries in CI, web-first waits, screenshots, videos, and traces.

## Test Data

- Generate unique employees per run.
- Keep lifecycle data scoped to each test.
- Delete created employees during the test or in teardown.
- Avoid shared static employee IDs in parallel runs.

## CI/CD

- Run tests on pull requests and main/master pushes.
- Publish Playwright HTML report, Cucumber report, traces, screenshots, and videos.
- Execute with isolated test data.
