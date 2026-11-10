import gulp from "gulp";
import cache from "gulp-cache";
import imagemin from "gulp-imagemin";
import { dest, src } from "../paths.js";

gulp.task("images", function () {
  return gulp
    .src(src.images, { allowEmpty: true })
    .pipe(
      cache(
        imagemin({
          progressive: true,
          interlaced: true,
        })
      )
    )
    .pipe(gulp.dest(dest.images));
});
