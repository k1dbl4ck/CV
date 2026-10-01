import gulp from "gulp";
import jshint from "gulp-jshint";

gulp.task("jshint", function () {
  return gulp
    .src("app/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});
