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
          mainstate = $state.get('beacons');
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
          liststate = $state.get('beacons.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/beacons/client/views/list-beacons.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          BeaconsController,
          mockBeacon;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('beacons.view');
          $templateCache.put('modules/beacons/client/views/view-beacon.client.view.html', '');

          // create mock beacon
          mockBeacon = new BeaconsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'User beacon',
            content: 'User beacon'
          });

          // Initialize Controller
          BeaconsController = $controller('BeaconsController as vm', {
            $scope: $scope,
            beaconResolve: mockBeacon
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:beaconId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.beaconResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            beaconId: 1
          })).toEqual('/beacons/1');
        }));

        it('should attach a beacon to the controller scope', function () {
          expect($scope.vm.beacon._id).toBe(mockBeacon._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/beacons/client/views/view-beacon.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('beacons.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('beacons/');
          $rootScope.$digest();

          expect($location.path()).toBe('/beacons');
          expect($state.current.templateUrl).toBe('modules/beacons/client/views/list-beacons.client.view.html');
        }));
      });
    });
  });
}());
