import gulp from "gulp";
import * as sassDep from "sass";
import gulpSass from "gulp-sass";
import cssImport from "gulp-cssimport";
import plumber from "gulp-plumber";
import { dest, src } from "../paths.js";

const sass = gulpSass(sassDep);

gulp.task("styles", function () {
  return gulp
    .src(src.styles)
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(cssImport())
    .pipe(gulp.dest(dest.styles));
});
