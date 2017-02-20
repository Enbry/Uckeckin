'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('gains', ['core']);
ApplicationConfiguration.registerModule('gains.admin', ['core.admin']);
ApplicationConfiguration.registerModule('gains.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('gains.routes', ['ui.router', 'core.routes', 'gains.services']);
ApplicationConfiguration.registerModule('gains.services');
