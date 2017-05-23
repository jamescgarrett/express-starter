const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app/server');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /api/v1/', () => {
  it('should return 200 OK', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200, done);
  });
});

describe('GET /missing-url', () => {
  it('should return 404', (done) => {
    request(server)
      .get('/missing-url')
      .expect(404, done);
  });
});