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
      'NgSwitchery',
      'ui.select2',
      //'summernote',
      'froala',
      //'ngTagsInput',
      'ngAudio',
      'ngMap',
      'ui.footable',
      'ngMessages',
      'angular-filepicker',
      //'ngCropper',
      //'angularFileUpload',
      //'ngFileUpload',
      //'ngImgCrop',
      'ngMaterial'
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
