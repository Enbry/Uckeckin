'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/metisMenu/dist/metisMenu.min.css',
        'public/lib/fontawesome/css/font-awesome.min.css',
        'public/lib/angular-datatables/dist/css/angular-datatables.css',
        'public/lib/footable/css/footable.core.css',
        'public/lib/switchery/dist/switchery.min.css',
        'public/lib/select2/select2.css',
        'public/lib/ng-cropper/dist/ngCropper.all.min.css',
        'public/lib/iCheck/skins/all.css',
        'public/lib/froala-wysiwyg-editor/css/froala_editor.min.css',
        'public/lib/froala-wysiwyg-editor/css/froala_style.min.css',
        'public/lib/ng-img-crop/compile/minified/ng-img-crop.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/char_counter.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/code_view.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/colors.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/emoticons.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/file.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/fullscreen.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/image_manager.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/image.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/line_breaker.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/table.css',
        'public/lib/froala-wysiwyg-editor/css/plugins/video.css',
        'public/lib/angular-material/angular-material.min.css',
        'https://ajax.googleapis.com/ajax/libs/angular_material/0.11.2/angular-material.min.css',
        //'public/lib/ng-tags-input/ng-tags-input.min.css',
      ],
      js: [
        'public/lib/jquery/dist/jquery.min.js',
        //'public/lib/jquery/dist/jquery.js',
        'public/lib/jquery-ui/jquery-ui.min.js',
        'public/lib/iCheck/icheck.min.js',
        //'https://code.jquery.com/jquery-2.2.0.min.js',
        //'//cdnjs.cloudflare.com/ajax/libs/jquery.payment/1.2.3/jquery.payment.min.js',
        'https://js.stripe.com/v1/',
        'public/stripe-main.js',
        'public/stripe-validation.js',
        //'public/lib/ng-file-upload/dist/FileAPI.min.js',
        //'public/lib/ng-file-upload/dist/ng-file-upload-shim.min.js',
        'public/lib/angular/angular.js',
        '//api.filestackapi.com/filestack.js',
        'public/lib/angular-filepicker/dist/angular_filepicker.js',
        //'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
        //'public/lib/ng-file-upload/dist/ng-file-upload.min.js',
        //'public/lib/angular-file-upload/dist/angular-file-upload.min.js.map',
        'public/lib/angular-i18n/angular-locale_fr-fr.js',
        'public/lib/metisMenu/dist/metisMenu.min.js',
        'public/lib/pace/pace.min.js',
        'public/lib/summernote/dist/summernote.js',
        'public/lib/froala-wysiwyg-editor/js/froala_editor.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/align.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/char_counter.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/code_beautifier.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/code_view.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/colors.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/emoticons.min.j',
        'public/lib/froala-wysiwyg-editor/js/plugins/entities.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/file.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/font_family.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/font_size.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/fullscreen.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/image.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/image_manager.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/inline_style.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/line_breaker.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/link.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/lists.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/paragraph_format.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/paragraph_style.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/quote.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/save.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/table.min.js',
        'public/lib/froala-wysiwyg-editor/js/plugins/video.min.js',
        'public/lib/angular-froala/src/angular-froala.js',
        'public/lib/angular-material/angular-material.min.js',
        //'public/lib/ng-tags-input/ng-tags-input.min.js',
        'public/scripts.js',
        //'public/sig-test.js',
        //'public/signals.js',
        'public/lib/angular-datatables/dist/angular-datatables.min.js',
        'public/lib/angular-footable/dist/angular-footable.js',
        'public/lib/angular-footable/dist/angular-footable.min.js',
        'public/lib/footable/dist/footable.all.min.js',
        'public/lib/switchery/dist/switchery.min.js',
        'public/lib/ng-switchery/src/ng-switchery.js',
        'public/lib/select2/select2.js',
        'public/lib/angular-datepicker/dist/angular-datepicker.js',
        'public/lib/angular-audio/app/angular.audio.js',
        'public/lib/angular-ui-select2/src/select2.js',
        'public/lib/footable/js/footable.js',
        'public/lib/footable/js/footable.sort.js',
        'public/lib/footable/js/footable.filter.js',
        'public/lib/footable/js/footable.bookmarkable.js',
        'public/lib/footable/js/footable.paginate.js',
        'public/lib/angularUtils-pagination/dirPagination.js',
        'public/lib/datatables.net/js/jquery.dataTables.min.js',
        'https://cdn.socket.io/socket.io-1.4.5.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/ngmap/build/scripts/ng-map.min.js',
        'script-tags-for-development.js',
        'https://maps.google.com/maps/api/js?libraries=places&key=AIzaSyCib7he0l2FZItqgPvwoyl-Ql7QdS0BKns',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js',
        'https://ajax.googleapis.com/ajax/libs/angular_material/1.0.7/angular-material.min.js',
        'http://ngmaterial.assets.s3.amazonaws.com/svg-assets-cache.js',
        'public/lib/angular-sanitize/angular-sanitize.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};