var gulp = require('gulp'); 
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();

var pth = {
   src: 'src',
   build: 'build'
};



gulp.task('sass', function () {
  return gulp.src(pth.src + '/sass/*.sass')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest(pth.src + '/css'));
});

gulp.task('styles',['sass'], function() {
  return gulp.src(pth.src + '/css/*.css')
        .pipe(plugins.addSrc(mainBowerFiles()))
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(pth.build + '/css'))
});
 
gulp.task('scripts', function(){
   return gulp.src(pth.src + '/js/*.js')
       .pipe(plugins.concat('app.js'))
       .pipe(plugins.uglify())
       .pipe(gulp.dest(pth.build + '/js'))
});

gulp.task('html', function() {
   return gulp.src(pth.src + '/**/*.html')
       .pipe(plugins.htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest(pth.build))
});

gulp.task('images', function() {
   return gulp.src(pth.src + '/img/**/*')
       .pipe(plugins.imagemin({progressive: true}))
       .pipe(gulp.dest(pth.build + '/img'))
});

gulp.task('watch', ['browser-sync'], function(){
   gulp.watch(pth.src + '/css/**/*', ['bsync:styles']);
   gulp.watch(pth.src + '/**/*.html', ['bsync:html']);
   gulp.watch(pth.src + '/js/**/*', ['bsync:scripts']);
});

gulp.task('bsync:styles', ['styles'], function(){
   browserSync.reload();
});

gulp.task('bsync:html', ['html'], function(){
   browserSync.reload();
});

gulp.task('bsync:scripts', ['scripts'], function(){
   browserSync.reload();
});


// Static server
gulp.task('browser-sync', ['styles', 'html', 'images', 'scripts'], function() {
   browserSync.init({
      server: {
         baseDir: "./build"
      }
   });
});

gulp.task('clean', function(){
   return del('build');
});


gulp.task('build', ['clean','styles', 'html', 'images', 'scripts']);

gulp.task('serve', ['browser-sync', 'watch']);

