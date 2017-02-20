(function () {
  'use strict';

  describe('Beacons Prices Route Tests', function () {
    // Initialize global variables
    var $scope,
      BeaconsPricesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BeaconsPricesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BeaconsPricesService = _BeaconsPricesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.prices-beacons');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/prices/beacons');
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
          liststate = $state.get('admin.prices-beacons.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/prices-beacons/client/views/admin/list-prices-beacons.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BeaconsPricesAdminController,
          mockBeaconPrice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.prices-beacons.create');
          $templateCache.put('modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html', '');

          // Create mock beacon price
          mockBeaconPrice = new BeaconsPricesService();

          // Initialize Controller
          BeaconsPricesAdminController = $controller('BeaconsPricesAdminController as vm', {
            $scope: $scope,
            beaconPriceResolve: mockBeaconPrice
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.beaconPriceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/prices/beacons/create');
        }));

        it('should attach a beacon price to the controller scope', function () {
          expect($scope.vm.beaconPrice._id).toBe(mockBeaconPrice._id);
          expect($scope.vm.beaconPrice._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BeaconsPricesAdminController,
          mockBeaconPrice;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.prices-beacons.edit');
          $templateCache.put('modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html', '');

          // Create mock beacon price
          mockBeaconPrice = new BeaconsPricesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'Admin Beacon Price',
            content: 'Admin Beacon Price'
          });

          // Initialize Controller
          BeaconsPricesAdminController = $controller('BeaconsPricesAdminController as vm', {
            $scope: $scope,
            beaconPriceResolve: mockBeaconPrice
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:beaconPriceId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.beaconPriceResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            beaconPriceId: 1
          })).toEqual('/admin/prices/beacons/1/edit');
        }));

        it('should attach a beacon price to the controller scope', function () {
          expect($scope.vm.beaconPrice._id).toBe(mockBeaconPrice._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
