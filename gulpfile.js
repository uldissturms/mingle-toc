'use strict';

let gulp = require('gulp');
let fs = require('fs');
let browserify = require('browserify');

gulp.task('browserify', [], () => {
  return browserify({ debug: true })
    .require('./public/main.js', { entry: true })
    .bundle()
    .pipe(fs.createWriteStream('./public/bundle.js'));
});

gulp.task('build', ['browserify']);
