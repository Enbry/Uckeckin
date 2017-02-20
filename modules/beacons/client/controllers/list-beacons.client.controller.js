(function () {
  'use strict';

  angular
  .module('beacons')
  .controller('BeaconsListController', BeaconsListController);

  BeaconsListController.$inject = ['$scope', '$filter', 'BeaconsService', 'Authentication'];

  function BeaconsListController($scope, $filter, BeaconsService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    BeaconsService.query(function (data) {
      vm.beacons = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.beacons, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }

}());
