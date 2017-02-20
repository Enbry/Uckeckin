'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  License = mongoose.model('License'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  license;

/**
 * License routes tests
 */
describe('License CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new license
    user.save(function () {
      license = {
        title: 'License Title',
        content: 'License Content'
      };

      done();
    });
  });

  it('should not be able to save a license if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/licenses')
          .send(license)
          .expect(403)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Call the assertion callback
            done(licenseSaveErr);
          });

      });
  });

  it('should not be able to save a license if not logged in', function (done) {
    agent.post('/api/licenses')
      .send(license)
      .expect(403)
      .end(function (licenseSaveErr, licenseSaveRes) {
        // Call the assertion callback
        done(licenseSaveErr);
      });
  });

  it('should not be able to update a license if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/licenses')
          .send(license)
          .expect(403)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Call the assertion callback
            done(licenseSaveErr);
          });
      });
  });

  it('should be able to get a list of licenses if not signed in', function (done) {
    // Create new license model instance
    var licenseObj = new License(license);

    // Save the license
    licenseObj.save(function () {
      // Request licenses
      request(app).get('/api/licenses')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single license if not signed in', function (done) {
    // Create new license model instance
    var licenseObj = new License(license);

    // Save the license
    licenseObj.save(function () {
      request(app).get('/api/licenses/' + licenseObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', license.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single license with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/licenses/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'License is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single license which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent license
    request(app).get('/api/licenses/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No license with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete a license if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/licenses')
          .send(license)
          .expect(403)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Call the assertion callback
            done(licenseSaveErr);
          });
      });
  });

  it('should not be able to delete a license if not signed in', function (done) {
    // Set license user
    license.user = user;

    // Create new license model instance
    var licenseObj = new License(license);

    // Save the license
    licenseObj.save(function () {
      // Try deleting license
      request(app).delete('/api/licenses/' + licenseObj._id)
        .expect(403)
        .end(function (licenseDeleteErr, licenseDeleteRes) {
          // Set message assertion
          (licenseDeleteRes.body.message).should.match('User is not authorized');

          // Handle license error error
          done(licenseDeleteErr);
        });

    });
  });

  it('should be able to get a single license that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new license
          agent.post('/api/licenses')
            .send(license)
            .expect(200)
            .end(function (licenseSaveErr, licenseSaveRes) {
              // Handle license save error
              if (licenseSaveErr) {
                return done(licenseSaveErr);
              }

              // Set assertions on new license
              (licenseSaveRes.body.title).should.equal(license.title);
              should.exist(licenseSaveRes.body.user);
              should.equal(licenseSaveRes.body.user._id, orphanId);

              // force the license to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the license
                    agent.get('/api/licenses/' + licenseSaveRes.body._id)
                      .expect(200)
                      .end(function (licenseInfoErr, licenseInfoRes) {
                        // Handle license error
                        if (licenseInfoErr) {
                          return done(licenseInfoErr);
                        }

                        // Set assertions
                        (licenseInfoRes.body._id).should.equal(licenseSaveRes.body._id);
                        (licenseInfoRes.body.title).should.equal(license.title);
                        should.equal(licenseInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single license if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new license model instance
    var licenseObj = new License(license);

    // Save the license
    licenseObj.save(function () {
      request(app).get('/api/licenses/' + licenseObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', license.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single license, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'licenseowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the License
    var _licenseOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _licenseOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the License
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new license
          agent.post('/api/licenses')
            .send(license)
            .expect(200)
            .end(function (licenseSaveErr, licenseSaveRes) {
              // Handle license save error
              if (licenseSaveErr) {
                return done(licenseSaveErr);
              }

              // Set assertions on new license
              (licenseSaveRes.body.title).should.equal(license.title);
              should.exist(licenseSaveRes.body.user);
              should.equal(licenseSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the license
                  agent.get('/api/licenses/' + licenseSaveRes.body._id)
                    .expect(200)
                    .end(function (licenseInfoErr, licenseInfoRes) {
                      // Handle license error
                      if (licenseInfoErr) {
                        return done(licenseInfoErr);
                      }

                      // Set assertions
                      (licenseInfoRes.body._id).should.equal(licenseSaveRes.body._id);
                      (licenseInfoRes.body.title).should.equal(license.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (licenseInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      License.remove().exec(done);
    });
  });
});
