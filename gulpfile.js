var gulp = require('gulp');
var rjs = require('requirejs');

var config = require("./option");

gulp.task('build', function(cb){
  rjs.optimize(config, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});

gulp.task('default', ['build']);
