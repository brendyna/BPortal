var gulp = require('gulp'),
    bower = require('gulp-bower'),
    $ = require('gulp-load-plugins')({
        pattern: [
        'del'
        ]
    });

// Path settings for Gulp
var config = {
    bowerInstallPaths: [
      './Portal.TypeScript/bower_components'
    ],
    bowerPaths: [
      './Portal.TypeScript/bower.json'
    ]
};

// Gulp task to remove all bower_components directories
gulp.task('bower-clean', function (cb) {
    return $.del(config.bowerInstallPaths, cb);
});

// Gulp task to install bower packages
gulp.task('bower-install', function () {
    return bower();
});

gulp.task("default", ["bower-clean", "bower-install"]);