'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(options) {

	return function() {
		let config = {};

		if (typeof options.proxy !== 'undefined')
		{
			// config.proxy = options.proxy;
		}

		if (typeof options.server !== 'undefined')
		{
			config.server = options.server;
		}

		browserSync.init(config);

		browserSync.watch(options.app + '**/*.*').on('change', browserSync.reload);
	};

};