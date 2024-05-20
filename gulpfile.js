const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function defaultTask(cb) {
  return src([
    'images/*.js',
    'edje-spinner.js',
  ])
    .pipe(concat('edje-spinner.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/'));
  cb();
}

exports.default = defaultTask;