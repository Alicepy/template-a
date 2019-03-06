// 依赖
var gulp = require('gulp');
// 进行实例化(gulp-load-plugins这个模块后面可以通过$来操作)
var $ = require('gulp-load-plugins')();
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
/*
*  图片任务
*/
gulp.task('images',function () {
return gulp.src('src/images/**/*')
.pipe($.imagemin({
    optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
    interlaced: true       //类型：Boolean 默认：false 隔行扫描gif进行渲染
}))
    .pipe(gulp.dest(app.prdPath+'images'))
});
//   路由
gulp.task('router',function () {
return gulp.src('src/app/router/*.js')
    .pipe(gulp.dest(app.prdPath+'app/router'))
});

/*
*  html任务
*  创建目录src，在src下创建index.html
*  创建视图模版目录view，在其中存放视图view的模版
*/
gulp.task('html', function () {
    return gulp.src(['src/index.html'])
      .pipe(gulp.dest(app.prdPath))
})

/*
*  htmlTpl任务
*  html代码片段任务
*/
var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};
gulp.task('htmlTpl', function () {
    return gulp.src(app.srcPath + 'app/**/*.html')
    .pipe($.htmlmin(options))
    .pipe(gulp.dest(app.prdPath+'app'))
});
/*
*  js任务
*  在src目录下创建script文件夹，里面存放所有的js文件
*/
var jsList = [
    'src/app/demo/**/*.js',
    'src/app/common/**/*.js',
    'src/app/router/*.js'
  ];
// jshint检验
gulp.task('jshint', function () {
    return gulp.src(jsList)
    .pipe($.jshint())
    .pipe($.jshint.reporter()); // 输出检查结果
});


gulp.task('js', function () {
    return gulp.src('src/app/demo/**/*.js')
    // .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath+'app/demo'))
});

gulp.task('jscommon', function () {
    return gulp.src('src/app/common/**/*.js')
    // .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath+'app/common'))
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
});
// index注入
gulp.task('cssInject',function(){
    gulp.src('./dist/index.html')
    .pipe($.inject(gulp.src('./dist/css/all.css',{read: false}),{relative: true}))
    .pipe($.inject(gulp.src('./dist/bower_components/common/**/*.css',{read: false}),{name: 'bower',relative: true}))
    .pipe(gulp.dest('dist'));
})

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
    gulp.watch(app.srcPath + 'bower_components/**/*', ['vendor']);
    gulp.watch(app.srcPath + '**/*.html', ['htmlTpl']);
    gulp.watch(app.srcPath + 'css/**/*.css', ['css']);
    gulp.watch(app.srcPath + 'app/common/**/*.js', ['jscommon']);
    gulp.watch(app.srcPath + 'app/demo/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'images/**/*', ['image']);
    gulp.watch(app.srcPath + 'index.html', ['html']);
    gulp.watch(app.srcPath + 'app/router/*.js', ['router']);
})

// 定义default任务
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

  // 总任务
gulp.task('build', [ 'html','htmlTpl','css','router','js','jscommon','vendor','images','demo_watch' ],function(){
    gulp.start('cssInject');
});
