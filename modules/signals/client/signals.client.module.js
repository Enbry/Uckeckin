'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('signals', ['core']);
ApplicationConfiguration.registerModule('signals.admin', ['core.admin']);
ApplicationConfiguration.registerModule('signals.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('signals.routes', ['ui.router', 'core.routes', 'signals.services']);
ApplicationConfiguration.registerModule('signals.services');
