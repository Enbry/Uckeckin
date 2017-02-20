'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('zones', ['core']);
ApplicationConfiguration.registerModule('zones.admin', ['core.admin']);
ApplicationConfiguration.registerModule('zones.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('zones.routes', ['ui.router', 'core.routes', 'zones.services']);
ApplicationConfiguration.registerModule('zones.services');
