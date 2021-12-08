import request from 'supertest';
import app from '../../src/app';
import { v4 as randomUUID } from 'uuid';

describe('/api/game', function () {
  describe(`GET /${randomUUID()}`, function () {
    it('should return status 200 and message', async function () {
      await request(app)
        .get(`/api/game/${randomUUID()}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { test: true });
    });
  });
});

describe('/api/game', function () {
  describe('GET /123-456', function () {
    it('should return status 200 and message', async function () {
      await request(app)
        .get('/api/game/123-456')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { test: false });
    });
  });
});
