import gulp from 'gulp';
import fs from 'node:fs';
import gulpLoadPlugins from 'gulp-load-plugins';
import size from 'gulp-size';

const $ = gulpLoadPlugins({
  config: process.env.npm_package_json,
});

const resume = () => {
  if (!fs.existsSync('resume.json')) {
    fs.createReadStream('resume-sample.json').pipe(fs.createWriteStream('resume.json'));
  }

  return gulp.src('public/**/*').pipe(size({
    title: 'build',
    gzip: true
  }));
}

gulp.task('resume', resume);
