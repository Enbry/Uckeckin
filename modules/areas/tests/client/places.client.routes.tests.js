(function () {
  'use strict';

  describe('Places Route Tests', function () {
    // Initialize global variables
    var $scope,
      PlacesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PlacesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PlacesService = _PlacesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('places');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/places');
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
          liststate = $state.get('places.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/places/client/views/list-places.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PlacesController,
          mockPlace;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('places.view');
          $templateCache.put('modules/places/client/views/view-place.client.view.html', '');

          // create mock place
          mockPlace = new PlacesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'User Place',
            content: 'User Place'
          });

          // Initialize Controller
          PlacesController = $controller('PlacesController as vm', {
            $scope: $scope,
            placeResolve: mockPlace
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:placeId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.placeResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            placeId: 1
          })).toEqual('/places/1');
        }));

        it('should attach a place to the controller scope', function () {
          expect($scope.vm.place._id).toBe(mockPlace._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/places/client/views/view-place.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('places.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('places/');
          $rootScope.$digest();

          expect($location.path()).toBe('/places');
          expect($state.current.templateUrl).toBe('modules/places/client/views/list-places.client.view.html');
        }));
      });
    });
  });
}());
