(function () {
  'use strict';

  describe('Licenses Prices Route Tests', function () {
    // Initialize global variables
    var $scope,
      LicensesPricesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LicensePriceService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LicensesPricesService = _LicensePriceService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.prices-licenses');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/prices/licenses');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('admin.prices-licenses.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/prices-licenses/client/views/admin/list-prices-licenses.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LicensesPricesAdminController,
          mockLicensePrice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.prices-licenses.create');
          $templateCache.put('modules/prices-licenses/client/views/admin/form-price-license.client.view.html', '');

          // Create mock license price
          mockLicensePrice = new LicensesPricesService();

          // Initialize Controller
          LicensesPricesAdminController = $controller('LicensesPricesAdminController as vm', {
            $scope: $scope,
            licensePriceResolve: mockLicensePrice
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.licensePriceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/prices/licenses/create');
        }));

        it('should attach a license price to the controller scope', function () {
          expect($scope.vm.licensePrice._id).toBe(mockLicensePrice._id);
          expect($scope.vm.licensePrice._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/prices-licenses/client/views/admin/form-price-license.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LicensesPricesAdminController,
          mockLicensePrice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.prices-licenses.edit');
          $templateCache.put('modules/prices-licenses/client/views/admin/form-price-license.client.view.html', '');

          // Create mock license price
          mockLicensePrice = new LicensesPricesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'License Price',
            content: 'License Price'
          });

          // Initialize Controller
          LicensesPricesAdminController = $controller('LicensesPricesAdminController as vm', {
            $scope: $scope,
            licensePriceResolve: mockLicensePrice
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:licensePriceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.licensePriceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            licensePriceId: 1
          })).toEqual('/admin/prices/licenses/1/edit');
        }));

        it('should attach an article to the controller scope', function () {
          expect($scope.vm.licensePrice._id).toBe(mockLicensePrice._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/prices-licenses/client/views/admin/form-price-license.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
