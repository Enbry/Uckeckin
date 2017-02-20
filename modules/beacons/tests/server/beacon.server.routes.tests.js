'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Beacon = mongoose.model('Beacon'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  beacon;

/**
 * Beacon routes tests
 */
describe('Beacon CRUD tests', function () {

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

    // Save a user to the test db and create new beacon
    user.save(function () {
      beacon = {
        title: 'Beacon Title',
        content: 'Beacon Content'
      };

      done();
    });
  });

  it('should not be able to save a beacon if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/beacons')
          .send(beacon)
          .expect(403)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Call the assertion callback
            done(beaconSaveErr);
          });

      });
  });

  it('should not be able to save a beacon if not logged in', function (done) {
    agent.post('/api/beacons')
      .send(beacon)
      .expect(403)
      .end(function (beaconSaveErr, beaconSaveRes) {
        // Call the assertion callback
        done(beaconSaveErr);
      });
  });

  it('should not be able to update a beacon if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/beacons')
          .send(beacon)
          .expect(403)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Call the assertion callback
            done(beaconSaveErr);
          });
      });
  });

  it('should be able to get a list of beacons if not signed in', function (done) {
    // Create new beacon model instance
    var beaconObj = new Beacon(beacon);

    // Save the beacon
    beaconObj.save(function () {
      // Request beacons
      request(app).get('/api/beacons')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single beacon if not signed in', function (done) {
    // Create new beacon model instance
    var beaconObj = new Beacon(beacon);

    // Save the beacon
    beaconObj.save(function () {
      request(app).get('/api/beacons/' + beaconObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', beacon.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single beacon with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/beacons/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Beacon is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single beacon which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent beacon
    request(app).get('/api/beacons/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No beacon with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete a beacon if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/beacons')
          .send(beacon)
          .expect(403)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Call the assertion callback
            done(beaconSaveErr);
          });
      });
  });

  it('should not be able to delete a beacon if not signed in', function (done) {
    // Set beacon user
    beacon.user = user;

    // Create new beacon model instance
    var beaconObj = new Beacon(beacon);

    // Save the beacon
    beaconObj.save(function () {
      // Try deleting beacon
      request(app).delete('/api/beacons/' + beaconObj._id)
        .expect(403)
        .end(function (beaconDeleteErr, beaconDeleteRes) {
          // Set message assertion
          (beaconDeleteRes.body.message).should.match('User is not authorized');

          // Handle beacon error error
          done(beaconDeleteErr);
        });

    });
  });

  it('should be able to get a single beacon that has an orphaned user reference', function (done) {
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

          // Save a new beacon
          agent.post('/api/beacons')
            .send(beacon)
            .expect(200)
            .end(function (beaconSaveErr, beaconSaveRes) {
              // Handle beacon save error
              if (beaconSaveErr) {
                return done(beaconSaveErr);
              }

              // Set assertions on new beacon
              (beaconSaveRes.body.title).should.equal(beacon.title);
              should.exist(beaconSaveRes.body.user);
              should.equal(beaconSaveRes.body.user._id, orphanId);

              // force the beacon to have an orphaned user reference
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

                    // Get the beacon
                    agent.get('/api/beacons/' + beaconSaveRes.body._id)
                      .expect(200)
                      .end(function (beaconInfoErr, beaconInfoRes) {
                        // Handle beacon error
                        if (beaconInfoErr) {
                          return done(beaconInfoErr);
                        }

                        // Set assertions
                        (beaconInfoRes.body._id).should.equal(beaconSaveRes.body._id);
                        (beaconInfoRes.body.title).should.equal(beacon.title);
                        should.equal(beaconInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single beacon if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new beacon model instance
    var beaconObj = new Beacon(beacon);

    // Save the beacon
    beaconObj.save(function () {
      request(app).get('/api/beacons/' + beaconObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', beacon.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single beacon, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'beaconowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Beacon
    var _beaconOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _beaconOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Beacon
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

          // Save a new beacon
          agent.post('/api/beacons')
            .send(beacon)
            .expect(200)
            .end(function (beaconSaveErr, beaconSaveRes) {
              // Handle beacon save error
              if (beaconSaveErr) {
                return done(beaconSaveErr);
              }

              // Set assertions on new beacon
              (beaconSaveRes.body.title).should.equal(beacon.title);
              should.exist(beaconSaveRes.body.user);
              should.equal(beaconSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the beacon
                  agent.get('/api/beacons/' + beaconSaveRes.body._id)
                    .expect(200)
                    .end(function (beaconInfoErr, beaconInfoRes) {
                      // Handle beacon error
                      if (beaconInfoErr) {
                        return done(beaconInfoErr);
                      }

                      // Set assertions
                      (beaconInfoRes.body._id).should.equal(beaconSaveRes.body._id);
                      (beaconInfoRes.body.title).should.equal(beacon.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (beaconInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Beacon.remove().exec(done);
    });
  });
});
