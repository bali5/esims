module.exports = function (gulp, plugins, task) {
  let Builder = require('systemjs-builder'); 

  let sourceRoot = './scripts/';
  let sourcePath = [
    sourceRoot + '**/*.ts'
  ];
  let buildPath = './build/scripts/';
  let destinationPath = './../eSims/wwwroot/scripts/';

  let project = plugins.typescript.createProject('./scripts/tsconfig.json', {
    typescript: require('typescript')
  });

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle', task + ':map', callback);
    },
    map: function () {
      return gulp.src(sourcePath)
        .pipe(gulp.dest(destinationPath + '../source/'));
    },
    build: function () {
      return project.src(sourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(project))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.', { includeContent: true }))
        .pipe(gulp.dest(buildPath));
    },
    bundle: function () {
      var builder = new Builder('', './scripts/system.config.js');
      //minify: true, 
      return builder.buildStatic('app', destinationPath + '/app.js', { sourceMaps: true });
    },
    clean: function () {
      return gulp.src([destinationPath, buildPath])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};