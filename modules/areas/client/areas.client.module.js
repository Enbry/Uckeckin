'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('areas', ['core']);
ApplicationConfiguration.registerModule('areas.admin', ['core.admin']);
ApplicationConfiguration.registerModule('areas.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('areas.routes', ['ui.router', 'core.routes', 'areas.services']);
ApplicationConfiguration.registerModule('areas.services');
