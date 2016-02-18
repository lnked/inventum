'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	
	return function(callback) {

		if (typeof options.is !== 'undefined')
		{
			clean(options.app, options.is.build);
		}

		gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
			.pipe($.plumber({errorHandler: errorHandler}))
			.pipe(gulp.dest(options.app))
			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};

};