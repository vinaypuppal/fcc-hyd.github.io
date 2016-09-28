const gulp = require("gulp");
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('serve', () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    ghostMode: false,
    server: ['site'],
    port: 8080
  });
  
  gulp.watch(['site/**/*.html'], reload);
  gulp.watch(['site/styles/**/*.css'], reload);
  gulp.watch(['site/scripts/**/*.js'], reload);
  gulp.watch(['site/img/**/*'], reload);
})