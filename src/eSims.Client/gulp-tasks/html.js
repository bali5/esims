module.exports = function (gulp, plugins, task) {
  let sourceRoot = './html/';
  let sourcePath = [
    sourceRoot + '*.{html,ico}'
  ];
  let destinationPath = './../eSims/wwwroot/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath + '*.{html,ico}'])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};