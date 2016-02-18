'use strict';

const gulp			= require('gulp');
const gutil			= require('gulp-util');
const standards		= require('gulp-webstandards');
const watch			= require('gulp-watch');

const tasks			= './gulp/tasks/';
const config		= require('./gulp/config.js');

const app 			= config.app;
const asp			= config.asp;
const src			= config.src;
const path			= config.path;

let is = {
	webp: false,
	build: false,
	email: false,
	watch: false,
	uncss: false,
	webpack: false,
	typescript: false,
	coffee: false
};

if (typeof gutil.env !== 'undefined')
{
	for (let o in gutil.env)
	{
		if (typeof(is[o]) !== 'undefined')
		{
			is[o] = gutil.env[o];
		}
	}
}

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;

	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

lazyRequireTask('template', tasks + 'template', {
	src: path.assets.template,
	app: path.build.template,
	is:  is
});

lazyRequireTask('vendors', tasks + 'scripts', {
	src: path.assets.vendors,
	app: path.build.vendors,
	fn:  path.compile.vendor,
	rm:  true,
	is:  is
});

lazyRequireTask('scripts:app', tasks + 'scripts', {
	src: path.assets.scripts,
	app: path.build.scripts,
	fn:  path.compile.app,
	rm:  false,
	is:  is
});

lazyRequireTask('styles', tasks + 'styles', {
	src: path.assets.styles,
	app: path.build.styles,
	is:  is
});

lazyRequireTask('images', tasks + 'images', {
	src: path.assets.images,
	app: path.build.images,
	css: path.build.styles,
	is:  is
});

lazyRequireTask('tinypng', tasks + 'tinypng', {
	token: path.tinypng,
	src: path.assets.images + '.png',
	app: path.build.images,
	is:  is
});

lazyRequireTask('deploy', tasks + 'deploy', {
	app: app + '/**/*'
});

lazyRequireTask('test', tasks + 'test', {
	test: path.testfile,
	app: app + '/**/*'
});

lazyRequireTask('sprite', tasks + 'sprite', {
	src: path.assets.sprite,
	app: path.build.images,
	is:  is
});

lazyRequireTask('screenshot', tasks + 'screenshot', {
	url: config.server.proxy,
	app: app + '/tmp',
	size: path.screenshot
});

// ================ Copy ================ //

lazyRequireTask('extras', tasks + 'copy', {
	src: path.extras,
	app: app
});

lazyRequireTask('json', tasks + 'copy', {
	src: path.assets.json,
	app: path.build.json,
	is:  is
});

lazyRequireTask('favicon', tasks + 'copy', {
	src: path.assets.favicon,
	app: path.build.favicon,
	is:  is
});

lazyRequireTask('fonts', tasks + 'copy', {
	src: path.assets.fonts,
	app: path.build.fonts,
	is:  is
});

// ================ webserver ============== //

lazyRequireTask('webserver', tasks + 'webserver', {
	app: app,
	proxy: config.server.proxy,
	server: config.server.server
});

// ================ No Lazy ================ //

gulp.task('modernizr', function(callback){
	gulp.src(path.modernizr).pipe(gulp.dest(path.build.scripts));
	callback();
});

gulp.task('webstandards', function(){
	return gulp.src(app + '/**/*').pipe(standards());
	callback();
});

gulp.task('scripts', gulp.series('vendors', 'scripts:app'));

gulp.task('isbuild', function(callback){
	is.build = true;
	callback();
});

gulp.task('watch', function(){
	is.watch = true;

	var x;
	for (x in path.watch)
	{
		(function(key){
			watch(path.watch[key], gulp.series(key));
		})(x);
	}
});

gulp.task('build',
	gulp.series('isbuild',
		gulp.parallel('template', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras')
	)
);

gulp.task('default',
	gulp.series('build', gulp.parallel('watch'))
);