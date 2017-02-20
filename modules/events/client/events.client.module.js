'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('events', ['core']);
ApplicationConfiguration.registerModule('events.admin', ['core.admin']);
ApplicationConfiguration.registerModule('events.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('events.routes', ['ui.router', 'core.routes', 'events.services']);
ApplicationConfiguration.registerModule('events.services');
