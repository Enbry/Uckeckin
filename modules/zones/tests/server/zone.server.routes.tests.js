'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Zone = mongoose.model('Zone'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  zone;

/**
 * Zone routes tests
 */
describe('Zone CRUD tests', function () {

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

    // Save a user to the test db and create new zone
    user.save(function () {
      zone = {
        title: 'Zone Title',
        content: 'Zone Content'
      };

      done();
    });
  });

  /*it('should not be able to save a zone if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/zones')
          .send(zone)
          .expect(403)
          .end(function (zoneSaveErr, zoneSaveRes) {
            // Call the assertion callback
            done(zoneSaveErr);
          });

      });
  });*/

  it('should not be able to save a zone if not logged in', function (done) {
    agent.post('/api/zones')
      .send(zone)
      .expect(403)
      .end(function (zoneSaveErr, zoneSaveRes) {
        // Call the assertion callback
        done(zoneSaveErr);
      });
  });

  /*it('should not be able to update a zone if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/zones')
          .send(zone)
          .expect(403)
          .end(function (zoneSaveErr, zoneSaveRes) {
            // Call the assertion callback
            done(zoneSaveErr);
          });
      });
  });*/

  it('should be able to get a list of zones if not signed in', function (done) {
    // Create new zone model instance
    var zoneObj = new Zone(zone);

    // Save the zone
    zoneObj.save(function () {
      // Request zones
      request(app).get('/api/zones')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single zone if not signed in', function (done) {
    // Create new zone model instance
    var zoneObj = new Zone(zone);

    // Save the zone
    zoneObj.save(function () {
      request(app).get('/api/zones/' + zoneObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', zone.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single zone with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/zones/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Zone is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single zone which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent zone
    request(app).get('/api/zones/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No zone with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  /*it('should not be able to delete a zone if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/zones')
          .send(zone)
          .expect(403)
          .end(function (zoneSaveErr, zoneSaveRes) {
            // Call the assertion callback
            done(zoneSaveErr);
          });
      });
  });*/

  it('should not be able to delete a zone if not signed in', function (done) {
    // Set zone user
    zone.user = user;

    // Create new zone model instance
    var zoneObj = new Zone(zone);

    // Save the zone
    zoneObj.save(function () {
      // Try deleting zone
      request(app).delete('/api/zones/' + zoneObj._id)
        .expect(403)
        .end(function (zoneDeleteErr, zoneDeleteRes) {
          // Set message assertion
          (zoneDeleteErr.body.message).should.match('User is not authorized');

          // Handle zone error error
          done(zoneDeleteErr);
        });

    });
  });

  it('should be able to get a single zone that has an orphaned user reference', function (done) {
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

          // Save a new zone
          agent.post('/api/zones')
            .send(zone)
            .expect(200)
            .end(function (zoneSaveErr, zoneSaveRes) {
              // Handle zone save error
              if (zoneSaveErr) {
                return done(zoneSaveErr);
              }

              // Set assertions on new zone
              (zoneSaveRes.body.title).should.equal(zone.title);
              should.exist(zoneSaveRes.body.user);
              should.equal(zoneSaveRes.body.user._id, orphanId);

              // force the zone to have an orphaned user reference
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

                    // Get the zone
                    agent.get('/api/zones/' + zoneSaveRes.body._id)
                      .expect(200)
                      .end(function (zoneInfoErr, zoneInfoRes) {
                        // Handle zone error
                        if (zoneInfoErr) {
                          return done(zoneInfoErr);
                        }

                        // Set assertions
                        (zoneInfoRes.body._id).should.equal(zoneSaveRes.body._id);
                        (zoneInfoRes.body.title).should.equal(zone.title);
                        should.equal(zoneInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single zone if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new zone model instance
    var zoneObj = new Zone(zone);

    // Save the zone
    zoneObj.save(function () {
      request(app).get('/api/zones/' + zoneObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', zone.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single zone, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'zoneowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Zone
    var _zoneOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _zoneOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Zone
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

          // Save a new zone
          agent.post('/api/zones')
            .send(zone)
            .expect(200)
            .end(function (zoneSaveErr, zoneSaveRes) {
              // Handle zone save error
              if (zoneSaveErr) {
                return done(zoneSaveErr);
              }

              // Set assertions on new zone
              (zoneSaveRes.body.title).should.equal(zone.title);
              should.exist(zoneSaveRes.body.user);
              should.equal(zoneSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the zone
                  agent.get('/api/zones/' + zoneSaveRes.body._id)
                    .expect(200)
                    .end(function (zoneInfoErr, zoneInfoRes) {
                      // Handle zone error
                      if (zoneInfoErr) {
                        return done(zoneInfoErr);
                      }

                      // Set assertions
                      (zoneInfoRes.body._id).should.equal(zoneSaveRes.body._id);
                      (zoneInfoRes.body.title).should.equal(zone.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (zoneInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Zone.remove().exec(done);
    });
  });
});
