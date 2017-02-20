(function () {
  'use strict';

  describe('Places List Controller Tests', function () {
    // Initialize global variables
    var PlacesListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      PlacesService,
      mockPlace;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _PlacesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      PlacesService = _PlacesService_;

      // create mock place
      mockPlace = new PlacesService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'User Place',
        content: 'User Place'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Places List controller.
      PlacesListController = $controller('PlacesListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockPlaceList;

      beforeEach(function () {
        mockPlaceList = [mockPlace, mockPlace];
      });

      it('should send a GET request and return all places', inject(function (PlacesService) {
        // Set POST response
        $httpBackend.expectGET('api/places').respond(mockPlaceList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.places.length).toEqual(2);
        expect($scope.vm.places[0]).toEqual(mockPlace);
        expect($scope.vm.places[1]).toEqual(mockPlace);

      }));
    });
  });
}());
