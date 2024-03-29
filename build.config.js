/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js', '!src/**/*.scenario.js', '!src/**/*.po.js', '!src/**/*.td.js', '!src/**/*.backend.js'],
    jsunit: [ 'src/**/*.spec.js' ],
    jsscenario:['src/**/*.scenario.js'],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    scss: ['src/style/main.scss'],

    scsspartial: ['src/**/*.scss'],
    scssall: ['src/style/*.scss', 'src/**/*.scss']

  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
        'bower_components/angular-mocks/angular-mocks.js',
        'src/**/*.td.js',
        'src/e2e-mocks.backend.js'
    ],

    preview: [
        'bower_components/angular-mocks/angular-mocks.js',
        'src/**/*.td.js',
        'src/e2e-mocks-preview.backend.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'bower_components/angular/angular.js',
      'bower_components/angular-foundation/mm-foundation.js',
      'bower_components/angular-foundation/mm-foundation-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angularjs-geolocation/src/geolocation.js',
      'bower_components/parse-js-sdk/lib/parse.js'
    ],
    css: [
    ],
    assets: [
        'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*'
    ]
  },

  app_config:{
      apiUrl: "https://tripsketchapi.azure-api.net/",
      imagesUrl: 'http://json.tripsketch.com/Images/',
      subscriptionKey: "94cd0af79015473090d46de32bc8e8ce",
      testApiUrl: "http://localhost:48130/"
  }
};
