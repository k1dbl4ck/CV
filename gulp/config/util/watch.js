import gulp from "gulp";
import browserSync from "browser-sync";
import log from "fancy-log";

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
      .watch(["public/**/*", "app/styles/**/*.scss", "resume.json"])
      .on("change", () => {
        log("test");
        // browserSync.reload;
      });

    gulp.watch("app/views/**/*.hbs", ["html"]).on("change", bs.reload);
    gulp.watch("app/images/**/*", ["images"]).on("change", bs.reload);
    gulp.watch("app/styles/**/*.scss", ["styles"]).on("change", () => {
      log("poop");
      // browserSync.reload;
    });
  }, 2500);
});
