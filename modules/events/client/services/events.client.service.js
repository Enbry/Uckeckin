(function () {
  'use strict';

  angular
    .module('events.services')
    .factory('EventsService', EventsService);

  EventsService.$inject = ['$resource'];

  function EventsService($resource) {
    var Evt = $resource('api/events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Evt.prototype, {
      createOrUpdate: function () {
        var evt = this;
        return createOrUpdate(evt);
      }
    });

    return Evt;

    function createOrUpdate(evt) {
      if (evt._id) {
        return evt.$update(onSuccess, onError);
      } else {
        return evt.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(evt) {
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
