module.exports = function (gulp, plugins, task) {
  let sourceNode = './node_modules/';
  let sourceBower = './bower_components/';
  let sourcePath = [
    sourceNode + 'core-js/client/shim.min.js',
    sourceNode + 'zone.js/dist/zone.js',
    sourceNode + 'systemjs/dist/system.src.js',
    sourceNode + 'lodash**/lodash.js',
    // sourceBower + 'webcomponentsjs/webcomponents.min.js',
    // sourceBower + 'vaadin-grid/vaadin-grid.min.js',
    './scripts/system.config.js'
  ];

  let mapPathExt = '**/**/*.{js,ts}';
  let mapPath = [
    sourceNode + '@angular' + mapPathExt,
    sourceNode + '@angular2-material' + mapPathExt,
    sourceNode + 'angular2-in-memory-web-api' + mapPathExt,
    sourceNode + 'angular2-websocket' + mapPathExt,
    sourceNode + 'rxjs' + mapPathExt,
    sourceNode + 'ng2-table' + mapPathExt,
    sourceNode + 'numericjs' + mapPathExt,
    sourceNode + 'reflect-metadata' + mapPathExt,
    sourceNode + 'lodash' + mapPathExt,
    sourceNode + 'hammerjs' + mapPathExt,
    sourceNode + 'core-js' + mapPathExt,
    sourceNode + 'zone.js' + mapPathExt,
    sourceNode + 'systemjs' + mapPathExt,
    sourceNode + '@vaadin' + mapPathExt,
  ];

  let destinationPath = './../eSims/wwwroot/libs/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':map', task + ':bower', callback);
    },
    map: function () {
      return gulp.src(mapPath)
        .pipe(gulp.dest(destinationPath + '../eSims.Client/node_modules/', { overwrite: false }));
    },
    bower: function () {
      return gulp.src('./bower_components/**/*')
        .pipe(gulp.dest(destinationPath + '../bower_components', { overwrite: false }));
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
      return gulp.src([destinationPath, destinationPath + '../bower_components/'])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};