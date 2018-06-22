'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var svgmin = require('gulp-svgmin');
var del = require('del');

gulp.task('reviveSVG', function () {
    del(['svg_minified/**/*.svg'], function (err, deleted) {
        console.log('deleted: ' + deleted.join(','));
    });
    gulp.src('svg/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./svg_minified'));
});

gulp.task('browser-sync', function () {
    browserSync({
        files: ['js/**/*.js', '**/*.html', 'css/**/*.css'],
        server: {
            // baseDir: "./html"
            baseDir: "."
        },
        serveStatic: [{
            route: "css",
            dir: ["./css"]
        }, {
            route: "image",
            dir: ["./image"]
        }, {
            route: "js",
            dir: ["./js"]
        }, {
            route: "svg",
            dir: ["./svg"]
        }],
        port: 9001,
        open: false
    });
});

gulp.task('default', ['reviveSVG', 'browser-sync'], function () {
    gulp.watch(['svg/**/*.svg'], ['reviveSVG', 'browser-sync']);
});