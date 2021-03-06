/* 
 * File   : gulpfile.js
 * Date   : 22 Sep 16
 * Author : Jaymes Young-Liebgott
 */

"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
    uglifyCss = require('gulp-uglifycss'),
  browserSync = require('browser-sync').create();


// Concatenate JS files
gulp.task("concatScripts", function() {
  return gulp.src([
    'app/app.module.js',
    'app/config.js',
    'app/main.js',
    'app/directives.js',
    'app/add/add.directives.js',
    'app/update/update.directives.js',
    'app/filters.js',
    'app/login.js',
    'app/login.service.js',
    'app/cards.js',
    'app/cards.service.js',
    'app/words.js',
    'app/sentences.js',
    'app/admin.js',
    'app/add/add-item.service.js',
    'app/add/add-adjective.js',
    'app/add/add-category.js',
    'app/add/add-noun.js',
    'app/add/add-phrase.js',
    'app/add/add-sentence.js',
    'app/add/add-verb.js',
    'app/list-words.js',
    'app/update/update-item.service.js',
    'app/update/update-adjective.js',
    'app/update/update-category.js',
    'app/update/update-noun.js',
    'app/update/update-phrase.js',
    'app/update/update-sentence.js',
    'app/update/update-verb.js',
    'app/preloader.service.js'
  ])
      .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('app'));
});


// Concatenate JS files for watching with browserSync
gulp.task('watchJs', ['concatScripts'], function(done) {
  browserSync.reload();
  done();
});


// Minify JS scripts
gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('app/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('app'));
});


// Compile Sass
gulp.task('compileSass', function() {
  return gulp.src('assets/scss/styles.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('assets/css'));
});


// Complie Sass files for watching with browserSync
gulp.task('watchSass', ['compileSass'], function() {
  return gulp.src('assets/css/styles.css')
      .pipe(browserSync.stream());
});


// Minify Styles
gulp.task('minifyStyles', ['compileSass'], function() {
  return gulp.src('assets/css/styles.css')
      .pipe(uglifyCss())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest('assets/css'));
});


// Watch HTML
gulp.task('watchHtml', function(done) {
  browserSync.reload();
  done();
});


// Start server and watch files
gulp.task("serve", function() {
  browserSync.init({
    host: "http://flashcards/"
  });
    
  gulp.watch('assets/scss/**/*.scss', ['watchSass']);
  gulp.watch('app/**/*.js', ['watchJs']);
  gulp.watch('app/views/index.html', ['watchHtml']);
    
});



// Clean up files
gulp.task('clean', function() {
  del([
    'dist',
    'assets/css/styles*.css*',
    'app/app.js',
    'app/app.js.map',
    'app/app.min.js'
  ]);
});


// Build 
gulp.task('build', ['concatScripts', 'minifyStyles'], function() {
  return gulp.src([
    'index.html',
    'assets/css/styles.min.css',
    'assets/img/**',
    'app/app.js',
    'app/views/**',
    'assets/inc/*.php',
    '!assets/inc/db*.php',
    'assets/classes/*.php',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-cookies/angular-cookies.min.js'
  ], {base: './'})
      .pipe(gulp.dest('dist'));
});


// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});