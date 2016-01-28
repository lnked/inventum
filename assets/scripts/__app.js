;( function( $ ) {
	"use strict";

	window.body = $('body');
	
	var navigation = $('#navigation');

	$.app = {
		
		initSandwich: function()
		{
			this.sandwich.init({
				keyHooks: !0,
				selector: '.js-sandwich-menu',
				wrapper: '.layout-wrapper',
				overlay: '#menu-overlay'
			});
		},

		initSelect: function()
		{
			$('select').selectbox();
		},

		initMask: function()
		{
			$(".watch-datemask").mask("99/99/9999");
			$(".watch-phonemask").mask("+ 7 (999) 999-99-99");
			$(".watch-cartnumber").mask("999-999-999");
		},
		
		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: false,
				wrapper: '.layout-wrapper'
			});
		},

		initFancyBox: function()
		{
			if (!is_undefined($.fn.fancybox))
			{
				$('.fancybox').fancybox({
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});

				$('.fancybox-media').fancybox({
					openEffect  : 'none',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
						  locked: false
						}
					}
				});

				$(".various").fancybox({
					maxWidth	: 800,
					maxHeight	: 600,
					fitToView	: false,
					width		: '70%',
					height		: '70%',
					autoSize	: false,
					closeClick	: false,
					openEffect	: 'none',
					closeEffect	: 'none',
					helpers: {
						overlay: {
						  locked: false
						}
					}
				});
			}
		},

		carousel: function()
		{
			if ($('#carousel').length > 0 && $('#carousel').find('.carousel__item').length > 1)
			{
				$('#carousel').slick({
					infinite: true,
					dots: false,
					draggable: true,
					speed: 170,
					slidesToShow: 5,
		  			slidesToScroll: 1,
					prevArrow: '<button type="button" class="carousel__navigation carousel__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="carousel__navigation carousel__navigation_next slick-next"></button>',
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
								infinite: true,
								dots: true
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});
			}
		},

		slickSider: function()
		{
			if ($('#slider').length > 0 && $('#slider').find('.slider__item').length > 1)
			{
				$('#slider').slick({
					infinite: true,
					dots: true,
					draggable: false,
					speed: 300,
					fade: true,
					autoplay: true,
					autoplaySpeed: 4500,
					pauseOnHover: false,
					cssEase: 'ease',
					prevArrow: '<button type="button" class="slider__navigation slider__navigation_prev slick-prev"></button>',
					nextArrow: '<button type="button" class="slider__navigation slider__navigation_next slick-next"></button>'
				});
			}
		},

		disableHover: function()
		{
			var timer;
			window.addEventListener('scroll', function() {
				clearTimeout(timer);
				
				if(!body.hasClass('disable-hover')) {
					body.addClass('disable-hover');
				}

				timer = setTimeout(function(){
					body.removeClass('disable-hover');
				},500);
			}, false);
		},

		navFixed: function(top)
		{
			if (top >= 91)
			{
				if (!navigation.hasClass('fixed'))
				{
					navigation.addClass('fixed');
				}
			}
			else {
				navigation.removeClass('fixed');
			}
		},

		navigation: function()
		{
			var _this = this, submenu = $('#navigation-submenu');;

			_this.navFixed($(window).scrollTop());

			$(window).on('scroll', function(){
				_this.navFixed($(window).scrollTop());
			});

			body.on('mouseenter', '.navigation__item', function(){
				var item = $(this), div, height;

				if (item.find('.submenu').length)
				{
					div = document.createElement('div');
					div.id = 'test-fixed';
					div.style.position = 'fixed';
					div.style.bacgroundColor = '#f00';
					div.innerHTML = item.find('.submenu').html();

					$(body).append(div);

					height = $('#test-fixed').outerHeight();

					$('#test-fixed').remove();

					$('#navigation-submenu').css({
						'height': height - 30
					});

					submenu.addClass('show');
					item.find('.submenu').addClass('show');

					setTimeout(function(){
						submenu.addClass('active');
						item.find('.submenu').addClass('active');
					}, 20);
				}
			});

			body.on('mouseleave', '.navigation__item', function(){
				var item = $(this);

				if (item.find('.submenu').length)
				{
					item.find('.submenu').removeClass('active');
					submenu.removeClass('active');

					setTimeout(function(){
						item.find('.submenu').removeClass('show');
						submenu.removeClass('show');
					}, 300);
				}
			});
			
		},

		initDocuments: function()
		{
			body.on('click', '.js-doc-trigger', function(e){
				e.preventDefault();

				var doc = $(this).closest('.doc');
				
				doc.find('.doc__content').slideToggle(300, function(){
					doc.toggleClass('open');
				});

				return !1;
			});

			body.on('mouseenter', '.js-doc-link', function(){
				$(this).closest('.js-doc-item').addClass('hover');
			});

			body.on('mouseleave', '.js-doc-link', function(){
				$(this).closest('.js-doc-item').removeClass('hover');
			});
		},

		init: function()
		{
			this.disableHover();

			this.initFastclick();

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();
			this.initDocuments();

			this.slickSider();
			this.carousel();
			this.navigation();
		}

	};

})( jQuery );