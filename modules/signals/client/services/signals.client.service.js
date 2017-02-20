(function () {
  'use strict';

  angular
    .module('signals.services')
    .factory('SignalsService', SignalsService);

  SignalsService.$inject = ['$resource'];

  function SignalsService($resource) {
    var Signal = $resource('api/signals/:signalId', {
      signalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Signal.prototype, {
      createOrUpdate: function () {
        var signal = this;
        return createOrUpdate(signal);
      }
    });

    return Signal;

    function createOrUpdate(signal) {
      if (signal._id) {
        return signal.$update(onSuccess, onError);
      } else {
        return signal.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(signal) {
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
