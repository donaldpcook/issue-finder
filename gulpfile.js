'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    ngHtml2Js = require('gulp-ng-html2js');

gulp.task('buildTemplates', function() {
  gulp.src('./app/js/**/*.tpl.html')
    .pipe(ngHtml2Js({
      prefix: '/',
      moduleName: 'partials'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dest/js'))
    .pipe(connect.reload());
});

gulp.task('browserify', function() {
  return browserify({
      entries: ['./app/js/app.js'],
      debug: true
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dest/js/'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return gulp.src('app/scss/main.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gulp.dest('dest/css'));
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
  gulp.watch('./app/js/**/*.html', ['buildTemplates']);
  gulp.watch('./scss/**/*.scss', ['styles']);
  gulp.watch('./app/index.html', ['move']);
});

gulp.task('default', ['buildTemplates', 'browserify', 'move', 'server', 'watch']);


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}
