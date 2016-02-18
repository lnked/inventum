'use strict';

const $				= require('gulp-load-plugins')();
const gulp			= require('gulp');
const Pageres		= require('pageres');
const clean 		= require("../utils/clean.js");

module.exports = function(options) {
	
	return function(callback) {

		clean(options.app, true);

		let pageres = new Pageres({delay: 2})
				.src(options.url, options.size, { crop: true })
				.dest(options.app);

			pageres.run(function (err) {
				$.notify({ message: options.taskName + ' complete', onLast: true })
			});

		callback();
	};
	
};