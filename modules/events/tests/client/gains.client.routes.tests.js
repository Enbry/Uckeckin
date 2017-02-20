(function () {
  'use strict';

  describe('Gains Route Tests', function () {
    // Initialize global variables
    var $scope,
      GainsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _GainsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      GainsService = _GainsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('gains');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/gains');
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
          liststate = $state.get('gains.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/gains/client/views/list-gains.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          GainsController,
          mockGain;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('gains.view');
          $templateCache.put('modules/gains/client/views/view-gain.client.view.html', '');

          // create mock gain
          mockGain = new GainsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'User gain',
            content: 'User gain'
          });

          // Initialize Controller
          GainsController = $controller('GainsController as vm', {
            $scope: $scope,
            gainResolve: mockGain
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:gainId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.gainResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            gainId: 1
          })).toEqual('/gains/1');
        }));

        it('should attach a gain to the controller scope', function () {
          expect($scope.vm.gain._id).toBe(mockGain._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/gains/client/views/view-gain.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('gains.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('gains/');
          $rootScope.$digest();

          expect($location.path()).toBe('/gains');
          expect($state.current.templateUrl).toBe('modules/gains/client/views/list-gains.client.view.html');
        }));
      });
    });
  });
}());
