'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const tinypng		= require('gulp-tinypng-compress');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	
	return function(callback) {

		gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
			.pipe($.plumber({errorHandler: errorHandler}))
			.pipe($.debug({title: options.taskName}))

			.pipe(tinypng({
				key: options.token,
				sigFile: 'images/.tinypng-sigs',
				log: true
			}))

			.pipe($.debug({title: options.taskName}))
			.pipe(gulp.dest(options.app))
			
			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};

};