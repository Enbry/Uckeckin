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
describe('License Admin CRUD tests', function () {
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

    // Save a user to the test db and create new license
    user.save(function () {
      license = {
        title: 'License Title',
        content: 'License Content'
      };

      done();
    });
  });

  it('should be able to save a license if logged in', function (done) {
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

        // Save a new license
        agent.post('/api/licenses')
          .send(license)
          .expect(200)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Handle license save error
            if (licenseSaveErr) {
              return done(licenseSaveErr);
            }

            // Get a list of licenses
            agent.get('/api/licenses')
              .end(function (licensesGetErr, licensesGetRes) {
                // Handle license save error
                if (licensesGetErr) {
                  return done(licensesGetErr);
                }

                // Get licenses list
                var licenses = licensesGetRes.body;

                // Set assertions
                (licenses[0].user._id).should.equal(userId);
                (licenses[0].title).should.match('License Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update a license if signed in', function (done) {
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

        // Save a new license
        agent.post('/api/licenses')
          .send(license)
          .expect(200)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Handle license save error
            if (licenseSaveErr) {
              return done(licenseSaveErr);
            }

            // Update license title
            license.title = 'License title';

            // Update an existing license
            agent.put('/api/licenses/' + licenseSaveRes.body._id)
              .send(license)
              .expect(200)
              .end(function (licenseUpdateErr, licenseUpdateRes) {
                // Handle license update error
                if (licenseUpdateErr) {
                  return done(licenseUpdateErr);
                }

                // Set assertions
                (licenseUpdateRes.body._id).should.equal(licenseSaveRes.body._id);
                (licenseUpdateRes.body.title).should.match('License title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save a license if no title is provided', function (done) {
    // Invalidate title field
    license.title = '';

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

        // Save a new license
        agent.post('/api/licenses')
          .send(license)
          .expect(400)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Set message assertion
            (licenseSaveRes.body.message).should.match('Title cannot be blank');

            // Handle license save error
            done(licenseSaveErr);
          });
      });
  });

  it('should be able to delete a license if signed in', function (done) {
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

        // Save a new license
        agent.post('/api/license')
          .send(license)
          .expect(200)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Handle license save error
            if (licenseSaveErr) {
              return done(licenseSaveErr);
            }

            // Delete an existing license
            agent.delete('/api/licenses/' + licenseSaveRes.body._id)
              .send(license)
              .expect(200)
              .end(function (licenseDeleteErr, licenseDeleteRes) {
                // Handle license error error
                if (licenseDeleteErr) {
                  return done(licenseDeleteErr);
                }

                // Set assertions
                (licenseDeleteRes.body._id).should.equal(licenseSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single license if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new license model instance
    license.user = user;
    var licenseObj = new License(license);

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

        // Save a new license
        agent.post('/api/licenses')
          .send(license)
          .expect(200)
          .end(function (licenseSaveErr, licenseSaveRes) {
            // Handle license save error
            if (licenseSaveErr) {
              return done(licenseSaveErr);
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

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (licenseInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
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
