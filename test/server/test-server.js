'use strict';

const request = require('supertest'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      expect = chai.expect;

chai.use(chaiHttp);

describe('loading express', () => {

  let server;
  beforeEach(() => {
    server = require('../../index.js').server;
  });

  afterEach(() => {
    server.close();
  });

  it('responds to / with status of 200', function testSlash (done) {
    chai.request(server)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('404 everything else', function testPath (done) {
    console.log('test 404');
    chai.request(server)
    .get('/foo/bar/')
    .end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });

});