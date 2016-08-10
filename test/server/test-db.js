'use strict';


describe('Testing MongoDB', () => {
  const request = require('supertest'),
        chai = require('chai'),
        chaiHttp = require('chai-http'),
        expect = chai.expect,
        assert = chai.assert,
        mongoose = require('mongoose'),
        AdminSchema = require('../../server/schemas/modelAdmin'),
        Admin = mongoose.model('Admin', AdminSchema);

  chai.use(chaiHttp);
  let testServer;

  beforeEach(function () {
      testServer = require('../../index.js', { bustCache: true }).server;
  });

  afterEach(function() {
    testServer.close();
  });
    
    

  it('should connect to MongoLab', function(done) {

    chai.request(testServer)
    .get('/api/admins')
    
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should get the number of users stored in the database', function(done) {

    chai.request(testServer)
    .get('/api/admins')
    .end(function(err, res) {
      if (err) { 
        throw err;
      }
      assert.deepEqual(res.body, {'totalAdmins': 1}, 'Expected res.body to have {"totalAdmins": 1}, but got ' + res.body);
      done();
    });
  });

});



  // it('should add a user to the database', function(done) {
  //   Admin.count({}, function(err, c) {
  //     if (err) {
  //       console.warn('ERROR ADDING USER TO DB: ', err);
  //     }
  //     collectionLength = c;
  //   }).then(function(done) {
  //     chai.expect(collectionLength).to.equal(1);
  //     done();
  //   });
  // });