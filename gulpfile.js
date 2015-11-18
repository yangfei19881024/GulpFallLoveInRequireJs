var gulp = require('gulp');
var path = require("path");
var $ = require("gulp-load-plugins")();
var rjs = require('requirejs');
var rjs_config = require("./option");

//配置路径
var config = {
  root:'www',
  sassfile:"www/scss/**/*.scss",
  es6file:"www/es6/**/*.js",
  htmlfile:"www/views/*.html",
  dist:"./dist"
};

gulp.task('es62es5', function(){
    return gulp.src(config.es6file)
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('www/js/'))
        .pipe($.connect.reload())
});


gulp.task('compass', function() {
  gulp.src(config.sassfile)
    .pipe($.plumber())
    .pipe($.compass({
      project: path.join(__dirname,'www'),
      css: 'css',
      sass: 'scss',
      // style:'compressed'
    }))
    .pipe(gulp.dest('www/css/'))
    .pipe($.connect.reload())
});

gulp.task('html', function() {
    return gulp.src('views/**/*.html')
        .pipe(gulp.dest(''))
        .pipe($.connect.reload())
});

//!!!!!!一定要注意－－－> watch 不能用 $.watch 而是用 gulp.watch
gulp.task("watch",function(){
  gulp.watch(config.sassfile,['compass']);
  gulp.watch(config.es6file,['es62es5']);
  gulp.watch(config.htmlfile,['html']);
});

gulp.task("connect",function(){
  $.connect.server({
    root:config.root,
    port: 3000,
    livereload: true
  });
});

gulp.task('build', function(cb){
  rjs.optimize(rjs_config, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});

gulp.task('server',['watch','connect','compass']);

gulp.task('build', ['build']);
