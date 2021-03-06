var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('all', function() {
    return gulp.src(['' +
    './js/colors.js',
    './js/pixelFont.js',
    './js/gameState.js',
    './js/explodedBall.js',
    './js/jsfxr.js',
    './js/sound.js',
    './js/score.js',
    './js/collision.js',
    './js/keyboardEvents.js',
    './js/objectFactory.js',
    './js/ball.js',
    './js/ring.js',
    './js/generator.js',
    './js/game.js'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(clean({force: true}))
        .pipe(gulp.dest('./dist/'));
});