(function () {
  'use strict';

  describe('Licenses Route Tests', function () {
    // Initialize global variables
    var $scope,
      LicensesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _LicensesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      LicensesService = _LicensesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('licenses');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/licenses');
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
          liststate = $state.get('licenses.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/licenses/client/views/list-licenses.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          LicensesController,
          mockLicense;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('licenses.view');
          $templateCache.put('modules/licenses/client/views/view-license.client.view.html', '');

          // create mock license
          mockLicense = new LicensesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'User Licenses',
            content: 'User Licenses'
          });

          // Initialize Controller
          LicensesController = $controller('LicensesController as vm', {
            $scope: $scope,
            licenseResolve: mockLicense
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:licenseId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.licenseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            licenseId: 1
          })).toEqual('/licenses/1');
        }));

        it('should attach a license to the controller scope', function () {
          expect($scope.vm.license._id).toBe(mockLicense._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/licenses/client/views/view-license.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope) {
          $state.go('licenses.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('licenses/');
          $rootScope.$digest();

          expect($location.path()).toBe('/licenses');
          expect($state.current.templateUrl).toBe('modules/licenses/client/views/list-licenses.client.view.html');
        }));
      });
    });
  });
}());
