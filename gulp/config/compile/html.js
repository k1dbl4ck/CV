import gulp from "gulp";
import gulp_if from "gulp-if";
import useref from "gulp-useref";
import uglify from "gulp-uglify";
import csso from "gulp-csso";
import lazypipe from "lazypipe";
import { dest, src } from "../paths.js";

gulp.task("html", function () {
  let cssChannel = lazypipe().pipe(csso);

  return gulp
    .src([src.hbs])
    .pipe(gulp_if("*.js", uglify()))
    .pipe(gulp_if("*.css", cssChannel()))
    .pipe(
      useref({
        searchPath: `{${src.root}, .}`,
      })
    )
    .pipe(gulp.dest(dest.root));
});
