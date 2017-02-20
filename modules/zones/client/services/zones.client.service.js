(function () {
  'use strict';

  angular
    .module('zones.services')
    .factory('ZonesService', ZonesService);

  ZonesService.$inject = ['$resource'];

  function ZonesService($resource) {
    var Zone = $resource('api/zones/:zoneId', {
      zoneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Zone.prototype, {
      createOrUpdate: function () {
        var zone = this;
        return createOrUpdate(zone);
      }
    });

    return Zone;

    function createOrUpdate(zone) {
      if (zone._id) {
        return zone.$update(onSuccess, onError);
      } else {
        return zone.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(zone) {
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
