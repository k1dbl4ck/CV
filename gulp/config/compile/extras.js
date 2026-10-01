import gulp from 'gulp';

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*'
  ], {
    dot: true
  }).pipe(gulp.dest('public'));
});
