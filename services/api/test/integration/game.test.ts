import request from 'supertest';
import app from '../../src/app';

describe('/api/game', function () {
  describe('GET /a6271484-d406-4a9f-92fc-39c1ad729ac8', function () {
    it('should return status 200 and message', async function () {
      await request(app)
        .get('/api/game/a6271484-d406-4a9f-92fc-39c1ad729ac8')
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
