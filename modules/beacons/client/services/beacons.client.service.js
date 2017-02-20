(function () {
  'use strict';

  angular
    .module('beacons.services')
    .factory('BeaconsService', BeaconsService);

  BeaconsService.$inject = ['$resource'];

  function BeaconsService($resource) {
    var Beacon = $resource('api/beacons/:beaconId', {
      beaconId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Beacon.prototype, {
      createOrUpdate: function () {
        var beacon = this;
        return createOrUpdate(beacon);
      }
    });

    return Beacon;

    function createOrUpdate(beacon) {
      if (beacon._id) {
        return beacon.$update(onSuccess, onError);
      } else {
        return beacon.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(beacon) {
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
