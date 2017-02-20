'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Place = mongoose.model('Place'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  place;

/**
 * Place routes tests
 */
describe('Place CRUD tests', function () {

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

    // Save a user to the test db and create new place
    user.save(function () {
      place = {
        title: 'Place Title',
        content: 'Place Content'
      };

      done();
    });
  });

  /*it('should not be able to save a place if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/places')
          .send(place)
          .expect(403)
          .end(function (placeSaveErr, placeSaveRes) {
            // Call the assertion callback
            done(placeSaveErr);
          });

      });
  });*/

  it('should not be able to save a place if not logged in', function (done) {
    agent.post('/api/places')
      .send(place)
      .expect(403)
      .end(function (placeSaveErr, placeSaveRes) {
        // Call the assertion callback
        done(placeSaveErr);
      });
  });

  /*it('should not be able to update a place if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/places')
          .send(place)
          .expect(403)
          .end(function (placeSaveErr, placeSaveRes) {
            // Call the assertion callback
            done(placeSaveErr);
          });
      });
  });*/

  it('should be able to get a list of places if not signed in', function (done) {
    // Create new place model instance
    var placeObj = new Place(place);

    // Save the place
    placeObj.save(function () {
      // Request places
      request(app).get('/api/places')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single place if not signed in', function (done) {
    // Create new place model instance
    var placeObj = new Place(place);

    // Save the place
    placeObj.save(function () {
      request(app).get('/api/places/' + placeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', place.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single place with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/places/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Place is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single place which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent place
    request(app).get('/api/places/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No place with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  /*it('should not be able to delete a place if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/places')
          .send(place)
          .expect(403)
          .end(function (placeSaveErr, placeSaveRes) {
            // Call the assertion callback
            done(placeSaveErr);
          });
      });
  });*/

  it('should not be able to delete a place if not signed in', function (done) {
    // Set place user
    place.user = user;

    // Create new place model instance
    var placeObj = new Place(place);

    // Save the place
    placeObj.save(function () {
      // Try deleting place
      request(app).delete('/api/places/' + placeObj._id)
        .expect(403)
        .end(function (placeDeleteErr, placeDeleteRes) {
          // Set message assertion
          (placeDeleteRes.body.message).should.match('User is not authorized');

          // Handle place error error
          done(placeDeleteErr);
        });

    });
  });

  it('should be able to get a single place that has an orphaned user reference', function (done) {
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

          // Save a new place
          agent.post('/api/places')
            .send(place)
            .expect(200)
            .end(function (placeSaveErr, placeSaveRes) {
              // Handle place save error
              if (placeSaveErr) {
                return done(placeSaveErr);
              }

              // Set assertions on new place
              (placeSaveRes.body.title).should.equal(place.title);
              should.exist(placeSaveRes.body.user);
              should.equal(placeSaveRes.body.user._id, orphanId);

              // force the place to have an orphaned user reference
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

                    // Get the place
                    agent.get('/api/places/' + placeSaveRes.body._id)
                      .expect(200)
                      .end(function (placeInfoErr, placeInfoRes) {
                        // Handle place error
                        if (placeInfoErr) {
                          return done(placeInfoErr);
                        }

                        // Set assertions
                        (placeInfoRes.body._id).should.equal(placeSaveRes.body._id);
                        (placeInfoRes.body.title).should.equal(place.title);
                        should.equal(placeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single place if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new place model instance
    var placeObj = new Place(place);

    // Save the place
    placeObj.save(function () {
      request(app).get('/api/places/' + placeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', place.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single place, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'placeowner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the Place
    var _placeOwner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _placeOwner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Place
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

          // Save a new place
          agent.post('/api/places')
            .send(place)
            .expect(200)
            .end(function (placeSaveErr, placeSaveRes) {
              // Handle place save error
              if (placeSaveErr) {
                return done(placeSaveErr);
              }

              // Set assertions on new place
              (placeSaveRes.body.title).should.equal(place.title);
              should.exist(placeSaveRes.body.user);
              should.equal(placeSaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the place
                  agent.get('/api/places/' + placeSaveRes.body._id)
                    .expect(200)
                    .end(function (placeInfoErr, placeInfoRes) {
                      // Handle place error
                      if (placeInfoErr) {
                        return done(placeInfoErr);
                      }

                      // Set assertions
                      (placeInfoRes.body._id).should.equal(placeSaveRes.body._id);
                      (placeInfoRes.body.title).should.equal(place.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (placeInfoRes.body.isCurrentUserOwner).should.equal(false);

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
      Place.remove().exec(done);
    });
  });
});
