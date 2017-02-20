(function () {
  'use strict';

  // Configuring the Licenses Admin module
  angular
    .module('licenses.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Licenses',
      state: 'admin.licenses.list'
    });
  }
}());
