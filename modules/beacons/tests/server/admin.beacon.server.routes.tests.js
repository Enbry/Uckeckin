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
describe('Beacon Admin CRUD tests', function () {
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
      roles: ['user', 'admin'],
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new beacon
    user.save(function () {
      beacon = {
        title: 'Beacon  Title',
        content: 'Beacon Content'
      };

      done();
    });
  });

  it('should be able to save a beacon if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new beacon
        agent.post('/api/beacons')
          .send(beacon)
          .expect(200)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Handle beacon save error
            if (beaconSaveErr) {
              return done(beaconSaveErr);
            }

            // Get a list of beacons
            agent.get('/api/beacons')
              .end(function (beaconsGetErr, beaconsGetRes) {
                // Handle beacon save error
                if (beaconsGetErr) {
                  return done(beaconsGetErr);
                }

                // Get beacons list
                var beacons = beaconsGetRes.body;

                // Set assertions
                (beacons[0].user._id).should.equal(userId);
                (beacons[0].title).should.match('Beacon Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update a beacon if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new beacon
        agent.post('/api/beacons')
          .send(beacon)
          .expect(200)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Handle beacon save error
            if (beaconSaveErr) {
              return done(beaconSaveErr);
            }

            // Update beacon title
            beacon.title = 'Beacon Title';

            // Update an existing beacon
            agent.put('/api/beacons/' + beaconSaveRes.body._id)
              .send(beacon)
              .expect(200)
              .end(function (beaconUpdateErr, beaconUpdateRes) {
                // Handle beacon update error
                if (beaconUpdateErr) {
                  return done(beaconUpdateErr);
                }

                // Set assertions
                (beaconUpdateRes.body._id).should.equal(beaconSaveRes.body._id);
                (beaconUpdateRes.body.title).should.match('Beacon Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a beacon if no title is provided', function (done) {
    // Invalidate title field
    beacon.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new beacon
        agent.post('/api/beacon')
          .send(beacon)
          .expect(400)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Set message assertion
            (beaconSaveRes.body.message).should.match('Title cannot be blank');

            // Handle beacon save error
            done(beaconSaveErr);
          });
      });
  });

  it('should be able to delete a beacon if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new beacon
        agent.post('/api/beacons')
          .send(beacon)
          .expect(200)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Handle beacon save error
            if (beaconSaveErr) {
              return done(beaconSaveErr);
            }

            // Delete an existing beacon
            agent.delete('/api/beacons/' + beaconSaveRes.body._id)
              .send(beacon)
              .expect(200)
              .end(function (beaconDeleteErr, beaconDeleteRes) {
                // Handle beacon error error
                if (beaconDeleteErr) {
                  return done(beaconDeleteErr);
                }

                // Set assertions
                (beaconDeleteRes.body._id).should.equal(beaconSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single beacon if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new beacon model instance
    beacon.user = user;
    var beaconObj = new Beacon(beacon);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new beacon
        agent.post('/api/beacons')
          .send(beacon)
          .expect(200)
          .end(function (beaconSaveErr, beaconSaveRes) {
            // Handle beacon save error
            if (beaconSaveErr) {
              return done(beaconSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (beaconInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
