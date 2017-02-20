'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('licenses', ['core']);
ApplicationConfiguration.registerModule('licenses.admin', ['core.admin']);
ApplicationConfiguration.registerModule('licenses.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('licenses.routes', ['ui.router', 'core.routes', 'licenses.services']);
ApplicationConfiguration.registerModule('licenses.services');
