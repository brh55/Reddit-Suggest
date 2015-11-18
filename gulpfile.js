var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var shell       = require('gulp-shell');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var reload      = browserSync.reload;

// Task for easier development
gulp.task('serve', ['sass'], function () {
    gulp.watch('public/styles/**/*.scss', ['sass']);
    gulp.watch('public/*.html').on('change', reload);
});

// Compiling SASS, browserSync stream after compile
gulp.task('sass', function () {
    return gulp.src("public/styles/scss/app.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("public/styles/css"))
        .pipe(browserSync.stream());
});


// Install Dependencies on initial build
gulp.task('init', shell.task([
    'bower install',
    'npm install'
]));

gulp.task('start-server', shell.task([
    'npm start'
]));

// Build for Production
gulp.task('build', ['init', 'sass']);

// Default Task
gulp.task('default', ['serve']);
