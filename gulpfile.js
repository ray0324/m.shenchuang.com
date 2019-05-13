const gulp = require("gulp");
const less = require("gulp-less");
const minifycss = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const del = require("del");
const browsersync = require("browser-sync");

function clean() {
  return del(["dist/**/*"]);
}

function css() {
  return gulp
    .src(["./src/less/*.less", "!./src/less/var.less"])
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: ["chrome>40", "ie>=8", "firefox>25"],
        cascade: false
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest("./dist/css/"));
}

function js() {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(
      uglify({
        mangle: { reserved: ["require", "exports", "module", "$"] }
      })
    )
    .pipe(gulp.dest("./dist/js/"));
}

function html() {
  return gulp.src("./src/*.html").pipe(gulp.dest("./dist/"));
  // .pipe(browsersync.reload({ stream: true }))
}

function images() {
  return gulp.src(["./src/images/**/*"]).pipe(gulp.dest("./dist/images/"));
}

function vendor() {
  return gulp.src(["./src/vendor/**/*"]).pipe(gulp.dest("./dist/vendor/"));
}

function reload(cb) {
  browsersync.reload();
  cb();
}

function serve(cb) {
  browsersync({
    open: false,
    port: 4000,
    server: {
      baseDir: "./dist/",
      directory: true
    }
  });
  gulp.watch("src/less/**/*.less", css);
  gulp.watch("src/*.html", html);
  gulp.watch("src/js/*.js", js);
  gulp.watch("src/images/**/*", images);
  gulp.watch(
    ["*.html", "css/*.css", "js/**/*.js", "images/**/*"],
    { cwd: "dist" },
    reload
  );
  cb();
}

// function watch() {
//   gulp.series(gulp.parallel(html, images, vendor, css, js));
// }

exports.watch = gulp.series(
  clean,
  gulp.parallel(html, images, vendor, css, js),
  serve
);
exports.build = gulp.series(
  clean,
  gulp.parallel(html, images, vendor, css, js)
);
exports.clean = clean;
