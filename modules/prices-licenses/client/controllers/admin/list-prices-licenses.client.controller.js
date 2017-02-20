(function () {
  'use strict';

  angular
    .module('prices-licenses.admin')
    .controller('LicensesPricesAdminListController', LicensesPricesAdminListController);

  LicensesPricesAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'licensePriceResolve', 'Authentication', 'LicensesPricesService'];

  function LicensesPricesAdminListController($scope, $window, $state, $filter, licensePrice, Authentication, LicensesPricesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.licensePrice = licensePrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    LicensesPricesService.query(function (data) {
      vm.licensePrice = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.licensePrice, {
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

    // Remove existing License Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.licensePrice.$remove(function() {
          $state.go('admin.prices-licenses.list');
        });
      }
    }

    // Save License Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licensePriceForm');
        return false;
      }

      // Create a new license price, or update the current instance
      vm.licensePrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
