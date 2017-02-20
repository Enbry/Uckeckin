'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('prices-licenses', ['core']);
ApplicationConfiguration.registerModule('prices-licenses.admin', ['core.admin']);
ApplicationConfiguration.registerModule('prices-licenses.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('prices-licenses.routes', ['ui.router', 'core.routes', 'prices-licenses.services']);
ApplicationConfiguration.registerModule('prices-licenses.services');
