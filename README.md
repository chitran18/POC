# OrangeHRM QA Automation Framework

Automation framework for the CompareClub Senior QA Automation Engineer technical test.

## Scope

- End-to-end OrangeHRM employee lifecycle automation
- Authentication, employee creation, role-based validation, update, API verification, and deletion
- Scalable Playwright + TypeScript BDD framework using Page Object Model
- CI execution with reports, screenshots, videos, traces, and artifacts

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env
```

Update `.env` if a non-demo OrangeHRM environment is used.

## Execution

```bash
npm test
npm run test:smoke
npm run test:e2e
npm run test:ui
npm run report
```

Playwright UI mode stays running while the UI server is open. Use `http://127.0.0.1:9323` if the browser tab does not open automatically, and press `Ctrl+C` to stop it.

CI runs the same suite on `main`, `master`, pull requests, and manual dispatch.

## Key Design Decisions

- Feature files describe business behavior; step definitions keep automation details out of scenarios.
- Page Object Model keeps UI selectors and user actions isolated from test intent.
- Fixtures centralize authenticated sessions, API clients, and generated test data.
- Test data uses unique suffixes so repeated runs do not collide.
- API verification is isolated behind `OrangeHrmApiClient` so API details can evolve without rewriting E2E tests.
- CI publishes Playwright HTML reports, Cucumber reports, traces, screenshots, and videos.
- CI enables retry and two-worker execution; local runs stay single-worker for easier debugging.

## Flaky Test Strategy

Detection:

- Track Playwright retry outcomes in CI.
- Review traces, screenshots, videos, and action timing for failed retry-pass tests.
- Tag unstable tests with `@flaky-investigation` only while actively investigating.

Mitigation:

- Prefer locator assertions and web-first waits over fixed sleeps.
- Make test data unique and clean it up after each run.
- Keep retries limited to CI and treat retry passes as signals, not success to ignore.
- Move unstable environment assumptions behind fixtures or API setup helpers.

## Tags

- `@smoke` core confidence checks
- `@e2e` full UI flows
- `@regression` broader suite

## Notes

The public OrangeHRM demo may restrict direct API access. If APIs are unavailable, document the limitation and verify server state through supported authenticated endpoints or controlled test-environment API access.
