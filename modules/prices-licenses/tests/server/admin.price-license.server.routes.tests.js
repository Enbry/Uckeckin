'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  LicensePrice = mongoose.model('LicensePrice'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  licensePrice;

/**
 * License price routes tests
 */
describe('License Price Admin CRUD tests', function () {
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

    // Save a user to the test db and create new license price
    user.save(function () {
      licensePrice = {
        title: 'License Price Title',
        content: 'License Price Content'
      };

      done();
    });
  });

  it('should be able to save a license price if logged in', function (done) {
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

        // Save a new license price
        agent.post('/api/prices/licenses')
          .send(licensePrice)
          .expect(200)
          .end(function (licensePriceSaveErr, licensePriceSaveRes) {
            // Handle license price save error
            if (licensePriceSaveErr) {
              return done(licensePriceSaveErr);
            }

            // Get a list of licenses prices
            agent.get('/api/prices/licenses')
              .end(function (licensePricesGetErr, licensePricesGetRes) {
                // Handle license price save error
                if (licensePricesGetErr) {
                  return done(licensePricesGetErr);
                }

                // Get licenses prices list
                var licensePrices = licensePricesGetRes.body;

                // Set assertions
                (licensePrices[0].user._id).should.equal(userId);
                (licensePrices[0].title).should.match('License Price Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update a license price if signed in', function (done) {
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

        // Save a new license price
        agent.post('/api/prices/licenses')
          .send(licensePrice)
          .expect(200)
          .end(function (licensePriceSaveErr, licensePriceSaveRes) {
            // Handle license price save error
            if (licensePriceSaveErr) {
              return done(licensePriceSaveErr);
            }

            // Update license price title
            licensePrice.title = 'License Price updated title';

            // Update an existing license price
            agent.put('/api/prices/licenses' + licensePriceSaveRes.body._id)
              .send(licensePrice)
              .expect(200)
              .end(function (licensePriceUpdateErr, licensePriceUpdateRes) {
                // Handle license price update error
                if (licensePriceUpdateErr) {
                  return done(licensePriceUpdateErr);
                }

                // Set assertions
                (licensePriceUpdateRes.body._id).should.equal(licensePriceSaveRes.body._id);
                (licensePriceUpdateRes.body.title).should.match('License Price updated title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a license price if no title is provided', function (done) {
    // Invalidate title field
    licensePrice.title = '';

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

        // Save a new article
        agent.post('/api/prices/licenses')
          .send(licensePrice)
          .expect(400)
          .end(function (licensePriceSaveErr, licensePriceSaveRes) {
            // Set message assertion
            (licensePriceSaveRes.body.message).should.match('Title cannot be blank');

            // Handle license price save error
            done(licensePriceSaveErr);
          });
      });
  });

  it('should be able to delete a license price if signed in', function (done) {
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

        // Save a new article
        agent.post('/api/prices/licenses')
          .send(licensePrice)
          .expect(200)
          .end(function (licensePriceSaveErr, licensePriceSaveRes) {
            // Handle license price save error
            if (licensePriceSaveErr) {
              return done(licensePriceSaveErr);
            }

            // Delete an existing license price
            agent.delete('/api/prices/licenses/' + licensePriceSaveRes.body._id)
              .send(licensePrice)
              .expect(200)
              .end(function (licensePriceDeleteErr, licensePriceDeleteRes) {
                // Handle license price error error
                if (licensePriceDeleteErr) {
                  return done(licensePriceDeleteErr);
                }

                // Set assertions
                (licensePriceDeleteRes.body._id).should.equal(licensePriceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single license price if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new article model instance
    licensePrice.user = user;
    var licensePriceObj = new LicensePrice(licensePrice);

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

        // Save a new license price
        agent.post('/api/prices/licenses')
          .send(licensePrice)
          .expect(200)
          .end(function (licensePriceSaveErr, licensePriceSaveRes) {
            // Handle license price save error
            if (licensePriceSaveErr) {
              return done(licensePriceSaveErr);
            }

            // Get the article
            agent.get('/api/prices/licenses/' + licensePriceSaveRes.body._id)
              .expect(200)
              .end(function (licensePriceInfoErr, licensePriceInfoRes) {
                // Handle license price error
                if (licensePriceInfoErr) {
                  return done(licensePriceInfoErr);
                }

                // Set assertions
                (licensePriceInfoRes.body._id).should.equal(licensePriceSaveRes.body._id);
                (licensePriceInfoRes.body.title).should.equal(licensePrice.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (licensePriceInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      LicensePrice.remove().exec(done);
    });
  });
});
