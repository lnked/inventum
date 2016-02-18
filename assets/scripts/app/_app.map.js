;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	$.app.map = {
		
		config: {
			coords: {
				lat: 45.064400,
				lon: 38.953892
			},
			container: 'map-layer'
		},

		resize: function()
		{
			$(document.getElementById(this.config.container)).height($(window).height() - $('#header').height());
		},

		google: function()
		{
			var mapOptions = {
				zoom: 17,
				zoomControl: !1,
				panControl: !1,
				scrollwheel: !1,
				navigationControl: !1,
				mapTypeControl: !1,
				scaleControl: !1,
				draggable: !0,
				disableDoubleClickZoom: !1,
		        streetViewControl: !1,
		        overviewMapControl: !1,
		    	center: new google.maps.LatLng(this.config.coords.lat, this.config.coords.lon)
			};
		    
		    var image = {
		        url: './images/marker@2x.png',
		        size: new google.maps.Size(32, 32),
		        origin: new google.maps.Point(0, 0),
		        scaledSize: new google.maps.Size(32, 32),
		        anchor: new google.maps.Point(32, 32)
		    };

		    var map = new google.maps.Map(document.getElementById(this.config.container), mapOptions);
		    var marker = new google.maps.Marker({
		        position: new google.maps.LatLng(this.config.coords.lat, this.config.coords.lon),
		        map: map,
		        icon: image,
		        flat: true,
		        title: 'г. Москва, Тессинский переулок, вл. 2-6, 19'
		    });

		    function toggleBounce()
		    {
		    	if (marker.getAnimation() !== null) {
					marker.setAnimation(null);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);

					setTimeout(function(){
						marker.setAnimation(null);
					}, 2000);
				}
			}

		    marker.addListener('click', toggleBounce);
		},

		init: function()
		{
			$.app.map.resize();
			$.app.map.google();

			var timeout;

			$(window).on('resize', function(){
				clearTimeout(timeout);
				timeout = setTimeout(function(){
					$.app.map.resize();
				}, 200);
			});
		}

	};

	window.initialize = $.app.map.init;

})(jQuery);