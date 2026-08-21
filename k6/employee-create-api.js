import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 3,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500']
  }
};

const baseUrl = __ENV.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com';

export default function () {
  const payload = JSON.stringify({
    firstName: 'Perf',
    middleName: 'K6',
    lastName: `User${Date.now()}`
  });

  const response = http.post(`${baseUrl}/web/index.php/api/v2/pim/employees`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: __ENV.ORANGEHRM_SESSION_COOKIE || ''
    }
  });

  check(response, {
    'employee create endpoint is reachable': (res) => [200, 201, 401, 403].includes(res.status),
    'employee create response under threshold': (res) => res.timings.duration < 1500
  });
}

