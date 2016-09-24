module.exports = function (gulp, plugins, task) {
  let sourceRoot = './views/';
  let sourcePath = [
    sourceRoot + '**/*.html'
  ];
  let destinationPath = './../eSims/wwwroot/views/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
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