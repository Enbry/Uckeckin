(function () {
  'use strict';

  angular
    .module('gains')
    .controller('GainsListController', GainsListController);

  GainsListController.$inject = ['$scope', '$filter', '$window', '$state', 'gainResolve', 'GainsService', 'Authentication'];

  function GainsListController($scope, $filter, $window, gain, $state, GainsService, Authentication) {

    var vm = this;
    vm.gain = gain;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.error = null;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    GainsService.query(function (data) {
      vm.gains = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.gains, {
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

    // Remove existing Gain
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce contenu?')) {
        vm.gain.$remove(function() {
          $state.go('gains.create');
        });
      }
    }
  }
}());
