(function () {
  'use strict';

  angular
    .module('prices-beacons.admin')
    .controller('BeaconsPricesAdminListController', BeaconsPricesAdminListController);

  BeaconsPricesAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'beaconPriceResolve', 'Authentication', 'BeaconsPricesService'];

  function BeaconsPricesAdminListController($scope, $window, $state, $filter, beaconPrice, Authentication, BeaconsPricesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.beaconPrice = beaconPrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    BeaconsPricesService.query(function (data) {
      vm.beaconPrice = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.beaconPrice, {
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

    // Remove existing Beacon Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.beaconPrice.$remove(function() {
          $state.go('admin.prices-beacons.list');
        });
      }
    }

    // Save Beacon Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconPriceForm');
        return false;
      }

      // Create a new beacon price, or update the current instance
      vm.beaconPrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
