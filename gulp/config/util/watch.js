import gulp from "gulp";
import browserSync from "browser-sync";
import log from "fancy-log";
import { dest, src } from "../paths.js";

const bs = browserSync.create();

gulp.task("watch", function () {
  let ports = {
    serve: 3000,
    browserSync: 4001,
  };

  log("TESTING");

  setTimeout(function () {
    log("STARTING..");
    bs.init({
      proxy: "localhost:" + ports.serve,
      reloadDelay: 300,
      port: ports.browserSync,
    });

    // watch for changes
    gulp
      .watch([`${dest.root}/**/*`, src.stylesAll, "resume.json"])
      .on("change", () => {
        log("test");
        // browserSync.reload;
      });

    gulp.watch(src.views, ["html"]).on("change", bs.reload);
    gulp.watch(src.images, ["images"]).on("change", bs.reload);
    gulp.watch(src.stylesAll, ["styles"]).on("change", () => {
      log("poop");
      // browserSync.reload;
    });
  }, 2500);
});
