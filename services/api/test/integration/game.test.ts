import request from 'supertest';
import app from '../../src/app';

describe('/api/game', function () {
  describe('GET /671e2367-86c3-453a-9df8-3c0048145b64', function () {
    it('should return status 200 and message', async function () {
      await request(app)
        .get('/api/game/671e2367-86c3-453a-9df8-3c0048145b64')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { message: 'Validation Successful' });
    });
  });
});

describe('/api/game', function () {
  describe('GET /123-456', function () {
    it('should return status 400 and massage', async function () {
      await request(app)
        .get('/api/game/123-456')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(400, { message: 'Validation Error' });
    });
  });
});
