(function () {
  'use strict';

  angular
    .module('licenses.services')
    .factory('LicensesService', LicensesService);

  LicensesService.$inject = ['$resource'];

  function LicensesService($resource) {
    var License = $resource('api/licenses/:licenseId', {
      licenseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(License.prototype, {
      createOrUpdate: function () {
        var license = this;
        return createOrUpdate(license);
      }
    });

    return License;

    function createOrUpdate(license) {
      if (license._id) {
        return license.$update(onSuccess, onError);
      } else {
        return license.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(license) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
