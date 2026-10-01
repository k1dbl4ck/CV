import gulp from "gulp";
import cache from "gulp-cache";
import imagemin from "gulp-imagemin";

gulp.task("images", function () {
  return gulp
    .src("app/images/**/*")
    .pipe(
      cache(
        imagemin({
          progressive: true,
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest("public/images"));
});
