const src = './assets/';
const app = './dist/';

module.exports.app  = app;
module.exports.src  = src;
module.exports.path = {
	build: {
		template:		app,
		vendors:		app + 'js',
		scripts:		app + 'js',
		styles:			app + 'css',
		images:			app + 'images',
		favicon:		app + 'favicon',
		fonts:			app + 'fonts',
		json:			app + 'json'
	},
	assets: {
		sprite:			[src + 'sprite/**/*'],
		images:			[src + 'images/**/*'],
		favicon:		[src + 'favicon/**/*.*'],
		fonts:			[src + 'fonts/**/*.*'],
		json:			[src + 'json/**/*.json'],
		template:		[src + 'template/*.html'],
		vendors:		[src + 'scripts/vendor/**/*.js'],
		scripts:		[src + 'scripts/app/**/*.js'],
		styles:			[src + 'styles/*.scss']
	},
	watch: {
		template:		[src + 'template/*.html', src + 'template/**/*.html'],
		images:			[src + 'images/**/*.*'],
		favicon: 		[src + 'favicon/**/*.*'],
		fonts:			[src + 'fonts/**/*.*'],
		json:			[src + 'json/**/*.json'],
		scripts:		[src + 'scripts/app/**/*.js'],
		styles:			[src + 'styles/**/*.scss']
	},
	extras: [
		src + 'humans.txt',
		src + 'robots.txt'
	],
	modernizr: [src + 'modernizr.js'],
	compile: {
		app: 'main',
		vendor: 'vendor'
	},
	testfile: 'test.js',
	tinypng: 'eGm6p86Xxr4aQ3H7SvfoogEUKOwgBQc3',
	screenshot: [
		'320x480',
		'480x320',

		'320x568',
		'568x320',

		'375x627',
		'627x375',

		'414x736',
		'736x414',

		'600x960',
		'960x600',

		'768x1024',
		'1024x768',

		'1280x1024', 

		'1920x1080'
	]
};

module.exports.server = {
	proxy: "clean.dev",
	server: {
		baseDir: app
	}
};