let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'run-sequence'],
  replaceString: /^(gulp)(-|\.)/
});
let taskListing = plugins.taskListing;

gulp.task('help', taskListing);

function initTasks(name) {
  let splits = name.split(':');
  let tasks = require('./gulp-tasks/' + splits[0])(gulp, plugins, splits[0]);
  for (let task in tasks) {
    if (task == 'default') {
      gulp.task(name, tasks[task]);
    } else {
      gulp.task(name + ':' + task, tasks[task]);
    }
  }
}

let buildTasks = [
  'scripts',
  'libs',
  'images',
  'views',
  'styles',
  'html',
];
let watchTasks = buildTasks.map((m) => m + ':watch');
let cleanTasks = buildTasks.map((m) => m + ':clean');
let tasks = [].concat(watchTasks, buildTasks);

for (let name of buildTasks) {
  initTasks(name);
}

gulp.task('default', tasks);
gulp.task('build', buildTasks);
gulp.task('clean', cleanTasks);
