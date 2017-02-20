'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('stats', ['core']);
ApplicationConfiguration.registerModule('stats.admin', ['core.admin']);
ApplicationConfiguration.registerModule('stats.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('stats.routes', ['ui.router', 'core.routes', 'stats.services']);
ApplicationConfiguration.registerModule('stats.services');
