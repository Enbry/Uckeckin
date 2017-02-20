(function () {
  'use strict';

  angular
    .module('gains.services')
    .factory('GainsService', GainsService);

  GainsService.$inject = ['$resource'];

  function GainsService($resource) {
    var Gain = $resource('api/gains/:gainId', {
      gainId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Gain.prototype, {
      createOrUpdate: function () {
        var gain = this;
        return createOrUpdate(gain);
      }
    });

    return Gain;

    function createOrUpdate(gain) {
      if (gain._id) {
        return gain.$update(onSuccess, onError);
      } else {
        return gain.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(gain) {
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
