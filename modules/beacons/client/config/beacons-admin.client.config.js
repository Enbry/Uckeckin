(function () {
  'use strict';

  // Configuring the Beacons Admin module
  angular
    .module('beacons.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Beacons',
      state: 'admin.beacons.list'
    });
  }
}());
