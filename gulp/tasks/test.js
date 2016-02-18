'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');

module.exports = function(options) {
	
	return function(callback) {

		gulp.src(options.test, {read: false})
			.pipe($.mocha({reporter: 'nyan'}));

		callback();
	};
	
};