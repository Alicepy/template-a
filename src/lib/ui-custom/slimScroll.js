/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.1
 *
 */
(function($) {

    jQuery.fn.extend({
        slimScroll: function(options) {

            var defaults = {

                // width in pixels of the visible scroll area
                width: 'auto',

                // height in pixels of the visible scroll area
                height: '250px',

                // width in pixels of the scrollbar and rail
                size: '7px',

                // scrollbar color, accepts any hex/color value
                color: '#000',

                // scrollbar position - left/right
                positionY: 'right',
                positionX: 'bottom',

                // distanceY in pixels between the side edge and the scrollbar
                distanceY: '1px',
                distanceX: '1px',

                // default scroll position on load - top / bottom / $('selector')
                start: 'top',

                // sets scrollbar opacity
                opacity: .4,

                //overflow
                overflow: 'hidden',

                // enables always-on mode for the scrollbar
                alwaysVisible: false,

                // check if we should hide the scrollbar when user is hovering over
                disableFadeOut: false,

                // sets visibility of the rail
                railVisible: false,
				
				barIsShowX: false,

                // sets rail color
                railColor: '#333',

                // sets rail opacity
                railOpacity: .2,

                // whether  we should use jQuery UI Draggable to enable bar dragging
                railDraggable: true,

                // defautlt CSS class of the slimscroll rail
                railClassX: 'slimScrollRailX',
                railClassY: 'slimScrollRailY',

                // defautlt CSS class of the slimscroll bar
                barClassX: 'slimScrollBarX',
                barClassY: 'slimScrollBarY',

                // defautlt CSS class of the slimscroll wrapper
                wrapperClass: 'slimScrollDiv',

                // check if mousewheel should scroll the window if we reach top/bottom
                allowPageScroll: false,

                // scroll amount applied to each mouse wheel step
                wheelStep: 20,

                // scroll amount applied when user is using gestures
                touchScrollStep: 200,

                // sets border radius
                borderRadius: '7px',

                // sets border radius of the rail
                railBorderRadius: '7px'
            };

            var o = $.extend(defaults, options);

            // do it for every element that matches selector
            this.each(function() {

                var isOverPanelY, isOverBarY, isDraggY, queueHideY, touchDifY,
					isOverPanelX, isOverBarX, isDraggX, queueHideX, touchDifX,
                    barHeight, percentScrollY, lastScrollY,
					barWidth, percentScrollX, lastScrollX,
                    divS = '<div></div>',
                    minBarHeight = 30,
                    minBarWidth = 30,
					releaseScrollX = false,
                    releaseScrollY = false;

                // used in event handlers and for better minification
                var me = $(this);

                // ensure we are not binding it again
                if (me.parent().hasClass(o.wrapperClass)) {
                    // start from last bar position
                    var offset = me.scrollTop();

                    // find bar and rail
                    barY = me.parent().find('.' + o.barClassY);
                    barX = me.parent().find('.' + o.barClassX);
                    railY = me.parent().find('.' + o.railClassY);
                    railX = me.parent().find('.' + o.railClassX);

                    getBarHeight();
					getBarWidth();

                    // check if we should scroll existing instance
                    if ($.isPlainObject(options)) {
                        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
                        if ('height' in options && options.height == 'auto') {
                            me.parent().css('height', 'auto');
                            me.css('height', 'auto');
                            var height = me.parent().parent().height();
                            me.parent().css('height', height);
                            me.css('height', height);
                        } else if ('height' in options) {
                            var h = options.height;
                            me.parent().css('height', h);
                            me.css('height', h);
                        }

                        if ('scrollTo' in options) {
                            // jump to a static point
                            offset = parseInt(o.scrollTo);
                        } else if ('scrollBy' in options) {
                            // jump by value pixels
                            offset += parseInt(o.scrollBy);
                        } else if ('destroy' in options) {
                            // remove slimscroll elements
                            barY.remove();
                            railY.remove();
                            me.unwrap();
                            return;
                        }

                        // scroll content by the given offset
                        scrollContentY(offset, false, true);
                        scrollContentX(0, false, true);
                    }

                    return;
                }

                // optionally set height to the parent's height
                o.height = (o.height == 'auto') ? me.parent().height() : o.height;

                // wrap content
                var wrapper = $(divS)
                    .addClass(o.wrapperClass)
                    .css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: o.width,
                        height: o.height
                    });

                // update style for the div
                me.css({
                    overflow: o.overflow,
                    width: o.width,
                    height: o.height
                });

                // create scrollbar railY
                var railY = $(divS)
                    .addClass(o.railClassY)
                    .css({
                        width: o.size,
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
                        'border-radius': o.railBorderRadius,
                        background: o.railColor,
                        opacity: o.railOpacity,
                        zIndex: 90
                    });

                // create scrollbarY
                var barY = $(divS)
                    .addClass(o.barClassY)
                    .css({
                        background: o.color,
                        width: o.size,
                        position: 'absolute',
                        top: 0,
                        opacity: o.opacity,
                        display: o.alwaysVisible ? 'block' : 'none',
                        'border-radius': o.borderRadius,
                        BorderRadius: o.borderRadius,
                        MozBorderRadius: o.borderRadius,
                        WebkitBorderRadius: o.borderRadius,
                        zIndex: 99
                    });

                // create scrollbar railX
                var railX = $(divS)
                    .addClass(o.railClassX)
                    .css({
                        width: '100%',
                        height: o.size,
                        position: 'absolute',
                        bottom: 0,
                        display: (o.alwaysVisible && o.railVisible && o.barIsShowX) ? 'block' : 'none',
                        'border-radius': o.railBorderRadius,
                        background: o.railColor,
                        opacity: o.railOpacity,
                        zIndex: 90
                    });

                // create scrollbarX
                var barX = $(divS)
                    .addClass(o.barClassX)
                    .css({
                        background: o.color,
                        height: o.size,
                        position: 'absolute',
                        left: 0,
                        opacity: o.opacity,
                        display: (o.alwaysVisible && o.barIsShowX) ? 'block' : 'none',
                        'border-radius': o.borderRadius,
                        BorderRadius: o.borderRadius,
                        MozBorderRadius: o.borderRadius,
                        WebkitBorderRadius: o.borderRadius,
                        zIndex: 99
                    });

                // set position
                var posCssY = (o.positionY == 'right') ? {
                    right: o.distanceY
                } : {
                    left: o.distanceY
                };
                var posCssX = (o.positionX == 'bottom') ? {
                    bottom: o.distanceX
                } : {
                    top: o.distanceX
                };
				
                railY.css(posCssY);
                barY.css(posCssY);
                railX.css(posCssX);
                barX.css(posCssX);

                // wrap it
                me.wrap(wrapper);

                // append to parent div
                me.parent().append(barY);
                me.parent().append(railY);
                me.parent().append(barX);
                me.parent().append(railX);

                // make it draggable and no longer dependent on the jqueryUI
                if (o.railDraggable) {
                    barY.bind("mousedown", function(e) {
                        var $doc = $(document);
                        isDraggY = true;
                        t = parseFloat(barY.css('top'));
                        pageY = e.pageY;

                        $doc.bind("mousemove.slimscroll", function(e) {
                            currTop = t + e.pageY - pageY;
                            barY.css('top', currTop);
                            scrollContentY(0, barY.position().top, false); // scroll content
                        });

                        $doc.bind("mouseup.slimscroll", function(e) {
                            isDraggY = false;
                            hideBarY();
                            $doc.unbind('.slimscroll');
                        });
                        return false;
                    }).bind("selectstart.slimscroll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                    barX.bind("mousedown", function(e) {
                        var $doc = $(document);
                        isDraggX = true;
                        t = parseFloat(barX.css('left'));
                        pageX = e.pageX;

                        $doc.bind("mousemove.slimscroll", function(e) {
                            currLeft = t + e.pageX - pageX;
                            barX.css('left', currLeft);
                            scrollContentX(0, barX.position().left, false); // scroll content
                        });

                        $doc.bind("mouseup.slimscroll", function(e) {
                            isDraggX = false;
                            hideBarX();
                            $doc.unbind('.slimscroll');
                        });
                        return false;
                    }).bind("selectstart.slimscroll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }

                // on rail over
                railY.hover(function() {
                    showBarY();
                }, function() {
                    hideBarY();
                });
                railX.hover(function() {
                    if(o.barIsShowX) showBarX();
                }, function() {
                    hideBarX();
                });

                // on bar over
                barY.hover(function() {
                    isOverBarY = true;
                }, function() {
                    isOverBarY = false;
                });
                barX.hover(function() {
                    if(o.barIsShowX) isOverBarX = true;
                }, function() {
                    isOverBarX = false;
                });

                // show on parent mouseover
                me.hover(function() {
                    isOverPanelY = true;
                    showBarY();
                    hideBarY();
                    if(o.barIsShowX){
						isOverPanelX = true;
						showBarX();
						hideBarX();
					}
                }, function() {
                    isOverPanelY = false;
                    hideBarY();
					if(o.barIsShowX){
						isOverPanelX = false;
						hideBarX();
					}
                });

                // support for mobile
                me.bind('touchstart', function(e, b) {
                    if (e.originalEvent.touches.length) {
                        // record where touch started
                        touchDifY = e.originalEvent.touches[0].pageY;
                    }
                });

                me.bind('touchmove', function(e) {
                    // prevent scrolling the page if necessary
                    if (!releaseScrollY) {
                        e.originalEvent.preventDefault();
                    }
                    if (e.originalEvent.touches.length) {
                        // see how far user swiped
                        var diff = (touchDifY - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
                        // scroll content
                        scrollContentY(diff, true);
                        touchDifY = e.originalEvent.touches[0].pageY;
                    }
                });

                // set up initial height
				getBarWidth();
                getBarHeight();

                // check start position
                if (o.start === 'bottom') {
                    // scroll content to bottom
                    barY.css({
                        top: me.outerHeight() - barY.outerHeight()
                    });
                    scrollContentY(0, true);
                } else if (o.start !== 'top') {
                    // assume jQuery selector
                    scrollContentY($(o.start).position().top, null, true);

                    // make sure bar stays hidden
                    if (!o.alwaysVisible) {
                        barY.hide();
                    }
                }

                // attach scroll events
                attachWheel();

                function _onWheel(e) {

                    // use mouse wheel only when mouse is over
                    if (!isOverPanelY) {
                        return;
                    }

                    var e = e || window.event;

                    var delta = 0;
                    if (e.wheelDelta) {
                        delta = -e.wheelDelta / 120;
                    }
                    if (e.detail) {
                        delta = e.detail / 3;
                    }

                    var target = e.target || e.srcTarget || e.srcElement;
                    if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
                        // scroll content
                        scrollContentY(delta, true);
                    }

                    // stop window scroll
                    if (e.preventDefault && !releaseScrollY) {
                        e.preventDefault();
                    }
                    if (!releaseScrollY) {
                        e.returnValue = false;
                    }
                }

                function scrollContentY(y, isWheel, isJump) {
                    releaseScrollY = false;
                    var delta = y;
                    var maxTop = me.outerHeight() - barY.outerHeight();

                    if (isWheel) {
                        // move bar with mouse wheel
                        delta = parseInt(barY.css('top')) + y * parseInt(o.wheelStep) / 100 * barY.outerHeight();

                        // move bar, make sure it doesn't go out
                        delta = Math.min(Math.max(delta, 0), maxTop);

                        // if scrolling down, make sure a fractional change to the
                        // scroll position isn't rounded away when the scrollbar's CSS is set
                        // this flooring of delta would happened automatically when
                        // bar.css is set below, but we floor here for clarity
                        delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

                        // scroll the scrollbar
                        barY.css({
                            top: delta + 'px'
                        });
                    }

                    // calculate actual scroll amount
                    percentScrollY = parseInt(barY.css('top')) / (me.outerHeight() - barY.outerHeight());
                    delta = percentScrollY * (me[0].scrollHeight - me.outerHeight());

                    if (isJump) {
                        delta = y;
                        var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
                        offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                        barY.css({
                            top: offsetTop + 'px'
                        });
                    }

                    // scroll content
                    me.scrollTop(delta);

                    // fire scrolling event
                    me.trigger('slimscrolling', ~~delta);

                    // ensure bar is visible
                    showBarY();

                    // trigger hide when scroll is stopped
                    hideBarY();
                }

                function scrollContentX(x, isWheel, isJump) {
                    releaseScrollX = false;
                    var deltaX = x;
                    var maxLeft = me.outerWidth() - barX.outerWidth();

                    if (isWheel) {
                        // move bar with mouse wheel
                        deltaX = parseInt(barX.css('left')) + x * parseInt(o.wheelStep) / 100 * barX.outerWidth();

                        // move bar, make sure it doesn't go out
                        deltaX = Math.min(Math.max(deltaX, 0), maxLeft);

                        // if scrolling down, make sure a fractional change to the
                        // scroll position isn't rounded away when the scrollbar's CSS is set
                        // this flooring of deltaX would happened automatically when
                        // bar.css is set below, but we floor here for clarity
                        deltaX = (x > 0) ? Math.ceil(deltaX) : Math.floor(deltaX);

                        // scroll the scrollbar
                        barX.css({
                            left: deltaX + 'px'
                        });
                    }

                    // calculate actual scroll amount
                    percentScrollX = parseInt(barX.css('left')) / (me.outerWidth() - barX.outerWidth());
                    deltaX = percentScrollX * (me[0].scrollWidth - me.outerWidth());

                    if (isJump) {
                        deltaX = x;
                        var offsetLeft = deltaX / me[0].scrollWidth * me.outerWidth();
                        offsetLeft = Math.min(Math.max(offsetLeft, 0), maxLeft);
                        barX.css({
                            left: offsetLeft + 'px'
                        });
                    }

                    // scroll content
                    me.scrollLeft(deltaX);

                    // fire scrolling event
                    me.trigger('slimscrolling', ~~deltaX);

                    // ensure bar is visible
                    if(o.barIsShowX) showBarX();

                    // trigger hide when scroll is stopped
                    hideBarX();
                }

                function attachWheel() {
                    if (window.addEventListener) {
                        this.addEventListener('DOMMouseScroll', _onWheel, false);
                        this.addEventListener('mousewheel', _onWheel, false);
                        this.addEventListener('MozMousePixelScroll', _onWheel, false);
                    } else {
                        document.attachEvent("onmousewheel", _onWheel)
                    }
                }

                function getBarHeight() {
                    // calculate scrollbar height and make sure it is not too small
                    barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
                    barY.css({
                        height: barHeight + 'px',
						display: barHeight == me.outerHeight() ? 'none' : 'block'
                    });
                }

                function getBarWidth() {
                    barWidth = Math.max((me.outerWidth() / me[0].scrollWidth) * me.outerWidth(), minBarWidth);
					//console.log('o.barIsShowX=',o.barIsShowX);
					//console.log('barWidth=',barWidth,'me.outerWidth()=',me.outerWidth());
					//barWidth == me.outerWidth() && 
                    barX.css({
                        width: barWidth + 'px'
                    });
					var displayX = ( !o.barIsShowX ) ? 'none' : 'block';
					if(barWidth == me.outerWidth()){
						displayX = 'none';
					}
                    barX.css({
						display: displayX
                    });
                }

                function showBarY() {
                    // recalculate bar height
					getBarHeight();
                    clearTimeout(queueHideY);

                    // when bar reached top or bottom
                    if (percentScrollY == ~~percentScrollY) {
                        //release wheel
                        releaseScrollY = o.allowPageScroll;

                        // publish approporiate event
                        if (lastScrollY != percentScrollY) {
                            var msg = (~~percentScrollY == 0) ? 'top' : 'bottom';
                            me.trigger('slimscroll', msg);
                        }
                    } else {
                        releaseScrollY = false;
                    }
                    lastScrollY = percentScrollY;

                    // show only when required
                    if (barHeight >= me.outerHeight()) {
                        //allow window scroll
                        releaseScrollY = true;
                        return;
                    }
                    barY.stop(true, true).fadeIn('fast');
                    if (o.railVisible) {
                        railY.stop(true, true).fadeIn('fast');
                    }
                }

                function showBarX() {
                    // recalculate bar height
                    getBarWidth();
                    clearTimeout(queueHideX);

                    // when bar reached top or bottom
                    if (percentScrollX == ~~percentScrollX) {
                        //release wheel
                        releaseScrollX = o.allowPageScroll;

                        // publish approporiate event
                        if (lastScrollX != percentScrollX) {
                            var msg = (~~percentScrollX == 0) ? 'left' : 'right';
                            me.trigger('slimscroll', msg);
                        }
                    } else {
                        releaseScrollX = false;
                    }
                    lastScrollX = percentScrollX;

                    // show only when required
                    if (barWidth >= me.outerWidth()) {
                        //allow window scroll
                        releaseScrollX = true;
                        return;
                    }
                    barX.stop(true, true).fadeIn('fast');
                    if (o.railVisible) {
                        railX.stop(true, true).fadeIn('fast');
                    }
                }

                function hideBarY() {
                    // only hide when options allow it
                    if (!o.alwaysVisible) {
                        queueHideY = setTimeout(function() {
                            if (!(o.disableFadeOut && isOverPanelY) && !isOverBarY && !isDraggY) {
                                barY.fadeOut('slow');
                                railY.fadeOut('slow');
                            }
                        }, 1000);
                    }
                }

                function hideBarX() {
                    // only hide when options allow it
                    if (!o.alwaysVisible) {
                        queueHideX = setTimeout(function() {
                            if (!(o.disableFadeOut && isOverPanelX) && !isOverBarX && !isDraggX) {
                                barX.fadeOut('slow');
                                railX.fadeOut('slow');
                            }
                        }, 1000);
                    }
                }

            });

            // maintain chainability
            return this;
        }
    });

    jQuery.fn.extend({
        slimscroll: jQuery.fn.slimScroll
    });

})(jQuery);