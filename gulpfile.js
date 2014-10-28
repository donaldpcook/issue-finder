'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  return browserify({
      entries: ['./app/js/app.js'],
      debug: true
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dest/js/'));
});

gulp.task('move', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('dest'));
});

gulp.task('server', ['browserify'], function() {
  connect.server({
    root: 'dest',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('./app/js/**/*.js', ['browserify']);
  gulp.watch('./app/index.html', ['move']);
});

gulp.task('default', ['browserify', 'move', 'server', 'watch']);
