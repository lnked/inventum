'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const fileinclude	= require('gulp-file-include');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	return function(callback) {
		
		gulp.src(options.src, {since: gulp.lastRun(options.taskName)})

			.pipe($.plumber({errorHandler: errorHandler}))

			.pipe($.debug({'title': options.taskName}))
			
			.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file'
			}))

			.pipe($.if(
				options.is.email,
				$.inlineCss({
					applyStyleTags: true,
					applyLinkTags: true,
					removeStyleTags: true,
					removeLinkTags: true
				})
			))

			.pipe($.if(
				options.is.build,
				$.prettify({
					indent_size: 4,
					indent_char: ' ',
					brace_style: 'expand',
					indent_handlebars: false,
					indent_inner_html: false,
					preserve_newlines: false,
					max_preserve_newlines: 1,
					unformatted: ['pre', 'code']
				})
			))

			.pipe($.if(
				options.is.watch,
				$.htmlhint({
					"attr-value-double-quotes": false,
					"tagname-lowercase": false,
					"attr-lowercase": false,
					"doctype-first": false,
					"id-unique": true,
					"tag-pair": false,
					"attr-no-duplication": true,
					"spec-char-escape": false,
					"src-not-empty": false
				})
			))

			.pipe($.if(
				options.is.watch,
				$.htmlhint.reporter()
			))

			.pipe($.debug({'title': options.taskName}))

			.pipe(gulp.dest(options.app))

			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();

	};
};