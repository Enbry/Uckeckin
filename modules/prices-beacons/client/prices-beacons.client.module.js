'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('prices-beacons', ['core']);
ApplicationConfiguration.registerModule('prices-beacons.admin', ['core.admin']);
ApplicationConfiguration.registerModule('prices-beacons.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('prices-beacons.routes', ['ui.router', 'core.routes', 'prices-beacons.services']);
ApplicationConfiguration.registerModule('prices-beacons.services');
