(function () {
  'use strict';

  angular
    .module('prices-beacons.services')
    .factory('BeaconsPricesService', BeaconsPricesService);

  BeaconsPricesService.$inject = ['$resource'];

  function BeaconsPricesService($resource) {
    var BeaconPrice = $resource('api/prices/beacons/:beaconPriceId', {
      beaconPriceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(BeaconPrice.prototype, {
      createOrUpdate: function () {
        var beaconPrice = this;
        return createOrUpdate(beaconPrice);
      }
    });

    return BeaconPrice;

    function createOrUpdate(beaconPrice) {
      if (beaconPrice._id) {
        return beaconPrice.$update(onSuccess, onError);
      } else {
        return beaconPrice.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(beaconPrice) {
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
