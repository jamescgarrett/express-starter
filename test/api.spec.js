const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app/server');

describe('Api getApiIndex method', () => {
  it('should return json with a title property with the value of Hello Api', (done) => {
    request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('title')
          .and.equal('Hello Api!');
        done();
      });
  });
});