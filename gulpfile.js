'use strict';
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var filter = require('gulp-filter');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var path = require('path');

gulp.task('compile', function() {
  var srcFilter = filter([
    'src/**/*.js',
    '!src/**/*/templates/**/*.js'
  ], {restore: true});
  var templatesFilter = filter([
    'src/**/*/templates/**/*'
  ]);

  return gulp.src(['src/**/*'])
    .pipe(srcFilter)
    .pipe(babel())
    .pipe(srcFilter.restore)
    .pipe(gulp.dest('.'))
});

gulp.task('eslint', function() {
  return gulp.src(['src/**/*.js', '!src/generators/app/templates/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('default', ['eslint', 'nsp']);
