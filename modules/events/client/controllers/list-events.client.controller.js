(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['$scope', '$filter', '$window', '$state', 'evtResolve', 'EventsService', 'Authentication'];

  function EventsListController($scope, $filter, $window, evt, $state, EventsService, Authentication) {

    var vm = this;
    vm.evt = evt;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.error = null;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EventsService.query(function (data) {
      vm.evts = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.evts, {
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


    // Remove existing Event
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet événement?')) {
        vm.evt.$remove(function() {
          $state.go('events.create');
        });
      }
    }
  }
}());
