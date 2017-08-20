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
// SASS / CSS
//--------------------------------------*/

const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');

//--------------------------------------*\
// IMAGES
//--------------------------------------*/

const imagemin = require('gulp-imagemin');

//--------------------------------------*\
// OTHER
//--------------------------------------*/

const browserSync = require('browser-sync').create();


//--------------------------------------*\
// BROWSER SYNC
// Used for browser hot reloading
//--------------------------------------*/

gulp.task('browser-sync', ['sass', 'js', 'html', 'sass-lint', 'js-hint'], () => {

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
    gulp.watch(["src/js/**/*.js"], ['js-hint', 'js']);
    gulp.watch("src/css/**/*.scss", ['sass', 'sass-lint']).on('change', browserSync.reload);
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

gulp.task('js-hint', () => {
    return gulp.src(['src/js/**/*.js'])
        .pipe(jshint({
            'esversion': 6
        }))
        .pipe(jshint.reporter(stylish))
});

gulp.task('sass-lint', function () {
    return gulp.src("src/css/**/*.scss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src("src/css/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'))
});

gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter())
});


//----------------------------------*\
// BUILD DOCS FILES
//----------------------------------*/

gulp.task('build-docs', () => {
    jsBuild();
    htmlBuild();
    cssBuild();
    imageCompressAndBuild();
});


const jsBuild = () => {
    return gulp.src('./src/bundle.js')
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest('./docs/js/'));
};

const htmlBuild = () => {
    return gulp.src('./src/index.html')
        // .pipe(htmlreplace({
        //     'css': './css/style.css',
        //     'js': './js/bundle.js'
        // }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./docs'))
};

const cssBuild = () => {
    return gulp.src('src/css/style.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('docs/css/'))
};

const imageCompressAndBuild = () => {
    gulp.src('src/image/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('docs/image/'));
}

//----------------------------------*\
// DEFAULT
//----------------------------------*/
gulp.task('default', ['browser-sync']);