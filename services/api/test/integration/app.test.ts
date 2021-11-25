import request from 'supertest';
import app from '../../src/app';

describe('/api', function () {
  describe('GET /api', function () {
    it('should return status 200 and message: hi', async function () {
      await request(app)
        .get('/api')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, { message: 'hi' });
    });
  });

  describe('GET /api/error-async-404', function () {
    it('should return 404 NotFound error and log it', async function () {
      await request(app)
        .get('/api/error-async-404')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(404, { message: 'Not Found' });
    });
  });

  describe('GET /api/error-async', function () {
    it('should return unhandled 500 error and log it', async function () {
      await request(app)
        .get('/api/error-async')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(500, { message: 'Internal Server Error' });
    });
  });
});
