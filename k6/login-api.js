import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000']
  }
};

const baseUrl = __ENV.API_BASE_URL || 'https://opensource-demo.orangehrmlive.com';

export default function () {
  const response = http.get(`${baseUrl}/web/index.php/auth/login`);

  check(response, {
    'login page responds': (res) => res.status === 200,
    'login page loads quickly': (res) => res.timings.duration < 1000
  });
}

