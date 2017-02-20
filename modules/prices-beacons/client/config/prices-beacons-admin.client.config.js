(function () {
  'use strict';

  // Configuring the Prices Admin module
  angular
    .module('prices-beacons.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Prix Beacons',
      state: 'admin.prices-beacons.list'
    });
  }
}());
