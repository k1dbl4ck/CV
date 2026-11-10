import gulp from "gulp";
import jshint from "gulp-jshint";
import { src } from "../paths.js";

gulp.task("jshint", function () {
  return gulp
    .src(src.js, { allowEmpty: true })
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"));
});
