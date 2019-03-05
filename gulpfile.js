// 依赖
var gulp = require('gulp');
// 进行实例化(gulp-load-plugins这个模块后面可以通过$来操作)
var $ = require('gulp-load-plugins')();
var ngHtml2js = require('gulp-ng-html2js');
var open = require('open');

var app = {
    srcPath: 'src/',   //源代码路径
    devPath: 'build/',  //整合后的路径，开发路径
    prdPath: 'dist/'  //生产环境路径
};

gulp.task('clean', function () {
    return gulp.src([app.devPath, app.prdPath,'tmp'])
    .pipe($.clean());
});
// 包管理文件
gulp.task('vendor',function () {
    return gulp.src(['src/bower_components/**/*'])
      .pipe(gulp.dest(app.prdPath + '/bower_components'))
  });

  gulp.task('lib',function () {
    return gulp.src('src/lib/**/*')
      .pipe(gulp.dest(app.prdPath+'lib'))
  });

  gulp.task('common',function () {
    return gulp.src('src/common/**/*')
      .pipe(gulp.dest(app.prdPath+'common'))
  });

/*
*  html任务
*  创建目录src，在src下创建index.html
*  创建视图模版目录view，在其中存放视图view的模版
*/
gulp.task('html2', function () {
    return gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.prdPath))
    // .pipe($.connect.reload());
});
/*
*  js任务
*  在src目录下创建script文件夹，里面存放所有的js文件
*/
var jsList = [
    'src/app/home/**/*.js',
    'src/app/common/**/*.js'
  ];
// jshint检验
gulp.task('jshint', function () {
    return gulp.src(jsList)
    .pipe($.jshint())
    .pipe($.jshint.reporter()); // 输出检查结果
});

//  gulp.task('templatesTpls', function () {
//     return gulp.src([
//         './src/app/home/*.html',
//       ])
//       .pipe(ngHtml2js())
//       .pipe($.concat("templatesTpls.min.js"))
//       .pipe($.uglify())
//       .pipe(gulp.dest('./tmp/templates'))
//   });

// // gulp.task('js', ['jshint'], function () {
// gulp.task('js',['templatesTpls'], function () {
//     return gulp.src(jsList)
//     .pipe($.ngAnnotate())
//     .pipe($.concat('app.min.js'))
//     .pipe($.uglify())
//     .pipe(gulp.dest(app.prdPath+'app/home'))
//     .pipe($.connect.reload());
//   });

gulp.task('js', function () {
    return gulp.src('src/app/home/**/*')
    .pipe(gulp.dest(app.prdPath+'app/home'))
  });

  gulp.task('jscommon', function () {
    return gulp.src('src/app/common/**/*')
    // .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath+'app/common'))
    // .pipe($.connect.reload());
  });


/*
*  css任务
*   
*/
gulp.task('css',function () {
    return gulp.src(app.srcPath + 'css/**/*.css')
    .pipe($.cssmin())
    .pipe($.concat('all.css'))
    .pipe(gulp.dest(app.prdPath + 'css'))
    // .pipe($.connect.reload());
});
gulp.task('cssInject',function(){
    gulp.src('./dist/index.html')
    .pipe($.inject(gulp.src('./dist/css/all.css',{read: false}),{relative: true}))
    .pipe($.inject(gulp.src('./dist/bower_components/common/**/*.css',{read: false}),{name: 'bower',relative: true}))
    .pipe(gulp.dest('dist'));
})


// gulp.task('html', ['copyTemplatesToDist', 'copyTplsToDist'], function () {
gulp.task('html', function () {
    return gulp.src(['src/index.html'])
      .pipe(gulp.dest(app.prdPath))
  })
// 总任务
gulp.task('build', [ 'css','lib','common','html','js','jscommon','vendor','demo_watch' ,'html2','cssInject']);

// 服务
gulp.task('serve',function () {
    $.connect.server({   //启动一个服务器
        root: ['src'], // 服务器从哪个路径开始读取，默认从开发路径读取
        livereload: true,  // 自动刷新
        port: 8080
    });
    // 打开浏览器
    open('http://localhost:8080/#home');
});

gulp.task('demo_watch', function() {
// 监听
 gulp.watch('app/bower_components/**/*', ['lib']);
 gulp.watch(app.srcPath + '**/*.html', ['html2']);
 gulp.watch(app.srcPath + 'src/index.html', ['html']);
 gulp.watch(app.srcPath + 'src/css/**/*.css', ['css']);
 gulp.watch(app.srcPath + 'src/app/common/**/*', ['jscommon']);
 gulp.watch(app.srcPath + 'src/app/home/**/*', ['js']);
//  gulp.watch(app.srcPath + 'image/**/*', ['image']);
})


// 定义default任务
gulp.task('default', ['clean'], function () {
    gulp.start('build');
  });
