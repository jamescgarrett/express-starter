const expect = require('chai').expect;
const request = require('supertest');
const server = require('../app/server');

describe('Controller getIndex method', () => {
  it('should return json with a title property with the value of Hello World', (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('title')
          .and.equal('Hello World!');
        done();
      });
  });
});