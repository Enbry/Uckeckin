(function () {
  'use strict';

  angular
    .module('zones')
    .controller('ZonesListController', ZonesListController);

  ZonesListController.$inject = ['$scope', '$filter', 'ZonesService', 'AreasService', 'Authentication'];

  function ZonesListController($scope, $filter, ZonesService, AreasService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    ZonesService.query(function (data) {
      vm.zones = data;
      vm.buildPager();
    });

    AreasService.query(function (datas) {
      vm.areas = datas;
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<datas.length;i++) {
        tObj.push(datas[i].user._id);
      }
      for(var j=0; j<tObj.length; j++){
        if(tObj[j] === vm.authentication.user._id){
          x1 = 1;
        }
        else{
          x1 = 0;
        }
        xObj.push(x1);
      }
      vm.hasArea = xObj.includes(1);
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.zones, {
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
