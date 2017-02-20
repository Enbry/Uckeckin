'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gain = mongoose.model('Gain'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  gain;

/**
 * Gain routes tests
 */
describe('Gain CRUD tests', function () {

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

    // Save a user to the test db and create new gain
    user.save(function () {
      gain = {
        title: 'Gain Title',
        content: 'Gain Content'
      };

      done();
    });
  });

  /*it('should not be able to save a gain if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/gains')
          .send(gain)
          .expect(403)
          .end(function (gainSaveErr, gainSaveRes) {
            // Call the assertion callback
            done(gainSaveErr);
          });

      });
  });*/

  it('should not be able to save a gain if not logged in', function (done) {
    agent.post('/api/gains')
      .send(gain)
      .expect(403)
      .end(function (gainSaveErr, gainSaveRes) {
        // Call the assertion callback
        done(gainSaveErr);
      });
  });

  /*it('should not be able to update a gain if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/gains')
          .send(gain)
          .expect(403)
          .end(function (gainSaveErr, gainSaveRes) {
            // Call the assertion callback
            done(gainSaveErr);
          });
      });
  });*/

  it('should be able to get a list of gains if not signed in', function (done) {
    // Create new gain model instance
    var gainObj = new Gain(gain);

    // Save the gain
    gainObj.save(function () {
      // Request gains
      request(app).get('/api/gains')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single gain if not signed in', function (done) {
    // Create new gain model instance
    var gainObj = new Gain(gain);

    // Save the gain
    gainObj.save(function () {
      request(app).get('/api/gains/' + gainObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', gain.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single gain with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/gains/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Gain is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single gain which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent gain
    request(app).get('/api/gains/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No gain with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  /*it('should not be able to delete a gain if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/gains')
          .send(gain)
          .expect(403)
          .end(function (gainSaveErr, gainSaveRes) {
            // Call the assertion callback
            done(gainSaveErr);
          });
      });
  });*/

  it('should not be able to delete a gain if not signed in', function (done) {
    // Set gain user
    gain.user = user;

    // Create new gain model instance
    var gainObj = new Gain(gain);

    // Save the gain
    gainObj.save(function () {
      // Try deleting gain
      request(app).delete('/api/gains/' + gainObj._id)
        .expect(403)
        .end(function (gainDeleteErr, gainDeleteRes) {
          // Set message assertion
          (gainDeleteRes.body.message).should.match('User is not authorized');

          // Handle gain error error
          done(gainDeleteErr);
        });

    });
  });

  it('should be able to get a single gain that has an orphaned user reference', function (done) {
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

          // Save a new gain
          agent.post('/api/gains')
            .send(gain)
            .expect(200)
            .end(function (gainSaveErr, gainSaveRes) {
              // Handle gain save error
              if (gainSaveErr) {
                return done(gainSaveErr);
              }

              // Set assertions on new gain
              (gainSaveRes.body.title).should.equal(gain.title);
              should.exist(gainSaveRes.body.user);
              should.equal(gainSaveRes.body.user._id, orphanId);

              // force the gain to have an orphaned user reference
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

                    // Get the gain
                    agent.get('/api/gains/' + gainSaveRes.body._id)
                      .expect(200)
                      .end(function (gainInfoErr, gainInfoRes) {
                        // Handle gain error
                        if (gainInfoErr) {
                          return done(gainInfoErr);
                        }

                        // Set assertions
                        (gainInfoRes.body._id).should.equal(gainSaveRes.body._id);
                        (gainInfoRes.body.title).should.equal(gain.title);
                        should.equal(gainInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single gain if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new gain model instance
    var gainObj = new Gain(gain);

    // Save the gain
    gainObj.save(function () {
      request(app).get('/api/gains/' + gainObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', gain.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single gain, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'gainowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Gain
    var _gainOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _gainOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Gain
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

          // Save a new gain
          agent.post('/api/gains')
            .send(gain)
            .expect(200)
            .end(function (gainSaveErr, gainSaveRes) {
              // Handle gain save error
              if (gainSaveErr) {
                return done(gainSaveErr);
              }

              // Set assertions on new gain
              (gainSaveRes.body.title).should.equal(gain.title);
              should.exist(gainSaveRes.body.user);
              should.equal(gainSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the gain
                  agent.get('/api/gains/' + gainSaveRes.body._id)
                    .expect(200)
                    .end(function (gainInfoErr, gainInfoRes) {
                      // Handle gain error
                      if (gainInfoErr) {
                        return done(gainInfoErr);
                      }

                      // Set assertions
                      (gainInfoRes.body._id).should.equal(gainSaveRes.body._id);
                      (gainInfoRes.body.title).should.equal(gain.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (gainInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Gain.remove().exec(done);
    });
  });
});
