(function () {
  'use strict';

  // Configuring the Prices Admin module
  angular
    .module('prices-licenses.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Prix Licences',
      state: 'admin.prices-licenses.list'
    });
  }
}());
