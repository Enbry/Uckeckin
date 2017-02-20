'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  BeaconPrice = mongoose.model('BeaconPrice'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  beaconPrice;

/**
 * Beacon Price routes tests
 */
describe('Beacon Price Admin CRUD tests', function () {
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

    // Save a user to the test db and create new beacon price
    user.save(function () {
      beaconPrice = {
        title: 'Beacon Price Title',
        content: 'Beacon Price Content'
      };

      done();
    });
  });

  it('should be able to save a beacon price if logged in', function (done) {
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

        // Save a new beacon price
        agent.post('/api/prices/beacons')
          .send(beaconPrice)
          .expect(200)
          .end(function (beaconPriceSaveErr, beaconPriceSaveRes) {
            // Handle beacon price save error
            if (beaconPriceSaveErr) {
              return done(beaconPriceSaveErr);
            }

            // Get a list of beacons prices
            agent.get('/api/prices/beacons')
              .end(function (beaconsPricesGetErr, beaconsPricesGetRes) {
                // Handle beacon price save error
                if (beaconsPricesGetErr) {
                  return done(beaconsPricesGetErr);
                }

                // Get beacons prices list
                var beaconsPrices = beaconsPricesGetRes.body;

                // Set assertions
                (beaconsPrices[0].user._id).should.equal(userId);
                (beaconsPrices[0].title).should.match('Beacon Price Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update a beacon price if signed in', function (done) {
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

        // Save a new beacon price
        agent.post('/api/prices/beacons')
          .send(beaconPrice)
          .expect(200)
          .end(function (beaconPriceSaveErr, beaconPriceSaveRes) {
            // Handle beacon price save error
            if (beaconPriceSaveErr) {
              return done(beaconPriceSaveErr);
            }

            // Update beacon price title
            beaconPrice.title = 'Beacon Price updated title';

            // Update an existing beacon price
            agent.put('/api/prices/beacons/' + beaconPriceSaveRes.body._id)
              .send(beaconPrice)
              .expect(200)
              .end(function (beaconPriceUpdateErr, beaconPriceUpdateRes) {
                // Handle beacon price update error
                if (beaconPriceUpdateErr) {
                  return done(beaconPriceUpdateErr);
                }

                // Set assertions
                (beaconPriceUpdateRes.body._id).should.equal(beaconPriceSaveRes.body._id);
                (beaconPriceUpdateRes.body.title).should.match('Beacon Price updated title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a beacon price if no title is provided', function (done) {
    // Invalidate title field
    beaconPrice.title = '';

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

        // Save a new beacon price
        agent.post('/api/prices/beacons')
          .send(beaconPrice)
          .expect(400)
          .end(function (beaconPriceSaveErr, beaconPriceSaveRes) {
            // Set message assertion
            (beaconPriceSaveRes.body.message).should.match('Title cannot be blank');

            // Handle beacon price save error
            done(beaconPriceSaveErr);
          });
      });
  });

  it('should be able to delete a beacon price if signed in', function (done) {
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

        // Save a new beacon price
        agent.post('/api/prices/beacons')
          .send(beaconPrice)
          .expect(200)
          .end(function (beaconPriceSaveErr, beaconPriceSaveRes) {
            // Handle beacon price save error
            if (beaconPriceSaveErr) {
              return done(beaconPriceSaveErr);
            }

            // Delete an existing beacon price
            agent.delete('/api/prices/beacons/' + beaconPriceSaveRes.body._id)
              .send(beaconPrice)
              .expect(200)
              .end(function (beaconPriceDeleteErr, beaconPriceDeleteRes) {
                // Handle beacon price error error
                if (beaconPriceDeleteErr) {
                  return done(beaconPriceDeleteErr);
                }

                // Set assertions
                (beaconPriceDeleteRes.body._id).should.equal(beaconPriceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single beacon price if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new beacon price model instance
    beaconPrice.user = user;
    var beaconPriceObj = new BeaconPrice(beaconPrice);

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

        // Save a new beacon price
        agent.post('/api/prices/beacons')
          .send(beaconPrice)
          .expect(200)
          .end(function (beaconPriceSaveErr, beaconPriceSaveRes) {
            // Handle beacon price save error
            if (beaconPriceSaveErr) {
              return done(beaconPriceSaveErr);
            }

            // Get the beacon price
            agent.get('/api/prices/beacons/' + beaconPriceSaveRes.body._id)
              .expect(200)
              .end(function (beaconPriceInfoErr, beaconPriceInfoRes) {
                // Handle beacon price error
                if (beaconPriceInfoErr) {
                  return done(beaconPriceInfoErr);
                }

                // Set assertions
                (beaconPriceInfoRes.body._id).should.equal(beaconPriceSaveRes.body._id);
                (beaconPriceInfoRes.body.title).should.equal(beaconPrice.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (beaconPriceInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      BeaconPrice.remove().exec(done);
    });
  });
});
