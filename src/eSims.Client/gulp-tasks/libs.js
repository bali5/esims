module.exports = function (gulp, plugins, task) {
  let sourceRoot = './node_modules/';
  let sourcePath = [
    sourceRoot + 'core-js/client/shim.min.js',
    sourceRoot + 'zone.js/dist/zone.js',
    sourceRoot + 'systemjs/dist/system.src.js',
    sourceRoot + 'lodash**/lodash.js',
    './scripts/system.config.js'
  ];

  let mapPathExt = '**/**/*.{js,ts}';
  let mapPath = [
    sourceRoot + '@angular' + mapPathExt,
    sourceRoot + '@angular2-material' + mapPathExt,
    sourceRoot + 'angular2-in-memory-web-api' + mapPathExt,
    sourceRoot + 'angular2-websocket' + mapPathExt,
    sourceRoot + 'rxjs' + mapPathExt,
    sourceRoot + 'ng2-table' + mapPathExt,
    sourceRoot + 'numericjs' + mapPathExt,
    sourceRoot + 'reflect-metadata' + mapPathExt,
    sourceRoot + 'lodash' + mapPathExt,
    sourceRoot + 'hammerjs' + mapPathExt,
    sourceRoot + 'core-js' + mapPathExt,
    sourceRoot + 'zone.js' + mapPathExt,
    sourceRoot + 'systemjs' + mapPathExt
  ];

  let destinationPath = './../eSims/wwwroot/libs/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':map', callback);
    },
    map: function () {
      return gulp.src(mapPath)
        .pipe(gulp.dest(destinationPath + '../eSims.Client/node_modules/', { overwrite: false }));
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('libs.min.js'))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.', { includeContent: true, sourceRoot: '../eSims.Client/node_modules' }))
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};