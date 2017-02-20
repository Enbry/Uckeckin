(function () {
  'use strict';

  angular
    .module('stats.services')
    .factory('StatsService', StatsService);

  StatsService.$inject = ['$resource'];

  function StatsService($resource) {
    var Stat = $resource('api/stats/:statId', {
      statId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Stat.prototype, {
      createOrUpdate: function () {
        var stat = this;
        return createOrUpdate(stat);
      }
    });

    return Stat;

    function createOrUpdate(stat) {
      if (stat._id) {
        return stat.$update(onSuccess, onError);
      } else {
        return stat.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(stat) {
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
