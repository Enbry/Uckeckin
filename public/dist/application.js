(function (window) {
  'use strict';

  var applicationModuleName = 'mean';

  var service = {
    applicationEnvironment: window.env,
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: [
      'ngResource',
      'ngAnimate',
      'ngSanitize',
      'ngMessages',
      'ui.router',
      'ui.bootstrap',
      'ui.utils',
      'angularFileUpload',
      'NgSwitchery',
      'ui.select2',
      //'ngTagsInput',
      'ngAudio',
      'moment-picker',
      'ngMap',
      'ui.footable',
      'angularUtils.directives.dirPagination',
      'ngMaterial',
      'ngMessages',
      'material.svgAssetsCache'
    ],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }
}(window));

(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  function bootstrapConfig($compileProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');

    // Disable debug data for production environment
    // @link https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
  }

  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider'];

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('areas', ['core']);
ApplicationConfiguration.registerModule('areas.admin', ['core.admin']);
ApplicationConfiguration.registerModule('areas.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('areas.routes', ['ui.router', 'core.routes', 'areas.services']);
ApplicationConfiguration.registerModule('areas.services');

'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('beacons', ['core']);
ApplicationConfiguration.registerModule('beacons.admin', ['core.admin']);
ApplicationConfiguration.registerModule('beacons.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('beacons.routes', ['ui.router', 'core.routes', 'beacons.services']);
ApplicationConfiguration.registerModule('beacons.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('bills', ['core']);

(function (app) {
  'use strict';

  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core']);
  app.registerModule('core.admin.routes', ['ui.router']);
}(ApplicationConfiguration));

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('emails', ['core']);
ApplicationConfiguration.registerModule('emails.admin', ['core.admin']);
ApplicationConfiguration.registerModule('emails.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('emails.routes', ['ui.router', 'core.routes', 'emails.services']);
ApplicationConfiguration.registerModule('emails.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('events', ['core']);
ApplicationConfiguration.registerModule('events.admin', ['core.admin']);
ApplicationConfiguration.registerModule('events.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('events.routes', ['ui.router', 'core.routes', 'events.services']);
ApplicationConfiguration.registerModule('events.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('gains', ['core']);
ApplicationConfiguration.registerModule('gains.admin', ['core.admin']);
ApplicationConfiguration.registerModule('gains.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('gains.routes', ['ui.router', 'core.routes', 'gains.services']);
ApplicationConfiguration.registerModule('gains.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('licenses', ['core']);
ApplicationConfiguration.registerModule('licenses.admin', ['core.admin']);
ApplicationConfiguration.registerModule('licenses.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('licenses.routes', ['ui.router', 'core.routes', 'licenses.services']);
ApplicationConfiguration.registerModule('licenses.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('prices-beacons', ['core']);
ApplicationConfiguration.registerModule('prices-beacons.admin', ['core.admin']);
ApplicationConfiguration.registerModule('prices-beacons.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('prices-beacons.routes', ['ui.router', 'core.routes', 'prices-beacons.services']);
ApplicationConfiguration.registerModule('prices-beacons.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('prices-licenses', ['core']);
ApplicationConfiguration.registerModule('prices-licenses.admin', ['core.admin']);
ApplicationConfiguration.registerModule('prices-licenses.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('prices-licenses.routes', ['ui.router', 'core.routes', 'prices-licenses.services']);
ApplicationConfiguration.registerModule('prices-licenses.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('signals', ['core']);
ApplicationConfiguration.registerModule('signals.admin', ['core.admin']);
ApplicationConfiguration.registerModule('signals.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('signals.routes', ['ui.router', 'core.routes', 'signals.services']);
ApplicationConfiguration.registerModule('signals.services');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('stats', ['core']);
ApplicationConfiguration.registerModule('stats.admin', ['core.admin']);
ApplicationConfiguration.registerModule('stats.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('stats.routes', ['ui.router', 'core.routes', 'stats.services']);
ApplicationConfiguration.registerModule('stats.services');

(function (app) {
  'use strict';

  app.registerModule('users');
  app.registerModule('users.admin');
  app.registerModule('users.admin.routes', ['ui.router', 'core.routes', 'users.admin.services']);
  app.registerModule('users.admin.services');
  app.registerModule('users.routes', ['ui.router', 'core.routes']);
  app.registerModule('users.services');
}(ApplicationConfiguration));

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('zones', ['core']);
ApplicationConfiguration.registerModule('zones.admin', ['core.admin']);
ApplicationConfiguration.registerModule('zones.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('zones.routes', ['ui.router', 'core.routes', 'zones.services']);
ApplicationConfiguration.registerModule('zones.services');

(function () {
  'use strict';

  angular
    .module('areas.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('areas', {
        abstract: true,
        url: '/areas',
        template: '<ui-view/>'
      })
      .state('areas.list', {
        url: '',
        templateUrl: 'modules/areas/client/views/list-areas.client.view.html',
        controller: 'AreasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Lieux'
        }
      })
      .state('areas.create', {
        url: '/create',
        templateUrl: 'modules/areas/client/views/form-area.client.view.html',
        controller: 'AreasController',
        controllerAs: 'vm',
        resolve: {
          areaResolve: newArea
        }
      })
      .state('areas.edit', {
        url: '/:areaId/edit',
        templateUrl: 'modules/areas/client/views/form-area.client.view.html',
        controller: 'AreasController',
        controllerAs: 'vm',
        resolve: {
          areaResolve: getArea
        }
      });
  }

  getArea.$inject = ['$stateParams', 'AreasService'];

  function getArea($stateParams, AreasService) {
    return AreasService.get({
      areaId: $stateParams.areaId
    }).$promise;
  }

  newArea.$inject = ['AreasService'];

  function newArea(AreasService) {
    return new AreasService();
  }
}());

(function () {
  'use strict';

  angular
    .module('areas')
    .controller('AreasController', AreasController);

  AreasController.$inject = ['$scope', '$state', '$window', 'ZonesService', 'areaResolve', 'Authentication', 'NgMap'];

  function AreasController($scope, $state, $window, ZonesService, area, Authentication, NgMap) {
    var vm = this;

    vm.area = area;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    ZonesService.query(function (data) {
      vm.zones = data;
    });

    // Add Place address
    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.area.placeLat = vm.place.geometry.location.lat();
      vm.area.placeLng = vm.place.geometry.location.lng();
      vm.map.setCenter(vm.place.geometry.location);
    };
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    // Remove existing Place
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce lieu?')) {
        vm.area.$remove(function() {
          $state.go('areas.list');
        });
      }
    }

    // Save Place
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.areaForm');
        return false;
      }

      // Create a new place, or update the current instance
      vm.area.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('areas.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }
}());

(function () {
  'use strict';

  angular
    .module('areas')
    .controller('AreasListController', AreasListController);

  AreasListController.$inject = ['$scope', '$filter', 'AreasService', 'Authentication'];

  function AreasListController($scope, $filter, AreasService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    AreasService.query(function (data) {
      vm.areas = data;
      console.log(data);
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.areas, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('areas.services')
    .factory('AreasService', AreasService);

  AreasService.$inject = ['$resource'];

  function AreasService($resource) {
    var Area = $resource('api/areas/:areaId', {
      areaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Area.prototype, {
      createOrUpdate: function () {
        var area = this;
        return createOrUpdate(area);
      }
    });

    return Area;

    function createOrUpdate(area) {
      if (area._id) {
        return area.$update(onSuccess, onError);
      } else {
        return area.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(area) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Beacons Admin module
  angular
    .module('beacons.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Beacons',
      state: 'admin.beacons.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('beacons.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.beacons', {
        abstract: true,
        url: '/beacons',
        template: '<ui-view/>'
      })
      .state('admin.beacons.list', {
        url: '',
        templateUrl: 'modules/beacons/client/views/admin/list-beacons.client.view.html',
        controller: 'BeaconsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconResolve: newBeacon
        }
      })
      .state('admin.beacons.create', {
        url: '/create',
        templateUrl: 'modules/beacons/client/views/admin/form-beacon.client.view.html',
        controller: 'BeaconsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconResolve: newBeacon
        }
      })
      .state('admin.beacons.edit', {
        url: '/:beaconId/edit',
        templateUrl: 'modules/beacons/client/views/admin/form-beacon.client.view.html',
        controller: 'BeaconsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconResolve: getBeacon
        }
      });
  }

  getBeacon.$inject = ['$stateParams', 'BeaconsService'];

  function getBeacon($stateParams, BeaconsService) {
    return BeaconsService.get({
      beaconId: $stateParams.beaconId
    }).$promise;
  }

  newBeacon.$inject = ['BeaconsService'];

  function newBeacon(BeaconsService) {
    return new BeaconsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('beacons.routes')
    .config(routeConfig);


  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('beacons', {
        abstract: true,
        url: '/beacons',
        template: '<ui-view/>'
      })
      .state('beacons.list', {
        url: '',
        templateUrl: 'modules/beacons/client/views/list-beacons.client.view.html',
        controller: 'BeaconsListController',
        controllerAs: 'vm',
      })
      .state('beacons.order', {
        url: '/order',
        templateUrl: 'modules/beacons/client/views/order-beacons.client.view.html',
        controller: 'BeaconsOrderController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: newBeacon
        },
      })
      .state('beacons.order-checkout', {
        url: '/order/:beaconId',
        templateUrl: 'modules/beacons/client/views/order-checkout-beacons.client.view.html',
        controller: 'BeaconsOrderController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        },
      })
      .state('beacons.view', {
        url: '/:beaconId',
        templateUrl: 'modules/beacons/client/views/view-beacon.client.view.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        },
      })
      .state('beacons.edit', {
        url: '/:beaconId/edit',
        templateUrl: 'modules/beacons/client/views/form-beacon.client.view.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        }
      });
  }

  getBeacon.$inject = ['$stateParams', 'BeaconsService'];

  function getBeacon($stateParams, BeaconsService) {
    return BeaconsService.get({
      beaconId: $stateParams.beaconId
    }).$promise;
  }

  newBeacon.$inject = ['BeaconsService'];

  function newBeacon(BeaconsService) {
    return new BeaconsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('beacons.admin')
    .controller('BeaconsAdminController', BeaconsAdminController);

  BeaconsAdminController.$inject = ['$scope', '$state', '$window', 'beaconResolve', 'Authentication'];

  function BeaconsAdminController($scope, $state, $window, beacon, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Beacon
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce beacon?')) {
        vm.beacon.$remove(function() {
          $state.go('admin.beacons.list');
        });
      }
    }

    // Save Beacon
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconForm');
        return false;
      }

      // Create a new beacon, or update the current instance
      vm.beacon.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.beacons.list'); 
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('beacons.admin')
  .controller('BeaconsAdminListController', BeaconsAdminListController);
  /*.config(['momentPickerProvider', function (momentPickerProvider) {
  momentPickerProvider.options({
  locale:        'fr',
  format:        'DD-MM-YYYY',
  minView:       'decade',
  maxView:       'minute',
  startView:     'year',
  autoclose:     true,
  today:         true,
  keyboard:      true,
  leftArrow:     '&larr;',
  rightArrow:    '&rarr;',
  yearsFormat:   'YYYY',
  monthsFormat:  'MMM',
  daysFormat:    'DD',
  //hoursFormat:   'HH:[00]',
  //minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
  //secondsFormat: 'ss',
  //minutesStep:   5,
  //secondsStep:   1
});
}]);*/

BeaconsAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'beaconResolve', 'Authentication', 'BeaconsService'];

function BeaconsAdminListController($scope, $window, $state, $filter, beacon, Authentication, BeaconsService) {
  var vm = this;
  vm.buildPager = buildPager;
  vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
  vm.pageChanged = pageChanged;
  vm.beacon = beacon;
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();
  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks:'false'
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
    mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  vm.authentication = Authentication;

  BeaconsService.query(function (data) {
    vm.beacons = data;
    vm.buildPager();
  });

  function buildPager() {
    vm.pagedItems = [];
    vm.itemsPerPage = 8;
    vm.currentPage = 1;
    vm.figureOutItemsToDisplay();
  }

  function figureOutItemsToDisplay() {
    vm.filteredItems = $filter('filter')(vm.beacons, {
      $: vm.search
    });
    vm.filterLength = vm.filteredItems.length;
    var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
    var end = begin + vm.itemsPerPage;
    vm.pagedItems = vm.filteredItems.slice(begin, end);
  }

  function pageChanged() {
    vm.figureOutItemsToDisplay();
  }

  vm.error = null;
  vm.form = {};
  vm.remove = remove;
  vm.save = save;

  // Remove existing Beacon
  function remove() {
    if ($window.confirm('Êtes-vous sur de vouloir supprimer ce beacon?')) {
      vm.beacon.$remove(function() {
        $state.go('admin.beacons.list');
      });
    }
  }

  // Save Beacon
  function save(isValid) {
    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconForm');
      return false;
    }

    // Create a new beacon, or update the current instance
    vm.beacon.createOrUpdate()
    .then(successCallback)
    .catch(errorCallback);

    function successCallback(res) {
      $state.go('admin.beacons.list');
    }

    function errorCallback(res) {
      vm.error = res.data.message;
    }
  }

}
}());

(function () {
  'use strict';

  angular
    .module('beacons')
    .controller('BeaconsController', BeaconsController);

  BeaconsController.$inject = ['$scope', '$state', '$window', 'beaconResolve', 'Authentication'];

  function BeaconsController($scope, $state, $window, beacon, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Beacon
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce beacon?')) {
        vm.beacon.$remove(function() {
          $state.go('beacons.list');
        });
      }
    }

    // Save Beacon
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconForm');
        return false;
      }

      // Create a new beacon, or update the current instance
      vm.beacon.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('beacons')
  .controller('BeaconsListController', BeaconsListController);

  BeaconsListController.$inject = ['$scope', '$filter', 'BeaconsService', 'Authentication'];

  function BeaconsListController($scope, $filter, BeaconsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    BeaconsService.query(function (data) {
      vm.beacons = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.beacons, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }

}());

(function () {
  'use strict';

  angular
    .module('beacons')
    .controller('BeaconsOrderController', BeaconsOrderController);


  BeaconsOrderController.$inject = ['$scope', '$filter', '$state', '$window', 'beaconResolve', 'BeaconsService', 'BeaconsPricesService', 'Authentication'];

  function BeaconsOrderController($scope, $filter, $state, $window, beacon, BeaconsService, BeaconsPricesService, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    console.log(beacon);
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    //vm.remove = remove;
    vm.save = save;

    //$window.Stripe.setPublishableKey('pk_test_QFaSkrmXe2W91X7B4aO3P8ZB');

    BeaconsService.query(function (datas) {
      vm.beacons = datas;
      console.log(datas);
    });

    BeaconsPricesService.query(function (data) {
      vm.beaconPrices = data;
    });
    // Save Beacon
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconForm');
        return false;
      }

      // Create a new beacon, or update the current instance
      vm.beacon.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('beacons.order');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }

}());

(function () {
  'use strict';

  angular
    .module('beacons.services')
    .factory('BeaconsService', BeaconsService);

  BeaconsService.$inject = ['$resource'];

  function BeaconsService($resource) {
    var Beacon = $resource('api/beacons/:beaconId', {
      beaconId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Beacon.prototype, {
      createOrUpdate: function () {
        var beacon = this;
        return createOrUpdate(beacon);
      }
    });

    return Beacon;

    function createOrUpdate(beacon) {
      if (beacon._id) {
        return beacon.$update(onSuccess, onError);
      } else {
        return beacon.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(beacon) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());


'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Bills state routing
    $stateProvider
    .state('bills', {
      url: '/bills',
      templateUrl: 'modules/bills/client/views/bills.client.view.html'
    })
    .state('bill', {
      url: '/bill',
      templateUrl: 'modules/bills/client/views/bill.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .run(routeFilter);

  routeFilter.$inject = ['$rootScope', '$state', 'Authentication'];

  function routeFilter($rootScope, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', stateChangeStart);
    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeStart(event, toState, toParams, fromState, fromParams) {
      // Check authentication before changing state
      if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
        var allowed = false;

        for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {
          if ((roles[i] === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(roles[i]) !== -1)) {
            allowed = true;
            break;
          }
        }

        if (!allowed) {
          event.preventDefault();
          if (Authentication.user !== null && typeof Authentication.user === 'object') {
            $state.transitionTo('forbidden');
          } else {
            $state.go('authentication.signin').then(function () {
              // Record previous state
              storePreviousState(toState, toParams);
            });
          }
        }
      }
    }

    function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      // Record previous state
      storePreviousState(fromState, fromParams);
    }

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/client/views/home.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/404.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: 'modules/core/client/views/400.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden',
        }
      })
      .state('licenses.create', {
        url: '/create',
        templateUrl: 'modules/licenses/client/views/form-license.client.view.html',
        controller: 'LicensesController',
        controllerAs: 'vm',
        resolve: {
          licenseResolve: newLicense
        }
      });
  }

  newLicense.$inject = ['LicensesService'];

  function newLicense(LicensesService) {
    return new LicensesService();
  }
}());

'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);

(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
  }
}());

'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('core')
  .directive('sideNavigation', ["$timeout", function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        // Call metsi to build when user signup
        scope.$watch('authentication.user', function () {
          $timeout(function () {
            element.metisMenu();
          });
        });
      }
    };
  }])
  .directive('minimalizaSidebar', ["$timeout", function ($timeout) {
    return {
      restrict: 'A',
      template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
      controller: ["$scope", "$element", function ($scope, $element) {
        $scope.minimalize = function () {
          angular.element('body').toggleClass('mini-navbar');
          if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            angular.element('#side-menu').hide();
            // For smoothly turn on menu
            $timeout(function () {
              angular.element('#side-menu').fadeIn(400);
            }, 200);
          } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            angular.element('#side-menu').removeAttr('style');
          }
        };
      }]
    };
  }]);

'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('core')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
  }]);

(function () {
  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', 'Authentication'];

  function authInterceptor($q, $injector, Authentication) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      if (!rejection.config.ignoreAuthModule) {
        switch (rejection.status) {
          case 401:
            // Deauthenticate the global user
            Authentication.user = null;
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('forbidden');
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }
}());

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['user', 'admin'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        if(!user) {
          return false;
        }
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.state, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === menuItemState) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar', {
      roles: ['*']
    });
  }
]);

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

(function () {
  'use strict';

  // Configuring the Emails Admin module
  angular
    .module('emails.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Emails',
      state: 'admin.emails.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('emails.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.emails', {
        abstract: true,
        url: '/emails',
        template: '<ui-view/>'
      })
      .state('admin.emails.list', {
        url: '',
        templateUrl: 'modules/emails/client/views/admin/list-emails.client.view.html',
        controller: 'EmailsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: newEmail
        }
      })
      .state('admin.emails.create', {
        url: '/create',
        templateUrl: 'modules/emails/client/views/admin/form-email.client.view.html',
        controller: 'EmailsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: newEmail
        }
      })
      .state('admin.emails.edit', {
        url: '/:emailId/edit',
        templateUrl: 'modules/emails/client/views/admin/form-email.client.view.html',
        controller: 'EmailsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: getEmail
        }
      });
  }

  getEmail.$inject = ['$stateParams', 'EmailsService'];

  function getEmail($stateParams, EmailsService) {
    return EmailsService.get({
      emailId: $stateParams.emailId
    }).$promise;
  }

  newEmail.$inject = ['EmailsService'];

  function newEmail(EmailsService) {
    return new EmailsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('emails.admin')
    .controller('EmailsAdminController', EmailsAdminController);

  EmailsAdminController.$inject = ['$scope', '$state', '$window', 'emailResolve', 'Authentication'];

  function EmailsAdminController($scope, $state, $window, email, Authentication) {
    var vm = this;

    vm.email = email;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Email
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet email?')) {
        vm.email.$remove(function() {
          $state.go('admin.emails.list');
        });
      }
    }

    // Save Email
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailForm');
        return false;
      }

      // Create a new email, or update the current instance
      vm.email.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.emails.list'); 
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('emails.admin')
  .controller('EmailsAdminListController', EmailsAdminListController);

  EmailsAdminListController.$inject = ['$scope', '$filter', '$window', '$state', 'emailResolve', 'Authentication', 'EmailsService'];

  function EmailsAdminListController($scope, $filter, $window, $state, email, Authentication, EmailsService) {
    var vm = this;
    vm.email = email;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Email
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet email?')) {
        vm.email.$remove(function() {
          $state.go('admin.emails.list');
        });
      }
    }

    // Save Email
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailForm');
        return false;
      }

      // Create a new email, or update the current instance
      vm.email.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.emails.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EmailsService.query(function (data) {
      vm.emails = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.emails, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('emails.services')
    .factory('EmailsService', EmailsService);

  EmailsService.$inject = ['$resource'];

  function EmailsService($resource) {
    var Email = $resource('api/emails/:emailId', {
      emailId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Email.prototype, {
      createOrUpdate: function () {
        var email = this;
        return createOrUpdate(email);
      }
    });

    return Email;

    function createOrUpdate(email) {
      if (email._id) {
        return email.$update(onSuccess, onError);
      } else {
        return email.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(email) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('events.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/client/views/list-events.client.view.html',
        controller: 'EventsListController',
        controllerAs: 'vm',
        resolve: {
          evtResolve: newEvent
        }
      })
      .state('events.create', {
        url: '/create',
        templateUrl: 'modules/events/client/views/form-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          evtResolve: newEvent
        }
      })
      .state('events.edit', {
        url: '/:eventId/edit',
        templateUrl: 'modules/events/client/views/form-event.client.view.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        resolve: {
          evtResolve: getEvent
        }
      });
  }

  getEvent.$inject = ['$stateParams', 'EventsService'];

  function getEvent($stateParams, EventsService) {
    return EventsService.get({
      eventId: $stateParams.eventId
    }).$promise;
  }

  newEvent.$inject = ['EventsService'];

  function newEvent(EventsService) {
    return new EventsService();
  }
}());

(function () {
  'use strict';

  angular
  .module('events', ['moment-picker'])
  .controller('EventsController', EventsController)
  .config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
      locale:        'fr',
      format:        'MM/DD/YY',
      minView:       'decade',
      maxView:       'minute',
      startView:     'year',
      autoclose:     true,
      today:         true,
      keyboard:      true,
      leftArrow:     '&larr;',
      rightArrow:    '&rarr;',
      yearsFormat:   'YYYY',
      monthsFormat:  'MMM',
      daysFormat:    'DD',
      hoursFormat:   'HH:[00]',
      //minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
      secondsFormat: 'ss',
      minutesStep:   5,
      secondsStep:   1
    });
  }]);

  EventsController.$inject = ['$scope', '$state', '$window', '$timeout', 'evtResolve', 'Authentication', 'FileUploader', 'NgMap'];

  function EventsController($scope, $state, $window, $timeout, evt, Authentication, FileUploader, NgMap) {
    var vm = this;
    vm.evt = evt;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    if(vm.evt.eventStartDate){
      vm.evt.eventStartDate = moment.max(moment(evt.eventStartDate), moment(evt.eventStartDate)).format('MM/DD/YYYY');
    }
    if(vm.evt.eventEndDate){
      vm.evt.eventEndDate = moment.max(moment(evt.eventEndDate), moment(evt.eventEndDate)).format('MM/DD/YYYY');
    }

    // Add Place address
    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.evt.eventLat = vm.place.geometry.location.lat();
      vm.evt.eventLng = vm.place.geometry.location.lng();
      vm.map.setCenter(vm.place.geometry.location);
    };
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    $scope.imageURL = vm.evt.eventPicture;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/events/picture',
      alias: 'newEventPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.evt = response;
      console.log(response);

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadEventPicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = vm.evt.eventPicture;
    };

    // Remove existing Event
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet événement?')) {
        vm.evt.$remove(function() {
          $state.go('events.list');
        });
      }
    }

    // Save Event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.evtForm');
        return false;
      }

      // Create a new event, or update the current instance
      vm.evt.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('events.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['$scope', '$filter', '$window', '$state', 'evtResolve', 'EventsService', 'Authentication'];

  function EventsListController($scope, $filter, $window, evt, $state, EventsService, Authentication) {

    var vm = this;
    vm.evt = evt;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.error = null;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EventsService.query(function (data) {
      vm.evts = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.evts, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }


    // Remove existing Event
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet événement?')) {
        vm.evt.$remove(function() {
          $state.go('events.create');
        });
      }
    }
  }
}());

(function () {
  'use strict';

  icheck.$inject = ["$timeout"];
  angular
  .module('events')
  .directive('icheck', icheck);

  function icheck($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, element, $attrs, ngModel) {
        return $timeout(function() {
          var value;
          value = $attrs.value;

          $scope.$watch($attrs.ngModel, function(newValue){
            $(element).iCheck('update');
          });

          return $(element).iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_square-green'

          }).on('ifChanged', function(event) {
            if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
              $scope.$apply(function() {
                return ngModel.$setViewValue(event.target.checked);
              });
            }
            if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
              return $scope.$apply(function() {
                return ngModel.$setViewValue(value);
              });
            }
          });
        });
      }
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('events.services')
    .factory('EventsService', EventsService);

  EventsService.$inject = ['$resource'];

  function EventsService($resource) {
    var Evt = $resource('api/events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Evt.prototype, {
      createOrUpdate: function () {
        var evt = this;
        return createOrUpdate(evt);
      }
    });

    return Evt;

    function createOrUpdate(evt) {
      if (evt._id) {
        return evt.$update(onSuccess, onError);
      } else {
        return evt.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(evt) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('gains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('gains', {
        abstract: true,
        url: '/gains',
        template: '<ui-view/>'
      })
      .state('gains.list', {
        url: '',
        templateUrl: 'modules/gains/client/views/list-gains.client.view.html',
        controller: 'GainsListController',
        controllerAs: 'vm',
        resolve: {
          gainResolve: newGain
        }
      })
      .state('gains.create', {
        url: '/create',
        templateUrl: 'modules/gains/client/views/form-gain.client.view.html',
        controller: 'GainsController',
        controllerAs: 'vm',
        resolve: {
          gainResolve: newGain
        }
      })
      .state('gains.edit', {
        url: '/:gainId/edit',
        templateUrl: 'modules/gains/client/views/form-gain.client.view.html',
        controller: 'GainsController',
        controllerAs: 'vm',
        resolve: {
          gainResolve: getGain
        }
      });
  }

  getGain.$inject = ['$stateParams', 'GainsService'];

  function getGain($stateParams, GainsService) {
    return GainsService.get({
      gainId: $stateParams.gainId
    }).$promise;
  }

  newGain.$inject = ['GainsService'];

  function newGain(GainsService) {
    return new GainsService();
  }
}());

(function () {
  'use strict';

  angular
  .module('gains', ['moment-picker'])
  .controller('GainsController', GainsController)
  .config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
      locale:        'fr',
      format:        'MM/DD/YY',
      minView:       'decade',
      maxView:       'minute',
      startView:     'year',
      autoclose:     true,
      today:         true,
      keyboard:      true,
      leftArrow:     '&larr;',
      rightArrow:    '&rarr;',
      yearsFormat:   'YYYY',
      monthsFormat:  'MMM',
      daysFormat:    'DD',
      hoursFormat:   'HH:[00]',
      //minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
      secondsFormat: 'ss',
      minutesStep:   5,
      secondsStep:   1
    });
  }]);

  GainsController.$inject = ['$scope', '$state', '$window', '$timeout', 'gainResolve', 'Authentication', 'FileUploader'];

  function GainsController($scope, $state, $window, $timeout, gain, Authentication, FileUploader) {
    var vm = this;
    vm.gain = gain;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    if(vm.gain.gainStartDate){
      vm.gain.gainStartDate = moment.max(moment(gain.gainStartDate), moment(gain.gainStartDate)).format('MM/DD/YYYY');
    }
    if(vm.gain.gainEndDate){
      vm.gain.gainEndDate = moment.max(moment(gain.gainEndDate), moment(gain.gainEndDate)).format('MM/DD/YYYY');
    }

    $scope.imageURL = vm.gain.gainPicture;
    console.log($scope.imageURL);

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/gains/picture',
      alias: 'newGainPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.gain = response;
      console.log(response);

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadGainPicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = vm.gain.gainPicture;
    };

    // Remove existing Gain
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce contenu?')) {
        vm.gain.$remove(function() {
          $state.go('gains.list');
        });
      }
    }

    // Save Gain
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gainForm');
        return false;
      }

      // Create a new gain, or update the current instance
      vm.gain.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('gains.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('gains')
    .controller('GainsListController', GainsListController);

  GainsListController.$inject = ['$scope', '$filter', '$window', '$state', 'gainResolve', 'GainsService', 'Authentication'];

  function GainsListController($scope, $filter, $window, gain, $state, GainsService, Authentication) {

    var vm = this;
    vm.gain = gain;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.error = null;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    GainsService.query(function (data) {
      vm.gains = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.gains, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }


    // Remove existing Gain
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce contenu?')) {
        vm.gain.$remove(function() {
          $state.go('gains.create');
        });
      }
    }
  }
}());

(function () {
  'use strict';

  icheck.$inject = ["$timeout"];
  angular
  .module('gains')
  .directive('icheck', icheck);

  function icheck($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function($scope, element, $attrs, ngModel) {
        return $timeout(function() {
          var value;
          value = $attrs.value;

          $scope.$watch($attrs.ngModel, function(newValue){
            $(element).iCheck('update');
          });

          return $(element).iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_square-green'

          }).on('ifChanged', function(event) {
            if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
              $scope.$apply(function() {
                return ngModel.$setViewValue(event.target.checked);
              });
            }
            if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
              return $scope.$apply(function() {
                return ngModel.$setViewValue(value);
              });
            }
          });
        });
      }
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('gains.services')
    .factory('GainsService', GainsService);

  GainsService.$inject = ['$resource'];

  function GainsService($resource) {
    var Gain = $resource('api/gains/:gainId', {
      gainId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Gain.prototype, {
      createOrUpdate: function () {
        var gain = this;
        return createOrUpdate(gain);
      }
    });

    return Gain;

    function createOrUpdate(gain) {
      if (gain._id) {
        return gain.$update(onSuccess, onError);
      } else {
        return gain.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(gain) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Licenses Admin module
  angular
    .module('licenses.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Licenses',
      state: 'admin.licenses.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('licenses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.licenses', {
        abstract: true,
        url: '/licenses',
        template: '<ui-view/>'
      })
      .state('admin.licenses.list', {
        url: '',
        templateUrl: 'modules/licenses/client/views/admin/list-licenses.client.view.html',
        controller: 'LicensesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.licenses.create', {
        url: '/create',
        templateUrl: 'modules/licenses/client/views/admin/form-license.client.view.html',
        controller: 'LicensesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licenseResolve: newLicense
        }
      })
      .state('admin.licenses.edit', {
        url: '/:licenseId/edit',
        templateUrl: 'modules/licenses/client/views/admin/form-license.client.view.html',
        controller: 'LicensesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licenseResolve: getLicense
        }
      });
  }

  getLicense.$inject = ['$stateParams', 'LicensesService'];

  function getLicense($stateParams, LicensesService) {
    return LicensesService.get({
      licenseId: $stateParams.licenseId
    }).$promise;
  }

  newLicense.$inject = ['LicensesService'];

  function newLicense(LicensesService) {
    return new LicensesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('licenses.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('licenses', {
        abstract: true,
        url: '/licenses',
        template: '<ui-view/>'
      })
      .state('licenses.list', {
        url: '',
        templateUrl: 'modules/licenses/client/views/list-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Licences'
        }
      })
      .state('licenses.free-license', {
        url: '/free-license',
        templateUrl: 'modules/licenses/client/views/form-free-license.client.view.html',
        controller: 'LicensesController',
        controllerAs: 'vm',
        resolve: {
          licenseResolve: newLicense
        }
      })
      .state('licenses.order', {
        url: '/order',
        templateUrl: 'modules/licenses/client/views/order-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm'
      })
      .state('licenses.order-checkout', {
        url: '/order/checkout',
        templateUrl: 'modules/licenses/client/views/order-checkout-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm'
      })
      .state('licenses.view', {
        url: '/:licenseId',
        templateUrl: 'modules/licenses/client/views/view-license.client.view.html',
        controller: 'LicensesController',
        controllerAs: 'vm',
        resolve: {
          licenseResolve: getLicense
        }
      })
      .state('licenses.edit', {
        url: '/:licenseId/edit',
        templateUrl: 'modules/licenses/client/views/form-license.client.view.html',
        controller: 'LicensesController',
        controllerAs: 'vm',
        resolve: {
          licenseResolve: getLicense
        }
      });
  }

  getLicense.$inject = ['$stateParams', 'LicensesService'];

  function getLicense($stateParams, LicensesService) {
    return LicensesService.get({
      licenseId: $stateParams.licenseId
    }).$promise;
  }

  newLicense.$inject = ['LicensesService'];

  function newLicense(LicensesService) {
    return new LicensesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('licenses.admin')
    .controller('LicensesAdminController', LicensesAdminController);

  LicensesAdminController.$inject = ['$scope', '$state', '$window', 'licenseResolve', 'Authentication'];

  function LicensesAdminController($scope, $state, $window, license, Authentication) {
    var vm = this;
    vm.license = license;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing License
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cette licence?')) {
        vm.license.$remove(function() {
          $state.go('admin.licenses.list');
        });
      }
    }

    // Save License
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licenseForm');
        return false;
      }

      // Create a new license, or update the current instance
      vm.license.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('licenses.admin')
  .controller('LicensesAdminListController', LicensesAdminListController);

  LicensesAdminListController.$inject = ['$scope', '$filter', 'LicensesService'];

  function LicensesAdminListController($scope, $filter, LicensesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    LicensesService.query(function (data) {
      vm.licenses = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.licenses, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('licenses')
  .controller('LicensesController', LicensesController, ['ngAudio']);

  LicensesController.$inject = ['$scope', '$state', '$window', 'licenseResolve', 'LicensesService', 'AreasService', 'ZonesService', 'Authentication', 'ngAudio'];

  function LicensesController($scope, $state, $window, license, LicensesService, AreasService, ZonesService, Authentication, ngAudio) {
    var vm = this;

    vm.license = license;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    LicensesService.query(function (datas) {
      vm.licences = datas;
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<datas.length;i++) {
        tObj.push(datas[i].user._id);
      }
      for(var j=0; j<tObj.length; j++){
        if(tObj[j] === vm.authentication.user._id){
          x1 = 1;
        }
        else{
          x1 = 0;
        }
        xObj.push(x1);
      }
      vm.hasLicense = xObj.includes(1);
      console.log(vm.hasLicense);
    });

    // Get User's Zones List
    ZonesService.query(function (data) {
      vm.zones = data;
    });

    // Get User's Areas List
    AreasService.query(function (data){
      vm.areas = data;
    });

    $scope.audio = ngAudio.load("modules/licenses/client/sounds/V3-C1-AB586.wav");
    $scope.audio.volume = 0.1;

    // Remove existing License
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cette licence?')) {
        vm.license.$remove(function() {
          $state.go('licenses.list');
        });
      }
    }

    // Save License
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licenseForm');
        return false;
      }

      // Create a new license, or update the current instance
      vm.license.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('licenses')
    .controller('LicensesListController', LicensesListController);

  LicensesListController.$inject = ['$scope', '$filter', 'LicensesService', 'Authentication'];

  function LicensesListController($scope, $filter, LicensesService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    LicensesService.query(function (data) {
      vm.licenses = data;
      vm.buildPager();
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<data.length;i++) {
        tObj.push(data[i].user._id);
      }
      for(var j=0; j<tObj.length; j++){
        if(tObj[j] === vm.authentication.user._id){
          x1 = 1;
        }
        else{
          x1 = 0;
        }
        xObj.push(x1);
      }
      vm.hasLicense = xObj.includes(1);
      console.log(vm.hasLicense);
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.licenses, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('licenses.services')
    .factory('LicensesService', LicensesService);

  LicensesService.$inject = ['$resource'];

  function LicensesService($resource) {
    var License = $resource('api/licenses/:licenseId', {
      licenseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(License.prototype, {
      createOrUpdate: function () {
        var license = this;
        return createOrUpdate(license);
      }
    });

    return License;

    function createOrUpdate(license) {
      if (license._id) {
        return license.$update(onSuccess, onError);
      } else {
        return license.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(license) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Prices Admin module
  angular
    .module('prices-beacons.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Prix Beacons',
      state: 'admin.prices-beacons.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-beacons.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.prices-beacons', {
        abstract: true,
        url: '/prices/beacons',
        template: '<ui-view/>'
      })
      .state('admin.prices-beacons.list', {
        url: '',
        templateUrl: 'modules/prices-beacons/client/views/admin/list-prices-beacons.client.view.html',
        controller: 'BeaconsPricesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: newBeaconPrice
        }
      })
      .state('admin.prices-beacons.create', {
        url: '/create',
        templateUrl: 'modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html',
        controller: 'BeaconsPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: newBeaconPrice
        }
      })
      .state('admin.prices-beacons.edit', {
        url: '/:beaconPriceId/edit',
        templateUrl: 'modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html',
        controller: 'BeaconsPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: getBeaconPrice
        }
      });
  }

  getBeaconPrice.$inject = ['$stateParams', 'BeaconsPricesService'];

  function getBeaconPrice($stateParams, BeaconsPricesService) {
    return BeaconsPricesService.get({
      beaconPriceId: $stateParams.beaconPriceId
    }).$promise;
  }

  newBeaconPrice.$inject = ['BeaconsPricesService'];

  function newBeaconPrice(BeaconsPricesService) {
    return new BeaconsPricesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-beacons.admin')
    .controller('BeaconsPricesAdminListController', BeaconsPricesAdminListController);

  BeaconsPricesAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'beaconPriceResolve', 'Authentication', 'BeaconsPricesService'];

  function BeaconsPricesAdminListController($scope, $window, $state, $filter, beaconPrice, Authentication, BeaconsPricesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.beaconPrice = beaconPrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    BeaconsPricesService.query(function (data) {
      vm.beaconPrice = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.beaconPrice, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    // Remove existing Beacon Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.beaconPrice.$remove(function() {
          $state.go('admin.prices-beacons.list');
        });
      }
    }

    // Save Beacon Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconPriceForm');
        return false;
      }

      // Create a new beacon price, or update the current instance
      vm.beaconPrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-beacons.admin')
    .controller('BeaconsPricesAdminController', BeaconsPricesAdminController);

  BeaconsPricesAdminController.$inject = ['$scope', '$state', '$window', 'beaconPriceResolve', 'Authentication'];

  function BeaconsPricesAdminController($scope, $state, $window, beaconPrice, Authentication) {
    var vm = this;

    vm.beaconPrice = beaconPrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Beacon Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.beaconPrice.$remove(function() {
          $state.go('admin.prices-beacons.list');
        });
      }
    }

    // Save Beacon Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconPriceForm');
        return false;
      }

      // Create a new beacon price, or update the current instance
      vm.beaconPrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-beacons.services')
    .factory('BeaconsPricesService', BeaconsPricesService);

  BeaconsPricesService.$inject = ['$resource'];

  function BeaconsPricesService($resource) {
    var BeaconPrice = $resource('api/prices/beacons/:beaconPriceId', {
      beaconPriceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(BeaconPrice.prototype, {
      createOrUpdate: function () {
        var beaconPrice = this;
        return createOrUpdate(beaconPrice);
      }
    });

    return BeaconPrice;

    function createOrUpdate(beaconPrice) {
      if (beaconPrice._id) {
        return beaconPrice.$update(onSuccess, onError);
      } else {
        return beaconPrice.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(beaconPrice) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Prices Admin module
  angular
    .module('prices-licenses.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Prix Licences',
      state: 'admin.prices-licenses.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-licenses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.prices-licenses', {
        abstract: true,
        url: '/prices/licenses',
        template: '<ui-view/>'
      })
      .state('admin.prices-licenses.list', {
        url: '',
        templateUrl: 'modules/prices-licenses/client/views/admin/list-prices-licenses.client.view.html',
        controller: 'LicensesPricesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: newLicensePrice
        }
      })
      .state('admin.prices-licenses.create', {
        url: '/create',
        templateUrl: 'modules/prices-licenses/client/views/admin/form-price-license.client.view.html',
        controller: 'LicensesPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: newLicensePrice
        }
      })
      .state('admin.prices-licenses.edit', {
        url: '/:licensePriceId/edit',
        templateUrl: 'modules/prices-licenses/client/views/admin/form-price-license.client.view.html',
        controller: 'LicensesPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: getLicensePrice
        }
      });
  }

  getLicensePrice.$inject = ['$stateParams', 'LicensesPricesService'];

  function getLicensePrice($stateParams, LicensesPricesService) {
    return LicensesPricesService.get({
      licensePriceId: $stateParams.licensePriceId
    }).$promise;
  }

  newLicensePrice.$inject = ['LicensesPricesService'];

  function newLicensePrice(LicensesPricesService) {
    return new LicensesPricesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-licenses.admin')
    .controller('LicensesPricesAdminListController', LicensesPricesAdminListController);

  LicensesPricesAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'licensePriceResolve', 'Authentication', 'LicensesPricesService'];

  function LicensesPricesAdminListController($scope, $window, $state, $filter, licensePrice, Authentication, LicensesPricesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    vm.licensePrice = licensePrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    LicensesPricesService.query(function (data) {
      vm.licensePrice = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.licensePrice, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    // Remove existing License Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.licensePrice.$remove(function() {
          $state.go('admin.prices-licenses.list');
        });
      }
    }

    // Save License Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licensePriceForm');
        return false;
      }

      // Create a new license price, or update the current instance
      vm.licensePrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-licenses.admin')
    .controller('LicensesPricesAdminController', LicensesPricesAdminController);

  LicensesPricesAdminController.$inject = ['$scope', '$state', '$window', 'licensePriceResolve', 'Authentication'];

  function LicensesPricesAdminController($scope, $state, $window, licensePrice, Authentication) {
    var vm = this;

    vm.licensePrice = licensePrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing License Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.licensePrice.$remove(function() {
          $state.go('admin.prices-licenses.list');
        });
      }
    }

    // Save License Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licensePriceForm');
        return false;
      }

      // Create a new license price, or update the current instance
      vm.licensePrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('prices-licenses.services')
    .factory('LicensesPricesService', LicensesPricesService);

  LicensesPricesService.$inject = ['$resource'];

  function LicensesPricesService($resource) {
    var LicensePrice = $resource('api/prices/licenses/:licensePriceId', {
      licensePriceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(LicensePrice.prototype, {
      createOrUpdate: function () {
        var licensePrice = this;
        return createOrUpdate(licensePrice);
      }
    });

    return LicensePrice;

    function createOrUpdate(licensePrice) {
      if (licensePrice._id) {
        return licensePrice.$update(onSuccess, onError);
      } else {
        return licensePrice.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(licensePrice) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('signals.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('signals', {
        abstract: true,
        url: '/signals',
        template: '<ui-view/>'
      })
      .state('signals.list', {
        url: '',
        templateUrl: 'modules/signals/client/views/list-signals.client.view.html',
        controller: 'SignalsListController',
        controllerAs: 'vm'
      })
      .state('signals.create', {
        url: '/create',
        templateUrl: 'modules/signals/client/views/form-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: newSignal
        }
      })
      .state('signals.view', {
        url: '/:signalId',
        templateUrl: 'modules/signals/client/views/view-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: getSignal
        }
      })
      .state('signals.edit', {
        url: '/:signalId/edit',
        templateUrl: 'modules/signals/client/views/form-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: getSignal
        }
      });
  }

  getSignal.$inject = ['$stateParams', 'SignalsService'];

  function getSignal($stateParams, SignalsService) {
    return SignalsService.get({
      signalId: $stateParams.signalId
    }).$promise;
  }

  newSignal.$inject = ['SignalsService'];

  function newSignal(SignalsService) {
    return new SignalsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('signals')
    .controller('SignalsListController', SignalsListController);

  SignalsListController.$inject = ['$scope', '$filter', 'SignalsService', 'Authentication'];

  function SignalsListController($scope, $filter, SignalsService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    SignalsService.query(function (data) {
      vm.signals = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.signals, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
  .module('signals')
  .controller('SignalsController', SignalsController, ['ngAudio']);

  SignalsController.$inject = ['$scope', '$state', '$window', 'signalResolve', 'SignalsService', 'Authentication', 'ngAudio'];

  function SignalsController($scope, $state, $window, signal, SignalsService, Authentication, ngAudio) {
    var vm = this;

    vm.signal = signal;
    console.log(vm.signal);
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    SignalsService.query(function (datas) {
      vm.signals = datas;
      console.log(datas);
      /*var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<datas.length;i++) {
        tObj.push(datas[i].user._id);
      }
      for(var j=0; j<tObj.length; j++){
        if(tObj[j] === vm.authentication.user._id){
          x1 = 1;
        }
        else{
          x1 = 0;
        }
        xObj.push(x1);
      }
      vm.hasLicense = xObj.includes(1);*/
    });

    /*LicensesService.query(function (data){
      vm.licenses = data;
    });*/


    $scope.audio = ngAudio.load("modules/licenses/client/sounds/V3-C1-AB586.wav");
    $scope.audio.volume = 0.1;

    // Remove existing License
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce signal?')) {
        vm.signal.$remove(function() {
          $state.go('signals.list');
        });
      }
    }

    // Save License
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.signalForm');
        return false;
      }

      // Create a new license, or update the current instance
      vm.signal.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('signals.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('signals.services')
    .factory('SignalsService', SignalsService);

  SignalsService.$inject = ['$resource'];

  function SignalsService($resource) {
    var Signal = $resource('api/signals/:signalId', {
      signalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Signal.prototype, {
      createOrUpdate: function () {
        var signal = this;
        return createOrUpdate(signal);
      }
    });

    return Signal;

    function createOrUpdate(signal) {
      if (signal._id) {
        return signal.$update(onSuccess, onError);
      } else {
        return signal.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(signal) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('stats.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stats', {
        abstract: true,
        url: '/stats',
        template: '<ui-view/>'
      })
      .state('stats.list', {
        url: '',
        templateUrl: 'modules/stats/client/views/list-stats.client.view.html',
        controller: 'StatsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Stats'
        }
      })
      .state('stats.create', {
        url: '/create',
        templateUrl: 'modules/stats/client/views/form-stat.client.view.html',
        controller: 'StatsController',
        controllerAs: 'vm',
        resolve: {
          statResolve: newStat
        }
      })
      .state('stats.edit', {
        url: '/:statId/edit',
        templateUrl: 'modules/stats/client/views/form-stat.client.view.html',
        controller: 'StatsController',
        controllerAs: 'vm',
        resolve: {
          statResolve: getStat
        }
      });
  }

  getStat.$inject = ['$stateParams', 'StatsService'];

  function getStat($stateParams, StatsService) {
    return StatsService.get({
      statId: $stateParams.statId
    }).$promise;
  }

  newStat.$inject = ['StatsService'];

  function newStat(StatsService) {
    return new StatsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('stats')
    .controller('StatsListController', StatsListController);

  StatsListController.$inject = ['$scope', '$filter', 'StatsService', 'Authentication'];

  function StatsListController($scope, $filter, StatsService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    StatsService.query(function (data) {
      vm.stats = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.stats, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('stats')
    .controller('StatsController', StatsController);

  StatsController.$inject = ['$scope', '$state', '$window', 'statResolve', 'Authentication'];

  function StatsController($scope, $state, $window, stat, Authentication) {
    var vm = this;

    vm.stat = stat;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Stat
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce log?')) {
        vm.stat.$remove(function() {
          $state.go('stats.list');
        });
      }
    }

    // Save Stat
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.statForm');
        return false;
      }

      // Create a new stat, or update the current instance
      vm.stat.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('stats.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('stats.services')
    .factory('StatsService', StatsService);

  StatsService.$inject = ['$resource'];

  function StatsService($resource) {
    var Stat = $resource('api/stats/:statId', {
      statId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Stat.prototype, {
      createOrUpdate: function () {
        var stat = this;
        return createOrUpdate(stat);
      }
    });

    return Stat;

    function createOrUpdate(stat) {
      if (stat._id) {
        return stat.$update(onSuccess, onError);
      } else {
        return stat.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(stat) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  // Configuring the Users module
  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Clients',
      state: 'admin.users'
    });
  }
}());

(function () {
  'use strict';

  // Setting up route
  angular
  .module('users.admin.routes')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('admin.users', {
      url: '/users',
      templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
      controller: 'UserListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Users List'
      }
    })
    .state('admin.user', {
      url: '/users/:userId',
      templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        userResolve: getUser
      },
      data: {
        pageTitle: 'Edit {{ userResolve.displayName }}'
      }
    })
    .state('admin.user-edit', {
      url: '/users/:userId/edit',
      templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        userResolve: getUser
      },
      data: {
        pageTitle: 'Edit User {{ userResolve.displayName }}'
      }
    })
    .state('admin.user-create', {
      url: '/users/create',
      templateUrl: 'modules/licenses/client/views/admin/edit-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        licenseResolve: newUser
      }
    });
  }
  getUser.$inject = ['$stateParams', 'AdminService'];

  function getUser($stateParams, AdminService) {
    return AdminService.get({
      userId: $stateParams.userId
    }).$promise;
  }
  newUser.$inject = ['AdminService'];

  function newUser(AdminService) {
    return new AdminService();
  }

}());

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService'];

  function UserListController($scope, $filter, AdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    AdminService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];

  function UserController($scope, $state, $window, Authentication, user) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.form = {};
    vm.remove = remove;
    vm.update = update;
    vm.save = save;
    vm.isContextUserSelf = isContextUserSelf;

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.users');
      }, function (errorResponse) {
        vm.error = errorResponse.data.message;
      });
    }

    // Save Client
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.userForm');
        return false;
      }

      // Create a new client, or update the current instance
      vm.user.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.users');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function AuthenticationController($scope, $state, UsersService, $location, $window, Authentication, PasswordValidator) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    function signin(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;

      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSignupError(response) {
      vm.error = response.data.message;
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;

      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSigninError(response) {
      vm.error = response.data.message;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['$scope', '$stateParams', 'UsersService', '$location', 'Authentication', 'PasswordValidator'];

  function PasswordController($scope, $stateParams, UsersService, $location, Authentication, PasswordValidator) {
    var vm = this;

    vm.resetUserPassword = resetUserPassword;
    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    function askForPasswordReset(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

        return false;
      }

      UsersService.requestPasswordReset(vm.credentials)
        .then(onRequestPasswordResetSuccess)
        .catch(onRequestPasswordResetError);
    }

    // Change user password
    function resetUserPassword(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

        return false;
      }

      UsersService.resetPassword($stateParams.token, vm.passwordDetails)
        .then(onResetPasswordSuccess)
        .catch(onResetPasswordError);
    }

    // Password Reset Callbacks

    function onRequestPasswordResetSuccess(response) {
      // Show user success message and clear form
      vm.credentials = null;
      vm.success = response.message;
    }

    function onRequestPasswordResetError(response) {
      // Show user error message and clear form
      vm.credentials = null;
      vm.error = response.data.message;
    }

    function onResetPasswordSuccess(response) {
      // If successful show success message and clear form
      vm.passwordDetails = null;

      // Attach user profile
      Authentication.user = response;
      // And redirect to the index page
      $location.path('/password/reset/success');
    }

    function onResetPasswordError(response) {
      vm.error = response.data.message;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$scope', '$http', 'Authentication', 'UsersService', 'PasswordValidator'];

  function ChangePasswordController($scope, $http, Authentication, UsersService, PasswordValidator) {
    var vm = this;

    vm.user = Authentication.user;
    vm.changeUserPassword = changeUserPassword;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // Change user password
    function changeUserPassword(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.passwordForm');

        return false;
      }

      UsersService.changePassword(vm.passwordDetails)
        .then(onChangePasswordSuccess)
        .catch(onChangePasswordError);
    }

    function onChangePasswordSuccess(response) {
      // If successful show success message and clear form
      $scope.$broadcast('show-errors-reset', 'vm.passwordForm');
      vm.success = true;
      vm.passwordDetails = null;
    }

    function onChangePasswordError(response) {
      vm.error = response.data.message;
    }
  }
}());

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture',
      alias: 'newProfilePicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);

(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication'];

  function EditProfileController($scope, $http, $location, UsersService, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication'];

  function SettingsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .directive('passwordValidator', passwordValidator);

  passwordValidator.$inject = ['PasswordValidator'];

  function passwordValidator(PasswordValidator) {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      ngModel.$validators.requirements = function (password) {
        var status = true;
        if (password) {
          var result = PasswordValidator.getResult(password);
          var requirementsIdx = 0;

          // Requirements Meter - visual indicator for users
          var requirementsMeter = [{
            color: 'danger',
            progress: '20'
          }, {
            color: 'warning',
            progress: '40'
          }, {
            color: 'info',
            progress: '60'
          }, {
            color: 'primary',
            progress: '80'
          }, {
            color: 'success',
            progress: '100'
          }];

          if (result.errors.length < requirementsMeter.length) {
            requirementsIdx = requirementsMeter.length - result.errors.length - 1;
          }

          scope.requirementsColor = requirementsMeter[requirementsIdx].color;
          scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

          if (result.errors.length) {
            scope.getPopoverMsg = PasswordValidator.getPopoverMsg();
            scope.passwordErrors = result.errors;
            status = false;
          } else {
            scope.getPopoverMsg = '';
            scope.passwordErrors = [];
            status = true;
          }
        }
        return status;
      };
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .directive('passwordVerify', passwordVerify);

  function passwordVerify() {
    var directive = {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      var status = true;
      scope.$watch(function () {
        var combined;
        if (scope.passwordVerify || ngModel) {
          combined = scope.passwordVerify + '_' + ngModel;
        }
        return combined;
      }, function (value) {
        if (value) {
          ngModel.$validators.passwordVerify = function (password) {
            var origin = scope.passwordVerify;
            return (origin === password);
          };
        }
      });
    }
  }
}());

(function () {
  'use strict';

  // Users directive used to force lowercase input
  angular
    .module('users')
    .directive('lowercase', lowercase);

  function lowercase() {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  }
}());

(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
}());

(function () {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    var service = {
      getResult: getResult,
      getPopoverMsg: getPopoverMsg
    };

    return service;

    function getResult(password) {
      var result = owaspPasswordStrengthTest.test(password);
      return result;
    }

    function getPopoverMsg() {
      var popoverMsg = 'Please enter a passphrase or password with ' + owaspPasswordStrengthTest.configs.minLength + ' or more characters, numbers, lowercase, uppercase, and special characters.';

      return popoverMsg;
    }
  }

}());

(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
  .module('users.services')
  .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource'];

  function UsersService($resource) {
    var Users = $resource('api/users', {}, {
      update: {
        method: 'PUT'
      },
      updatePassword: {
        method: 'POST',
        url: 'api/users/password'
      },
      deleteProvider: {
        method: 'DELETE',
        url: 'api/users/accounts',
        params: {
          provider: '@provider'
        }
      },
      sendPasswordResetToken: {
        method: 'POST',
        url: 'api/auth/forgot'
      },
      resetPasswordWithToken: {
        method: 'POST',
        url: 'api/auth/reset/:token'
      },
      signup: {
        method: 'POST',
        url: 'api/auth/signup'
      },
      signin: {
        method: 'POST',
        url: 'api/auth/signin'
      }
    });

    angular.extend(Users, {
      changePassword: function (passwordDetails) {
        return this.updatePassword(passwordDetails).$promise;
      },
      removeSocialAccount: function (provider) {
        return this.deleteProvider({
          provider: provider // api expects provider as a querystring parameter
        }).$promise;
      },
      requestPasswordReset: function (credentials) {
        return this.sendPasswordResetToken(credentials).$promise;
      },
      resetPassword: function (token, passwordDetails) {
        return this.resetPasswordWithToken({
          token: token // api expects token as a parameter (i.e. /:token)
        }, passwordDetails).$promise;
      },
      userSignup: function (credentials) {
        return this.signup(credentials).$promise;
      },
      userSignin: function (credentials) {
        return this.signin(credentials).$promise;
      }
    });

    return Users;
  }

  // TODO this should be Users service
  angular
  .module('users.admin.services')
  .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource'];
  
  function AdminService($resource) {
    var User = $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(User.prototype, {
      createOrUpdate: function () {
        var user = this;
        return createOrUpdate(user);
      }
    });

    return User;

    function createOrUpdate(user) {
      if (user._id) {
        return user.$update(onSuccess, onError);
      } else {
        return user.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(user) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('zones.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('zones', {
        abstract: true,
        url: '/zones',
        template: '<ui-view/>'
      })
      .state('zones.list', {
        url: '',
        templateUrl: 'modules/zones/client/views/list-zones.client.view.html',
        controller: 'ZonesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Zones'
        }
      })
      .state('zones.create', {
        url: '/create',
        templateUrl: 'modules/zones/client/views/form-zone.client.view.html',
        controller: 'ZonesController',
        controllerAs: 'vm',
        resolve: {
          zoneResolve: newZone
        }
      })
      .state('zones.edit', {
        url: '/:zoneId/edit',
        templateUrl: 'modules/zones/client/views/form-zone.client.view.html',
        controller: 'ZonesController',
        controllerAs: 'vm',
        resolve: {
          zoneResolve: getZone
        }
      });
  }

  getZone.$inject = ['$stateParams', 'ZonesService'];

  function getZone($stateParams, ZonesService) {
    return ZonesService.get({
      zoneId: $stateParams.zoneId
    }).$promise;
  }

  newZone.$inject = ['ZonesService'];

  function newZone(ZonesService) {
    return new ZonesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('zones')
    .controller('ZonesListController', ZonesListController);

  ZonesListController.$inject = ['$scope', '$filter', 'ZonesService', 'Authentication'];

  function ZonesListController($scope, $filter, ZonesService, Authentication) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;
    vm.authentication = Authentication;

    ZonesService.query(function (data) {
      vm.zones = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 10;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.zones, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

  }
}());

(function () {
  'use strict';

  angular
  .module('zones')
  .controller('ZonesController', ZonesController);

  ZonesController.$inject = ['$scope', '$state', '$window', 'AreasService', 'zoneResolve', 'Authentication'];

  function ZonesController($scope, $state, $window, AreasService, zone, Authentication) {
    var vm = this;

    vm.zone = zone;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    AreasService.query(function (data) {
      vm.areas = data;
    });

    // Remove existing Zone
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cette zone?')) {
        vm.zone.$remove(function() {
          $state.go('zones.list');
        });
      }
    }

    // Save Zone
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.zoneForm');
        return false;
      }

      // Create a new zone, or update the current instance
      vm.zone.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('zones.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('zones.services')
    .factory('ZonesService', ZonesService);

  ZonesService.$inject = ['$resource'];

  function ZonesService($resource) {
    var Zone = $resource('api/zones/:zoneId', {
      zoneId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Zone.prototype, {
      createOrUpdate: function () {
        var zone = this;
        return createOrUpdate(zone);
      }
    });

    return Zone;

    function createOrUpdate(zone) {
      if (zone._id) {
        return zone.$update(onSuccess, onError);
      } else {
        return zone.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(zone) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
