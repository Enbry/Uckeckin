(function () {
  'use strict';

  angular
    .module('licenses')
    .controller('LicensesListController', LicensesListController);

  LicensesListController.$inject = ['$scope', '$filter', 'LicensesService', 'AreasService', 'ZonesService', 'Authentication'];

  function LicensesListController($scope, $filter, LicensesService, AreasService, ZonesService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    LicensesService.query(function (data) {
      vm.licenses = data;
      vm.buildPager();
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<data.length;i++) {
        tObj.push(data[i].user._id);
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
      vm.hasLicense = xObj.includes(1);
    });

    AreasService.query(function (data) {
      vm.areas = data;
      vm.buildPager();
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<data.length;i++) {
        tObj.push(data[i].user._id);
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

    ZonesService.query(function (data) {
      vm.zones = data;
      vm.buildPager();
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<data.length;i++) {
        tObj.push(data[i].user._id);
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
      vm.hasZone = xObj.includes(1);
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.licenses, {
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
