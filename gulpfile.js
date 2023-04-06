const gulp = require("gulp");
const connect = require("gulp-connect");

gulp.task("serve", function () {
  connect.server({
    root: "./",
    livereload: true,
  });
});
