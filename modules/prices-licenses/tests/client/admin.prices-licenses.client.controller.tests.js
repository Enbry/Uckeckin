(function () {
  'use strict';

  describe('Licenses Prices Admin Controller Tests', function () {
    // Initialize global variables
    var LicensesPricesAdminController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      LicensesPricesService,
      mockLicensePrice;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _LicensePriceService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      LicensesPricesService = _LicensePriceService_;

      // create mock license price
      mockLicensePrice = new LicensesPricesService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'License Price',
        content: 'License Price'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Articles controller.
      LicensesPricesAdminController = $controller('LicensesPricesAdminController as vm', {
        $scope: $scope,
        licensePriceResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleLicensePricePostData;

      beforeEach(function () {
        // Create a sample license price object
        sampleLicensePricePostData = new LicensesPricesService({
          title: 'License Price',
          content: 'License Price'
        });

        $scope.vm.licensePrice = sampleLicensePricePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (LicensesPricesService) {
        // Set POST response
        $httpBackend.expectPOST('api/prices/licenses', sampleLicensePricePostData).respond(mockLicensePrice);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the license price was created
        expect($state.go).toHaveBeenCalledWith('admin.prices-licenses.list');
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/prices/licenses', sampleLicensePricePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock license price in $scope
        $scope.vm.licensePrice = mockLicensePrice;
      });

      it('should update a valid license price', inject(function (LicensesPricesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/prices\/licenses\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('admin.prices-licenses.list');
      }));

      it('should set $scope.vm.error if error', inject(function (LicensesPricesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/prices\/licenses\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup licenses prices
        $scope.vm.licensePrice = mockLicensePrice;
      });

      it('should delete the license price and redirect to licenses prices', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/prices\/licenses\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('admin.prices-licenses.list');
      });

      it('should should not delete the license price and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
