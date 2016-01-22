;(function ($) {
    $.fn.selectbox = function () {
        $(this).each(function () {
            var select = $(this);
            if (select.prev('span.selectbox').length < 1) {
				function doSelect() {
					var option = select.find('option');
                    var optionSelected = option.filter(':selected');
                    var optionText = option.filter(':first').text();
                    if (optionSelected.length) optionText = optionSelected.text();
                    var ddlist = '';
                    for (i = 0; i < option.length; i++) {
                        var class_name = '';
                        if (option.eq(i).is(':selected')) class_name += ' selected sel';
                        if (option.eq(i).is(':disabled')) class_name += ' disabled';
						if (i == (option.length-1)) {
							class_name += ' last-child';
						}
                        ddlist += '<li class="selectbox__dropdown__item' + class_name + '">' + option.eq(i).text() + '</li>';
                    }
                    var selectbox = $('<span class="selectbox">' + '<div class="selectbox__select"><div class="selectbox__select__text">' + optionText + '</div>' + '<b class="selectbox__trigger"><i class="selectbox__trigger__arrow"></i></b>' + '</div>' + '<div class="selectbox__dropdown">' + '<ul class="selectbox__dropdown__list">' + ddlist + '</ul>' + '</div>' + '</span>');
                    select.before(selectbox).css({
                        position: 'absolute',
                        top: -9999
                    });
                    var divSelect = selectbox.find('.selectbox__select');
                    var divText = divSelect.find('.selectbox__select__text');
                    var dropdown = selectbox.find('.selectbox__dropdown');
                    var li = dropdown.find('li');
                    var selectHeight = selectbox.outerHeight();
                    if (dropdown.css('left') == 'auto') dropdown.css({
                        left: 0
                    });
                    if (dropdown.css('top') == 'auto') dropdown.css({
                        top: selectHeight
                    });
                    var liHeight = li.outerHeight();
                    var position = dropdown.css('top');
                    dropdown.hide();
					selectbox.removeClass('selectbox-active');
                    divSelect.click(function () {
                        var topOffset = selectbox.offset().top;
                        var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
                        if (bottomOffset < 0 || bottomOffset < liHeight * 6) {
                            dropdown.height('auto').css({
                                top: 'auto',
                                bottom: position
                            });
                            if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20) {
                                dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
                            }
                        } else if (bottomOffset > liHeight * 6) {
                            dropdown.height('auto').css({
                                bottom: 'auto',
                                top: position
                            });
                            if (dropdown.outerHeight() > bottomOffset - 20) {
                                dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
                            }
                        }
                        $('span.selectbox').css({
                            zIndex: 1
                        }).removeClass('focused');
                        selectbox.css({
                            zIndex: 2
                        });
                        if (dropdown.is(':hidden')) {
                            $('div.dropdown:visible').hide();
                            dropdown.show();
							selectbox.addClass('selectbox-active');
                        } else {
                            dropdown.hide();
							selectbox.removeClass('selectbox-active');
                        }
                        return false;
                    });
                    li.hover(function () {
                        $(this).siblings().removeClass('selected');
                    });
                    var selectedText = li.filter('.selected').text();
                    li.filter(':not(.disabled)').click(function () {
                        var liText = $(this).text();
                        if (selectedText != liText) {
                            $(this).addClass('selected sel').siblings().removeClass('selected sel');
                            option.removeAttr('selected').eq($(this).index()).attr('selected', true);
                            selectedText = liText;
                            divText.text(liText);
                            select.change();
                        }
                        dropdown.hide();
						selectbox.removeClass('selectbox-active');
						return false;
                    });
                    dropdown.mouseout(function () {
                        dropdown.find('li.sel').addClass('selected');
                    });
                    select.focus(function () {
                        $('span.selectbox').removeClass('focused');
                        selectbox.addClass('focused');
                    }).keyup(function () {
                        divText.text(option.filter(':selected').text());
                        li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
                    });
                    $(document).on('click', function (e) {
                        if (!$(e.target).parents().hasClass('selectbox')) {
                            dropdown.hide().find('li.sel').addClass('selected');
							selectbox.removeClass('selectbox-active');
                            selectbox.removeClass('focused');
                        }
                    });
                }
                doSelect();
                select.on('refresh', function () {
                    select.prev().remove();
                    doSelect();
                })
            }
        });
    }
})(jQuery)