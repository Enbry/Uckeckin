(function () {
  'use strict';

  describe('Beacons Prices Admin Controller Tests', function () {
    // Initialize global variables
    var BeaconsPricesAdminController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      BeaconsPricesService,
      mockBeaconPrice;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _BeaconsPricesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      BeaconsPricesService = _BeaconsPricesService_;

      // create mock beacon price
      mockBeaconPrice = new BeaconsPricesService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'Admin Beacon Price',
        content: 'Admin Beacon Price'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Beacons Prices controller.
      BeaconsPricesAdminController = $controller('BeaconsPricesAdminController as vm', {
        $scope: $scope,
        beaconPriceResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleBeaconPricePostData;

      beforeEach(function () {
        // Create a sample beacon price object
        sampleBeaconPricePostData = new BeaconsPricesService({
          title: 'Admin beacon price',
          content: 'Admin beacon price'
        });

        $scope.vm.beaconPrice = sampleBeaconPricePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (BeaconsPricesService) {
        // Set POST response
        $httpBackend.expectPOST('api/prices/beacons', sampleBeaconPricePostData).respond(mockBeaconPrice);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the beacon price was created
        expect($state.go).toHaveBeenCalledWith('admin.prices-beacons.list');
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/prices/beacons', sampleBeaconPricePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock beacon price in $scope
        $scope.vm.beaconPrice = mockBeaconPrice;
      });

      it('should update a valid beacon price', inject(function (BeaconsPricesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/prices\/beacons\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('admin.prices-beacons.list');
      }));

      it('should set $scope.vm.error if error', inject(function (BeaconsPricesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/prices\/beacons\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup beacons prices
        $scope.vm.beaconPrice = mockBeaconPrice;
      });

      it('should delete the beacon price and redirect to beacons prices', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/prices\/beacons\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('admin.prices-beacons.list');
      });

      it('should should not delete the beacon price and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
