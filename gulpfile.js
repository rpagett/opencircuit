var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
  'react',
  'react-dom',
  'react-addons-css-transition-group',
  './node_modules/tether/dist/js/tether.min.js'
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('server', function () {
  nodemon({
    script: 'bin/server.js',
    watch: 'dist/js/bundle.js',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('scripts', function () {
  bundleApp(false);
});

gulp.task('deploy', function (){
  bundleApp(true);
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.jsx'], ['scripts']);
  gulp.watch(['./scss/**/*.scss'], ['styles']);
});

gulp.task('icons', function() {
  return gulp.src('./node_modules/font-awesome/fonts/**.*')
    .pipe(gulp.dest('./dist/assets/fonts'));
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch','styles']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
  scriptsCount++;
  // Browserify will bundle all our js files together in to one and will let
  // us use modules in the front end.
  var appBundler = browserify({
    entries: './src/browser.jsx',
    debug: true,
    extensions: [".jsx"]
  })

  // If it's not for production, a separate vendors.js file will be created
  // the first time gulp is run so that we don't have to rebundle things like
  // react everytime there's a change in the js file
  if (!isProduction && scriptsCount === 1){
    // create vendors.js for dev environment.
    browserify({
      require: dependencies,
      debug: true,
    })
      .bundle()
      .on('error', gutil.log)
      .pipe(source('vendor.js'))
      .pipe(gulp.dest('./dist/js/'));
  }
  if (!isProduction){
    // make the dependencies external so they dont get bundled by the
    // app bundler. Dependencies are already bundled in vendor.js for
    // development environments.
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    })
  }

  gulp.src('./src/**/*.jsx')
    .pipe(plugins.babel({
      presets: ['es2015', 'react', 'stage-1'],
      plugins: ["transform-decorators-legacy"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./bin/'));

  appBundler
  // transform ES6 and JSX to ES5 with babelify
    .transform("babelify", {
      presets: ["es2015", "react", "stage-1"],
      plugins: ["transform-decorators-legacy"],
      extensions: ['.jsx']
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js/'));
}

var dest = 'dist/';

gulp.task('styles', function() {
  //gulp.src('./node_modules/bootstrap/scss/bootstrap-flex.scss')
  gulp.src('./scss/app.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.rename('app.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest('dist/css'));
});

var errorHandler = function(error) {
  console.log(error.toString());
  this.emit('end');
}