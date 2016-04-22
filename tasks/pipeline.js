/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css',
  'bower_components/nvd3/build/nv.d3.css',
  'bower_components/angular-material/angular-material.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/angular/angular.min.js',
  'bower_components/angular-resource/angular-resource.min.js',
  'bower_components/angular-animate/angular-animate.min.js',
  'bower_components/angular-cookies/angular-cookies.min.js',
  'bower_components/angular-aria/angular-aria.min.js',
  'bower_components/d3/d3.min.js',
  'bower_components/nvd3/build/nv.d3.min.js',
  'bower_components/angular-nvd3/dist/angular-nvd3.min.js',
  'bower_components/angular-touch/angular-touch.min.js',
  'bower_components/angular-sanitize/angular-sanitize.min.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'bower_components/angular-messages/angular-messages.min.js',
  'bower_components/angular-material/angular-material.min.js',
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'app/**/*.js',
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'app/views/**/*.html',
  'templates/**/*.html'
];


// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function (cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function (jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function (tplPath) {
  return require('path').join('assets/', tplPath);
});


