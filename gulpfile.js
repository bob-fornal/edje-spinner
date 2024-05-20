const { src, dest } = require('gulp');
const gulp = require('gulp');

const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const modifyFile = require('gulp-modify-file');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const log = require('fancy-log');

const files = {
  'eddie-golf.svg': 'const eddieGolf = `',
  'eddie-green-beret.svg': 'const eddieGreenBeret = `',
  'eddie-guitar.svg': 'const eddieGuitar = `',
  'eddie-knight.svg': 'const eddieKnight = `',
  'eddie-leprechaun.svg': 'const eddieLeprechaun = `',
  'eddie-mandalorian.svg': 'const eddieMandalorian = `',
  'eddie-silver.svg': 'const eddieSilver = `',
  'eddie.svg': 'const eddie = `',
  'le.svg': 'const le = `',
};

gulp.task('javascript', () => {
  return gulp.src('images/optimized/*.svg')
    .pipe(modifyFile((content, path, file) => {
      const _path = file.history[0];
      const filename = _path.replace(file._base + '/', '');
      const start = files[filename];
      const end = '`;';
      log(`--- ${filename}`);

      return `${start}${content}${end}`;
    }))
    .pipe(rename((path) => {
      path.extname = '.js';
    }))
    .pipe(gulp.dest('images/build'));
});

gulp.task('svg', () => {
  return gulp.src('images/source/*')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('images/optimized'));
});

gulp.task('build', () => {
  return src([
    'images/build/*.js',
    'edje-spinner.js',
  ])
    .pipe(concat('edje-spinner.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/'));
});

function defaultTask(cb) {
  gulp.series('svg', 'javascript', 'build')();
  cb();
}

exports.default = defaultTask;