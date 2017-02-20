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
          mainstate = $state.get('admin.licenses');
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
          liststate = $state.get('admin.licenses.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('modules/licenses/client/views/admin/list-licenses.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          LicensesAdminController,
          mockLicense;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.licenses.create');
          $templateCache.put('modules/licenses/client/views/admin/form-license.client.view.html', '');

          // Create mock license
          mockLicense = new LicensesService();

          // Initialize Controller
          LicensesAdminController = $controller('LicensesAdminController as vm', {
            $scope: $scope,
            licenseResolve: mockLicense
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.licenseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/licenses/create');
        }));

        it('should attach a license to the controller scope', function () {
          expect($scope.vm.license._id).toBe(mockLicense._id);
          expect($scope.vm.license._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/licenses/client/views/admin/form-license.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          LicensesAdminController,
          mockLicense;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.licenses.edit');
          $templateCache.put('modules/licenses/client/views/admin/form-license.client.view.html', '');

          // Create mock license
          mockLicense = new LicensesService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'Admin Licenses',
            content: 'Admin Licenses'
          });

          // Initialize Controller
          LicensesAdminController = $controller('LicensesAdminController as vm', {
            $scope: $scope,
            licenseResolve: mockLicense
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:licenseId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.licenseResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            licenseId: 1
          })).toEqual('/admin/licenses/1/edit');
        }));

        it('should attach a license to the controller scope', function () {
          expect($scope.vm.license._id).toBe(mockLicense._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/licenses/client/views/admin/form-license.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
