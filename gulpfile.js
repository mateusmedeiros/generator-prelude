'use strict';
var path = require('path');
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var nsp = require('gulp-nsp');

gulp.task('build', function() {
  return gulp.src(['generators/**/*.js', '!generators/app/templates/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-1']          
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!generators/app/templates/**/*.js'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('default', ['eslint', 'nsp', 'build']);
