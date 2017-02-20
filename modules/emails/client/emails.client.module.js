'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('emails', ['core']);
ApplicationConfiguration.registerModule('emails.admin', ['core.admin']);
ApplicationConfiguration.registerModule('emails.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('emails.routes', ['ui.router', 'core.routes', 'emails.services']);
ApplicationConfiguration.registerModule('emails.services');
