'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('beacons', ['core']);
ApplicationConfiguration.registerModule('beacons.admin', ['core.admin']);
ApplicationConfiguration.registerModule('beacons.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('beacons.routes', ['ui.router', 'core.routes', 'beacons.services']);
ApplicationConfiguration.registerModule('beacons.services');
