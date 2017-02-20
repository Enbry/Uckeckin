'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Stat = mongoose.model('Stat'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  stat;

/**
 * Stat routes tests
 */
describe('Stat CRUD tests', function () {

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

    // Save a user to the test db and create new stat
    user.save(function () {
      stat = {
        title: 'Stat Title',
        content: 'Stat Content'
      };

      done();
    });
  });

  /*it('should not be able to save a stat if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/stats')
          .send(stat)
          .expect(403)
          .end(function (statSaveErr, statSaveRes) {
            // Call the assertion callback
            done(statSaveErr);
          });

      });
  });*/

  it('should not be able to save a stat if not logged in', function (done) {
    agent.post('/api/stats')
      .send(stat)
      .expect(403)
      .end(function (statSaveErr, statSaveRes) {
        // Call the assertion callback
        done(statSaveErr);
      });
  });

  /*it('should not be able to update a stat if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/stats')
          .send(stat)
          .expect(403)
          .end(function (statSaveErr, statSaveRes) {
            // Call the assertion callback
            done(statSaveErr);
          });
      });
  });*/

  it('should be able to get a list of stats if not signed in', function (done) {
    // Create new stat model instance
    var statObj = new Stat(stat);

    // Save the stat
    statObj.save(function () {
      // Request stats
      request(app).get('/api/stats')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single stat if not signed in', function (done) {
    // Create new stat model instance
    var statObj = new Stat(stat);

    // Save the stat
    statObj.save(function () {
      request(app).get('/api/stats/' + statObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', stat.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single stat with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/stats/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Stat is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single stat which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent stat
    request(app).get('/api/stats/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No stat with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  /*it('should not be able to delete a stat if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/stats')
          .send(stat)
          .expect(403)
          .end(function (statSaveErr, statSaveRes) {
            // Call the assertion callback
            done(statSaveErr);
          });
      });
  });*/

  it('should not be able to delete a stat if not signed in', function (done) {
    // Set stat user
    stat.user = user;

    // Create new stat model instance
    var statObj = new Stat(stat);

    // Save the stat
    statObj.save(function () {
      // Try deleting stat
      request(app).delete('/api/stats/' + statObj._id)
        .expect(403)
        .end(function (statDeleteErr, statDeleteRes) {
          // Set message assertion
          (statDeleteRes.body.message).should.match('User is not authorized');

          // Handle stat error error
          done(statDeleteErr);
        });

    });
  });

  it('should be able to get a single stat that has an orphaned user reference', function (done) {
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

          // Save a new stat
          agent.post('/api/stats')
            .send(stat)
            .expect(200)
            .end(function (statSaveErr, statSaveRes) {
              // Handle stat save error
              if (statSaveErr) {
                return done(statSaveErr);
              }

              // Set assertions on new stat
              (statSaveRes.body.title).should.equal(stat.title);
              should.exist(statSaveRes.body.user);
              should.equal(statSaveRes.body.user._id, orphanId);

              // force the stat to have an orphaned user reference
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

                    // Get the stat
                    agent.get('/api/stats/' + statSaveRes.body._id)
                      .expect(200)
                      .end(function (statInfoErr, statInfoRes) {
                        // Handle stat error
                        if (statInfoErr) {
                          return done(statInfoErr);
                        }

                        // Set assertions
                        (statInfoRes.body._id).should.equal(statSaveRes.body._id);
                        (statInfoRes.body.title).should.equal(stat.title);
                        should.equal(statInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single stat if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new stat model instance
    var statObj = new Stat(stat);

    // Save the stat
    statObj.save(function () {
      request(app).get('/api/stat/' + statObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', stat.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single stat, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'articleowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Stat
    var _statOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _statOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Stat
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

          // Save a new stat
          agent.post('/api/stats')
            .send(stat)
            .expect(200)
            .end(function (statSaveErr, statSaveRes) {
              // Handle stat save error
              if (statSaveErr) {
                return done(statSaveErr);
              }

              // Set assertions on new stat
              (statSaveRes.body.title).should.equal(stat.title);
              should.exist(statSaveRes.body.user);
              should.equal(statSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the stat
                  agent.get('/api/stats/' + statSaveRes.body._id)
                    .expect(200)
                    .end(function (statInfoErr, statInfoRes) {
                      // Handle stat error
                      if (statInfoErr) {
                        return done(statInfoErr);
                      }

                      // Set assertions
                      (statInfoRes.body._id).should.equal(statSaveRes.body._id);
                      (statInfoRes.body.title).should.equal(stat.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (statInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Stat.remove().exec(done);
    });
  });
});
