'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	return function(callback) {
		clean(options.app, options.is.build);
		
		let uncssFiles = [
			options.app + '*.html',
			options.app + '**/*.html'
		];

		let uncssIgnore = [ /^#js/ ];

		gulp.src(options.src)

			.pipe($.plumber({errorHandler: errorHandler}))

			.pipe($.debug({'title': options.taskName}))
			
			.pipe($.if(!options.is.build, $.sourcemaps.init()))
			
			.pipe($.sass())
			
			.pipe($.pixrem())

			.pipe($.concat('main.css'))

			.pipe($.if(
				options.is.uncss,
				$.uncss({
					html: uncssFiles,
					ignore: uncssIgnore,
					timeout: 1000,
				})
			))

			.pipe($.autoprefixer({
				browsers: ['last 17 versions'],
				cascade: false
			}))

			.pipe($.if(
				options.is.build,
				$.csscomb({
					"tab-size": 4,
					"color-shorthand": true,
					"space-after-colon": 1,
					"space-after-combinator": 1,
					"space-before-opening-brace": 1,
					"sort-order": [
						[
							"content", "position", "left", "right", "top", "bottom", "z-index"
						],
						[
							"width", "height", "margin", "padding"
						],
						[
							"background", "background-color", "background-image", "background-repeat", "background-position", "background-attachment", "background-size", "border"
						]
					]
				})
			))

			.pipe($.if(
				!options.is.build,
				gulp.dest(options.app)
			))

			.pipe($.if(
				options.is.build,
				$.cssnano({
					zindex: false,
					autoprefixer: false,
					normalizeCharset: true,
					convertValues: { length: false },
					colormin: true
				})
			))

			.pipe($.rename({suffix: '.min'}))

			.pipe($.debug({'title': options.taskName}))

			.pipe($.if(!options.is.build, $.sourcemaps.write()))

			.pipe(gulp.dest(options.app))

			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};
};