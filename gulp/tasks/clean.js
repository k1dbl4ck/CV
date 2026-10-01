import gulp from 'gulp';
import { deleteAsync } from 'del';

gulp.task('clean', () => deleteAsync(['.sass-cache', 'public']));
