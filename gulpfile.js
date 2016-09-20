'use strict';
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var filter = require('gulp-filter');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var path = require('path');

gulp.task('publish', function() {
  var templatesFilter = filter([
    'generatorsSrc/**/*.js',
    'libSrc/**/*.js',
    '!generatorsSrc/**/*/templates/**/*.js'
  ], { restore: true });

  var generatorsFilter = filter([
    'generatorsSrc/**/*.js'
  ], { restore: true });

  var libFilter = filter([
    'libSrc/**/*.js'
  ]);

  return gulp.src(['generatorsSrc/**/*.js', 'libSrc/**/*.js'])
    .pipe(templatesFilter)
    .pipe(babel())
    .pipe(templatesFilter.restore)
    .pipe(generatorsFilter)
    .pipe(gulp.dest('generators'))
    .pipe(generatorsFilter.restore)
    .pipe(libFilter)
    .pipe(gulp.dest('lib'));
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
