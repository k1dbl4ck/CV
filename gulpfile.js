import gulp from "gulp";

import "./gulp/config/util/watch.js";
import "./gulp/config/util/jshint.js";
import "./gulp/config/compile/styles.js";
import "./gulp/config/compile/html.js";
import "./gulp/config/compile/images.js";
import "./gulp/config/compile/extras.js";
import "./gulp/tasks/clean.js";
import "./gulp/tasks/resume.js";

const build = gulp.series(
  "clean",
  "styles",
  "html",
  "images",
  "extras",
  "resume"
);

gulp.task("build", build);
gulp.task("default", build);
