import request from 'supertest';
import app from '../../src/app';

describe('/api/game', function () {
  describe('GET /test', function () {
    it('should return status 200 and message', async function () {
      await request(app)
        .get('/api/game/test')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { test: true });
    });
  });
});
