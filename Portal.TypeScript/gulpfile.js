var gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
      pattern: [
        'gulp-*',
        'gulp.*',
        'del',
        'install'
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
    return gulp.src(config.bowerPaths).pipe($.install());
});

gulp.task("default", ["bower-clean", "bower-install"]);