'use strict';

const $ 			= require('gulp-load-plugins')();
const gulp 			= require('gulp');
const svgo			= require('imagemin-svgo');
const gifsicle		= require('imagemin-gifsicle');
const clean 		= require("../utils/clean.js");
const errorHandler 	= require("../utils/errorHandler.js");

module.exports = function(options) {

	return function(callback) {
	
		if (typeof options.is !== 'undefined')
		{
			clean(options.app, options.is.build);
		}
		
		gulp.src(options.src + '.{gif,svg,png,jpg,jpeg}')
			.pipe($.plumber({errorHandler: errorHandler}))
			.pipe($.debug({'title': options.taskName}))
			.pipe($.newer(options.app))

			.pipe($.if(
				options.is.webp, $.webp()
			))

			.pipe($.if(
				options.is.build,
				$.imagemin({
					optimizationLevel: 3,
					progressive: true,
					svgoPlugins: [
						{removeTitle:true},
						{removeDesc:true},
						{removeViewBox:true},
						{removeDoctype:true},
						{removeMetadata:true},
						{removeComments:true},
						{removeUselessDefs:true},
						{removeXMLProcInst:true},
						{removeDimensions:true},
						{
							convertColors: {
								names2hex: true,
								rgb2hex: true
							}
						},
						{removeUselessStrokeAndFill:false}
					],
					use: [svgo(), gifsicle({interlaced: true})]
				})
			))

			.pipe(gulp.dest(options.app));
			
		callback();
	
	};

};