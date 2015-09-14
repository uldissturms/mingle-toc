'use strict';

let gulp = require('gulp');
let fs = require('fs');
let browserify = require('browserify');
let babelify = require('babelify');

const paths = {
  scripts: ['public/main.js']
};

gulp.task('browserify', () => {
  return browserify({ debug: true })
    .require('./public/main.js', { entry: true })
    .transform(babelify)
    .bundle()
    .pipe(fs.createWriteStream('./public/bundle.js'));
});

gulp.task('build', ['browserify']);

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['browserify']);
});

gulp.task('default', ['watch', 'browserify']);
