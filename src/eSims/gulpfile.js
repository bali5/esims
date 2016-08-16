var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');

var tsScriptsProject = ts.createProject('./Client/scripts/tsconfig.json');

var rootSourcePath = './';
var libsSourcePath = rootSourcePath + 'node_modules/';
var libsSourcePaths = [
  libsSourcePath + '@angular**/**/*.js',
  libsSourcePath + 'systemjs**/dist/system**.js',
  libsSourcePath + 'core-js**/client/shim.min.js',
  libsSourcePath + 'zone.js**/dist/zone.js',
  libsSourcePath + 'reflect-metadata**/Reflect.js',
  libsSourcePath + 'rxjs**/**/*.js',
  libsSourcePath + 'material-design-icons**/iconfont/*',
  libsSourcePath + 'lodash**/lodash.js',
  //Override angular material 2 alpha
  rootSourcePath + 'libs/@angular**/**/*.js'
];
var scriptsSourcePath = rootSourcePath + 'Client/scripts/**/*';
var scriptsSourcePaths = [
  scriptsSourcePath + '.js',
];
var tsScriptsSourcePaths = [
  scriptsSourcePath + '.ts',
];
var stylesSourcePath = rootSourcePath + 'Client/styles/**/*';
var imagesSourcePath = rootSourcePath + 'Client/images/**/*';
var imagesSourcePaths = [

];
var viewsSourcePaths = [
  rootSourcePath + 'Client/views/**/*.html'
];
var indexSourcePaths = [
  rootSourcePath + 'Client/index.html',
  rootSourcePath + 'Client/favicon.ico'
];

var rootDestinationPath = './wwwroot/';
var libsDestinationPath = rootDestinationPath + 'libs/';
var scriptsDestinationPath = rootDestinationPath + 'scripts/';
var imagesDestinationPath = rootDestinationPath + 'images/';
var stylesDestinationPath = rootDestinationPath + 'styles/';
var viewsDestinationPath = rootDestinationPath + 'views/';
var indexDestinationPath = rootDestinationPath;

// Delete the dist directories
gulp.task('clean', ['cleanScripts', 'cleanImages', 'cleanLibs']);

// Delete the dist directories
gulp.task('cleanScripts', function () {
  return gulp
    .src(scriptsDestinationPath)
    .pipe(clean())
  ;
});

// Delete the dist directories
gulp.task('cleanImages', function () {
  return gulp
    .src(imagesDestinationPath)
    .pipe(clean())
  ;
});

// Delete the dist directories
gulp.task('cleanStyles', function () {
  return gulp
    .src(stylesDestinationPath)
    .pipe(clean())
  ;
});

// Delete the dist directories
gulp.task('cleanLibs', function () {
  return gulp
    .src(libsDestinationPath)
    .pipe(clean())
  ;
});

// Delete the dist directories
gulp.task('cleanViews', function () {
  return gulp
    .src(viewsDestinationPath)
    .pipe(clean())
  ;
});

// Delete the dist index
gulp.task('cleanIndex', function () {
  return gulp
    .src(indexDestinationPath + '/index.html')
    .pipe(clean())
  ;
});

// Minify and copy all JavaScript (except vendor scripts)
// with sourcemaps all the way down
gulp.task('libs', ['cleanLibs'], function () {
  return gulp.src(libsSourcePaths)
    .pipe(sourcemaps.init())
    .pipe(gulp.dest(libsDestinationPath));
});

// Minify and copy all JavaScript (except vendor scripts)
// with sourcemaps all the way down
gulp.task('scripts', ['tsscripts'], function () {
  return gulp.src(scriptsSourcePaths)
    .pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptsDestinationPath));
});

gulp.task('tsscripts', ['cleanScripts'], function () {
  return tsScriptsProject.src(tsScriptsSourcePaths)
    .pipe(sourcemaps.init())
    .pipe(ts(tsScriptsProject))
    //.pipe(uglify())
    //.pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptsDestinationPath));
});

// Minify and copy all Styles
// with sourcemaps all the way down
gulp.task('styles', ['cleanStyles'], function () {
  return gulp.src(stylesSourcePath)
    //.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    //.pipe(concat('styles.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesDestinationPath));
});

// Copy all static images
gulp.task('images', ['cleanImages'], function () {
  return gulp.src(imagesSourcePaths)
    // Pass in options to the task
    //.pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(imagesDestinationPath));
});

// Copy all static images
gulp.task('views', ['cleanViews'], function () {
  return gulp.src(viewsSourcePaths)
    .pipe(gulp.dest(viewsDestinationPath));
});

// Copy all static images
gulp.task('index', ['cleanIndex'], function () {
  return gulp.src(indexSourcePaths)
    .pipe(gulp.dest(indexDestinationPath));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(scriptsSourcePath, ['scripts']);
  gulp.watch(imagesSourcePaths, ['images']);
  gulp.watch(stylesSourcePath, ['styles']);
  gulp.watch(viewsSourcePaths, ['views']);
  gulp.watch(indexSourcePaths, ['index']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'libs', 'styles', 'index', 'views']);
