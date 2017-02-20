(function () {
  'use strict';

  describe('Zones Route Tests', function () {
    // Initialize global variables
    var $scope,
      ZonesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ZonesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ZonesService = _ZonesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('zones');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/zones');
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
          liststate = $state.get('zones.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/zones/client/views/list-zones.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ZonesController,
          mockZone;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('zones.view');
          $templateCache.put('modules/zones/client/views/view-zone.client.view.html', '');

          // create mock zone
          mockZone = new ZonesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'User Zone',
            content: 'User Zone'
          });

          // Initialize Controller
          ZonesController = $controller('ZonesController as vm', {
            $scope: $scope,
            zoneResolve: mockZone
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:zoneId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.zoneResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            zoneId: 1
          })).toEqual('/zones/1');
        }));

        it('should attach a zone to the controller scope', function () {
          expect($scope.vm.zone._id).toBe(mockZone._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/zones/client/views/view-zone.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('zones.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('zones/');
          $rootScope.$digest();

          expect($location.path()).toBe('/zones');
          expect($state.current.templateUrl).toBe('modules/zones/client/views/list-zones.client.view.html');
        }));
      });
    });
  });
}());
