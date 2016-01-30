;( function( $ ) {
	"use strict";

	window.body = $('body');
	
	var _this, label, placeholder, _template, navigation = $('#navigation');

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

			body.on('change', '.js-form-select', function(e){
				$(this).closest('.js-form-label').removeClass('error');
			});
		},

		initMask: function()
		{
			$(".js-phone-watcher").mask("+ 7 (999) 999-99-99");
		},
		
		initFastclick: function()
		{
			FastClick.attach(document.body);
		},

		
		initPopup: function()
		{
			$.popup.init('.js-open-popup', {
				cssPosition: !0,
				wrapper: '.layout-wrapper'
			});

			body.on('popup.after_open', function(e, popup){
				_this.preloadForm(popup, '.js-form-input');
			});
		},

		checkForm: function(element, isempty)
		{
			if (!isempty || (isempty && $.trim($(element).val()) == ''))
			{
				label = $(element).closest('.js-form-label');
				
				if (label.find('.selectbox').length && $.trim($(element).val()) !== '')
				{
					label.find('.selectbox').addClass('is-checked');
				}

				if (!label.find('.js-label-name').length)
				{
					if ($(element).hasClass('js-form-select'))
					{
						placeholder = $(element).data('placeholder');
					}
					else {
						placeholder = $(element).prop('placeholder');
						$(element).prop('placeholder', '');
					}

					if (placeholder.indexOf('*') >= 0)
					{
						placeholder = placeholder.replace('*', '<span class="form__label__star">*</span>');
					}

					_template = $(template('tmpl-form-label', { name: placeholder }));

					label.append(_template);

					if ($.trim($(element).val()) !== '')
					{
						label.addClass('focus');
					}
				}
			}
		},

		preloadForm: function(parent, class_name)
		{
			if ($(parent).find(class_name).length)
			{
				$(parent).find(class_name).each(function(){
					_this.checkForm($(this), !1);
				});
			}
		},

		initForm: function()
		{
			_this = this;
			
			_this.preloadForm('body', '.js-form-input');

			body.on('focus', '.js-form-input', function(e){
				_this.checkForm($(this), !1);
				$(this).closest('.js-form-label').addClass('focus');
			});

			body.on('select.open', function(e, select){
				$(select).closest('.js-form-label').addClass('focus');
			});

			body.on('select.close', function(e, select){
				var $select = $(select).closest('.js-form-label').find('.js-form-select');
				
				if ($.trim($select.val()) == '')
				{
					$(select).closest('.js-form-label').removeClass('focus');
				}
			});

			body.on('change', '.js-form-select', function(e){
				if ($.trim($(this).val()) == '')
				{
					$(this).closest('.js-form-label').removeClass('focus');
				}
			});

			body.on('blur', '.js-form-input', function(e){
				if ($.trim($(this).val()) == '')
				{
					$(this).closest('.js-form-label').removeClass('focus');
				}
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
								slidesToShow: 3
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1
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

		initSearch: function()
		{
			var _search, _overlay, _form;

			_search = $(template('tmpl-search', {}));
			
			body.append(_search);
			
			_form = $('#search-form');
			_overlay = $('#search-overlay');

			body.on('click', '.js-search', function(){
				_overlay.addClass('visible');
				_form.addClass('visible');

				setTimeout(function(){
					_overlay.addClass('animate');
					_form.addClass('animate');
				}, 10);
			});

			body.on('click', '#search-overlay', function(){
				_overlay.removeClass('animate');
				_form.removeClass('animate');

				setTimeout(function(){
					_overlay.removeClass('visible');
					_form.removeClass('visible');
				}, 400);
			});
		},

		init: function()
		{
			this.disableHover();

			this.initFastclick();

			this.initForm();

			this.initPopup();
			this.initMask();
			this.initSelect();
			this.initSandwich();
			this.initDocuments();
			this.initSearch();

			this.slickSider();
			this.carousel();
			this.navigation();

			$.app.ajaxForm.init();
		}

	};

})( jQuery );