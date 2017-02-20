(function () {
  'use strict';

  describe('Beacons Route Tests', function () {
    // Initialize global variables
    var $scope,
      BeaconsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BeaconsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BeaconsService = _BeaconsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('admin.beacons');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/beacons');
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
          liststate = $state.get('admin.beacons.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/beacons/client/views/admin/list-beacons.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BeaconsAdminController,
          mockBeacon;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.beacons.create');
          $templateCache.put('modules/beacons/client/views/admin/form-beacon.client.view.html', '');

          // Create mock beacon
          mockBeacon = new BeaconsService();

          // Initialize Controller
          BeaconsAdminController = $controller('BeaconsAdminController as vm', {
            $scope: $scope,
            beaconResolve: mockBeacon
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.beaconResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/beacons/create');
        }));

        it('should attach a beacon to the controller scope', function () {
          expect($scope.vm.beacon._id).toBe(mockBeacon._id);
          expect($scope.vm.beacon._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/beacons/client/views/admin/form-beacon.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BeaconsAdminController,
          mockBeacon;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.beacons.edit');
          $templateCache.put('modules/beacons/client/views/admin/form-beacon.client.view.html', '');

          // Create mock beacon
          mockBeacon = new BeaconsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'Admin beacons',
            content: 'Beacons'
          });

          // Initialize Controller
          BeaconsAdminController = $controller('BeaconsAdminController as vm', {
            $scope: $scope,
            beaconResolve: mockBeacon
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:beaconId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.beaconResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            beaconId: 1
          })).toEqual('/admin/beacons/1/edit');
        }));

        it('should attach a beacon to the controller scope', function () {
          expect($scope.vm.beacon._id).toBe(mockBeacon._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/beacons/client/views/admin/form-beacon.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
