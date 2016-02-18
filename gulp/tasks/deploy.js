'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const ghPages		= require('gulp-gh-pages');
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {
	
	return function(callback) {

		gulp.src(options.app)
			.pipe($.plumber({errorHandler: errorHandler}))
			.pipe($.debug())
			.pipe($.ghPages())
			.pipe($.notify({ message: options.taskName + ' complete', onLast: true }));

		callback();
	};

};