import gulp from 'gulp';
import { dest, src } from '../paths.js';

gulp.task('extras', function () {
  return gulp.src([
    src.extras
  ], {
    dot: true,
    allowEmpty: true
  }).pipe(gulp.dest(dest.root));
});
