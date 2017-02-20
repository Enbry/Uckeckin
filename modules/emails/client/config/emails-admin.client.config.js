(function () {
  'use strict';

  // Configuring the Emails Admin module
  angular
    .module('emails.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Emails',
      state: 'admin.emails.list'
    });
  }
}());
