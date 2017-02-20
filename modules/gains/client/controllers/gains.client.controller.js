(function () {
  'use strict';

  angular
  .module('gains', ['froala'])
  .value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Saisir le contenu du gain'
  })
  .controller('GainsController', GainsController);

  GainsController.$inject = ['$scope', '$state', '$window', '$timeout', 'gainResolve', 'SignalsService', 'Authentication', 'FileUploader'];

  function GainsController($scope, $state, $window, $timeout, gain, SignalsService, Authentication, FileUploader) {
    var vm = this;
    vm.gain = gain;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.imageURL = vm.gain.gainImageURL;

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
        return '|jpg|png|jpeg|bmp|gif'.indexOf(type) !== -1;
      }
    });

    //Called after the user selected a new gain picture file
    $scope.uploader.onAfterAddingFile = function(fileItem) {
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

    //Called after a user has successfully uploaded a new gain picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after a user has failed to upload a new gain picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change gain picture
    $scope.uploadGainPicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    } ;

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      vm.imageURL = vm.gain.gainImageURL;
    };


    /* Wysiwyg */
    $scope.titleOptions = {
      placeholderText: 'Add a Title',
      charCounterCount: false,
      toolbarInline: true,
      events: {
        'froalaEditor.initialized': function() {
          console.log('initialized');
        }
      }
    };

    /* File Uploader */
  /*  $scope.uploadFiles = function(file, errFiles) {
        $scope.uploadedFile = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/api/uploads',
                data: {uploadedFile: file}
            });

            file.upload.then(function (response) {
                console.log('File is successfully uploaded to ' + response.data.uploadedURL);
                vm.gainPicture = response.data.uploadedURL;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
    };*/

    /*
    var file, data;

    $scope.onFile = function(blob) {
      Cropper.encode((file = blob)).then(function(dataUrl) {
        $scope.dataUrl = dataUrl;
        $timeout(showCropper);  // wait for $digest to set image's src
      });
    };*/

    /**
    * Croppers container object should be created in controller's scope
    * for updates by directive via prototypal inheritance.
    * Pass a full proxy name to the `ng-cropper-proxy` directive attribute to
    * enable proxing.
    */

    /*$scope.cropper = {};
    $scope.cropperProxy = 'cropper.first';*/

    /**
    * When there is a cropped image to show encode it to base64 string and
    * use as a source for an image element.
    */

    /*$scope.preview = function() {
      if (!file || !data) return;
      Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
        ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
      });
    };*/

    /**
    * Use cropper function proxy to call methods of the plugin.
    */

    /*$scope.clear = function(degrees) {
      if (!$scope.cropper.first) return;
      $scope.cropper.first('clear');
    };

    $scope.scale = function(width) {
      Cropper.crop(file, data)
      .then(function(blob) {
        return Cropper.scale(blob, { width: width });
      })
      .then(Cropper.encode).then(function(dataUrl) {
        ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
      });
    };*/

    /**
    * Object is used to pass options to initalize a cropper.
    * More on options - https://github.com/fengyuanchen/cropper#options
    */

    /*$scope.options = {
      maximize: true,
      aspectRatio: 2 / 1,
      crop: function(dataNew) {
        data = dataNew;
      }
    };*/

    /**
    * Showing (initializing) and hiding (destroying) of a cropper are started by
    * events. The scope of the `ng-cropper` directive is derived from the scope of
    * the controller. When initializing the `ng-cropper` directive adds two handlers
    * listening to events passed by `ng-cropper-show` & `ng-cropper-hide` attributes.
    * To show or hide a cropper `$broadcast` a proper event.
    */

    /*$scope.showEvent = 'show';
    $scope.hideEvent = 'hide';

    function showCropper() { $scope.$broadcast($scope.showEvent); }
    function hideCropper() { $scope.$broadcast($scope.hideEvent); }*/

    /* DATEPICKER */

    vm.gain.gainStartDate = new Date();
    vm.gain.gainEndDate = new Date();

    $scope.inlineOptions = {
    //  customClass: getDayClass,
      minDate: new Date(),
      showWeeks:'false',
      showButtonBar: 'false',
      //dateDisabled: disabled
    };

    $scope.dateOptions = {
      //dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    /*function disabled(data) {
      var date = data.date,
      mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }*/

    /*$scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };*/

    //$scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.showButtonBar = false;

    /*$scope.setDate = function(year, month, day) {
      vm.gain.gainEndDate = new Date(year, month, day);
      vm.gain.gainStartDate = new Date(year, month, day);
    };*/

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
    $scope.gains = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    /*function getDayClass(data) {
      var date = data.date,
      mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.gains.length; i++) {
          var currentDay = new Date($scope.gains[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.gains[i].status;
          }
        }
      }
      return '';
    }*/

    SignalsService.query(function (datas) {
      vm.gainSignals = datas;
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
      vm.hasSignal = xObj.includes(1);
    });

    //$scope.imageURL = vm.gain.gainPicture;

    // Create file uploader instance
    /*$scope.uploader = new FileUploader({
      url: 'api/gains/picture',
      alias: 'newGainPicture'
    });*/

    // Set file uploader image filter
    /*$scope.uploader.filters.push({
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
    };*/

    // Called after the user has successfully uploaded a new picture
  /*  $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.gain = response;

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
    };*/

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
