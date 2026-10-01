import gulp from "gulp";
import gulp_if from "gulp-if";
import useref from "gulp-useref";
import uglify from "gulp-uglify";
import csso from "gulp-csso";
import lazypipe from "lazypipe";

gulp.task("html", function () {
  let cssChannel = lazypipe().pipe(csso);

  return gulp
    .src(["app/**/*.hbs"])
    .pipe(gulp_if("*.js", uglify()))
    .pipe(gulp_if("*.css", cssChannel()))
    .pipe(
      useref({
        searchPath: "{app, .}",
      })
    )
    .pipe(gulp.dest("public"));
});
