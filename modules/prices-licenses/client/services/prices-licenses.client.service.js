(function () {
  'use strict';

  angular
    .module('prices-licenses.services')
    .factory('LicensesPricesService', LicensesPricesService);

  LicensesPricesService.$inject = ['$resource'];

  function LicensesPricesService($resource) {
    var LicensePrice = $resource('api/prices/licenses/:licensePriceId', {
      licensePriceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(LicensePrice.prototype, {
      createOrUpdate: function () {
        var licensePrice = this;
        return createOrUpdate(licensePrice);
      }
    });

    return LicensePrice;

    function createOrUpdate(licensePrice) {
      if (licensePrice._id) {
        return licensePrice.$update(onSuccess, onError);
      } else {
        return licensePrice.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(licensePrice) {
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
