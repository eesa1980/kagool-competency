'use strict';

//--------------------------------------*\
// GULP TOOLS
//--------------------------------------*/

const gulp = require('gulp');
const browserify = require('browserify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');

//--------------------------------------*\
// HTML
//--------------------------------------*/

const htmlmin = require('gulp-html-minifier');
const w3cjs = require('gulp-w3cjs');
const htmlreplace = require('gulp-html-replace');

//--------------------------------------*\
// JS
//--------------------------------------*/

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglify');

//--------------------------------------*\
// SASS
//--------------------------------------*/

const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');

//--------------------------------------*\
// OTHER
//--------------------------------------*/

const browserSync = require('browser-sync').create();


//--------------------------------------*\
// BROWSER SYNC
// Used for browser hot reloading
//--------------------------------------*/

gulp.task('browser-sync', ['sass', 'js', 'html'], () => {

    browserSync.init({
        injectChanges: true,
        server: "./src"
    });
    watch();
});

//--------------------------------------*\
// WATCH FOR CHANGES IN SPECIFIED FILES
//--------------------------------------*/

const watch = () => {
    gulp.watch(['src/js/**/*.js'], ['jsLint', 'js']);
    gulp.watch("src/scss/style.css", ['sass']).on('change', browserSync.reload);
    gulp.watch("./src/index.html", ['html']).on('change', browserSync.reload);
};


//--------------------------------------*\
// ERROR CHECKING, LINTING AND BUNDLING
//--------------------------------------*/

gulp.task('js', () => {
        const b = browserify({
            entries: './src/js/app.js',
            debug: true
        }).transform("babelify", {presets: ["es2015"]});

        return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .on('error', gutil.log)
            .pipe(gulp.dest('./src/'))
            .pipe(browserSync.stream());
    }
);

gulp.task('jsLint', () => {
    return gulp.src(['src/js/**/*.js'])
        .pipe(jshint({
            'esversion': 6
        }))
        .pipe(jshint.reporter(stylish))
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/scss/'))
});

gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter())
});


//----------------------------------*\
// BUILD DIST FILES
//----------------------------------*/

gulp.task('buildDist', () => {
    jsBuild();
    htmlBuild();
    sassBuild();
});


const jsBuild = () => {
    const b = browserify({
        entries: './src/js/app.js',
        debug: true
    }).transform("babelify", {presets: ["es2015"]});

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest('./dist/js/'));
};

const htmlBuild = () => {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': './css/style.css',
            'js': './js/bundle.js'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
};

const sassBuild = () => {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
};

