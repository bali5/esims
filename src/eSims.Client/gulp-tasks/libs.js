module.exports = function (gulp, plugins, task) {
  let sourceRoot = './node_modules/';
  let sourcePath = [
    sourceRoot + 'core-js/client/shim.min.js',
    sourceRoot + 'zone.js/dist/zone.js',
    sourceRoot + 'systemjs/dist/system.src.js',
    sourceRoot + 'lodash**/lodash.js',
    './scripts/system.config.js'
  ];
  let destinationPath = './../eSims/wwwroot/libs/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('libs.min.js'))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.', { includeContent: true }))
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