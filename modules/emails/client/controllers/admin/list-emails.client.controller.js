(function () {
  'use strict';

  angular
  .module('emails.admin')
  .controller('EmailsAdminListController', EmailsAdminListController);

  EmailsAdminListController.$inject = ['$scope', '$filter', '$window', '$state', 'emailResolve', 'Authentication', 'EmailsService'];

  function EmailsAdminListController($scope, $filter, $window, $state, email, Authentication, EmailsService) {
    var vm = this;
    vm.email = email;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Email
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet email?')) {
        vm.email.$remove(function() {
          $state.go('admin.emails.list');
        });
      }
    }

    // Save Email
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailForm');
        return false;
      }

      // Create a new email, or update the current instance
      vm.email.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.emails.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EmailsService.query(function (data) {
      vm.emails = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.emails, {
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
