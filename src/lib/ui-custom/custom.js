define([
    'scripts/ui-custom/ztree/jquery.ztree.all-3.5.min.js',
    'scripts/ui-custom/select2/select2.min.js',
    'scripts/ui-custom/slimScroll.js'
    ], function () {
    var module = angular.module('app.ui.directives', []);
    module.directive('ztree', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {
                //var opts = angular.extend({}, $scope.$eval(attrs.nlUploadify));
                var settingDefaults = {},zNodesDefaults = [];
                var setting = $.extend(settingDefaults, $scope.setting);
                var zNodes = $.extend(zNodesDefaults, $scope.zNodes);
                $.fn.zTree.init(element, setting, zNodes);
            }
        };
    })
	// define the request notification channel for the pub/sub service
	// 定义请求通知渠道发布/订阅服务
	.factory("slimScrollOptions",['$rootScope',function($rootScope){
        // private notification messages
        var _EDIT_DATA_ = '_EDIT_DATA_';
        var _DATA_UPDATED_ = '_DATA_UPDATED_';

        // 发布编辑数据的通知
        var editData = function (item) {
            $rootScope.$broadcast(_EDIT_DATA_, {item: item});
        };
        // 订阅通知编辑数据
        var onEditData = function($scope, handler) {
            $scope.$on(_EDIT_DATA_, function(event, args) {
               handler(args.item);
            });
        };
        // 发布数据更改通知
        var dataUpdated = function () {
            $rootScope.$broadcast(_DATA_UPDATED_);
        };
        // 订阅数据更改通知
        var onDataUpdated = function ($scope, handler) {
            $scope.$on(_DATA_UPDATED_, function (event) {
                handler();
            });
        };
        // 返回公共可访问的方法
        return {
            editData: editData,
            onEditData: onEditData,
            dataUpdated: dataUpdated,
            onDataUpdated: onDataUpdated
        };
	}])
	// define the data service that manages the data
	// 定义数据服务管理数据
    .factory('dataService', ['slimScrollOptions', function (slimScrollOptions) {
        // private data
		// 专用数据
        var hops = [
            { height: 110 }
		];
        // sends notification that data has been updated
		// 数据已经更新发送通知
        var saveHop = function(hop) {
            slimScrollOptions.dataUpdated();
        };
        // removes the item from the array and sends a notification that data has been updated
		// 从数组中删除条目并发送一个通知数据已更新
        var deleteHop = function(hop) {
            for(var i = 0; i < hops.length; i++) {
                if(hops[i]._id.$oid === hop._id.$oid) {
                    hops.splice(i, 1);
                    slimScrollOptions.dataUpdated();
                    return;
                }
            };
        };
        // internal function to generate a random number guid generation
		// 内部函数来生成一个随机数生成guid
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        // generates a guid for adding items to array
		// 生成一个guid将项目添加到数组中
        var guid = function () {
          return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        };
        // function to add a hop to the array and sends a notification that data has been updated
		// 函数 添加hop到数组中,并发送一个通知数据已更新
        var addHop = function(hop) {
            hops.id.$oid = guid();
            hops.push(hop);
            slimScrollOptions.dataUpdated();
        };
        // returns the array of hops
		// 返回数组hops
        var getHops = function() {
            console.log(hops);
			return hops;
        };
        // returns a specific hop with the given id
		// 返回一个特定的hop的id
        var getHop = function(id) {
            for(var i = 0; i < hops.length; i++) {
                if(hops[i]._id.$oid === id) {
                    return hops[i];
                }
            };
        };
        // return the publicly accessible methods
		// 返回公共可访问的方法
        return {
            getHops: getHops,
            getHop: getHop,
            saveHop: saveHop,
            deleteHop: deleteHop,
            addHop: addHop
        }
    }])
	.directive("slimScroll", function() {
        return {
            require: '?ngModel',
			scope:{scrollHeight:'=',slimscrollOption:'='},
            restrict: "A",
            link: function($scope, element, attrs, ngModel) {
                var slimDefaults = {
                    height: $scope.scrollHeight || "100%",
                    color: '#6d8eb9',
                    // alwaysVisible: true,
                    // railColor: '#7399C8',
                    // railVisible: true,
                    size:'8px'
                }
                var slimscrollOption = $scope.slimscrollOption;
//              console.log("slimscrollOption",slimscrollOption);
                var slimNew = $.extend(slimDefaults, slimscrollOption);
                element.slimScroll(slimNew);
                $scope.$watch("slimscrollOption.height",function(newH,oldH){
                    if(newH != oldH) {
                        slimNew.height = newH;
                        element.slimScroll(slimNew);
                    }
                });

                // $scope.$watch("slimscrollOption.overflow",function(newOv,oldOv){
                //     if(newOv != oldOv) {
                //         slimNew.overflow = newOv;
                //         element.slimScroll(slimNew);
                //     }
                // });
				/*$rootScope.$watch("divOption.changeH",function(newH,oldH){
					console.log("divOption.changeH",newH);
					if(newH != oldH) {
					    slimNew.height -= newH;
						element.slimScroll(slimNew);
					}
					//$scope.slimscrollOption.height;
				});*/
            }
        }
    })
	.directive("uiRangeSlider", function() {
        return {
            require: '?ngModel',
            restrict: "A",
            link:  function(scope, element, attrs, ngModel)  {
                var pos = element.slider().data('slider');
                ngModel.$setViewValue(pos.getValue());
                //var slideLock = false;
                element.on("slide", function(slideEvt) {
                    //slideLock = true;
                    scope.$apply(function () {
                        ngModel.$setViewValue(slideEvt.value);
                        //console.log("viewValue",ngModel.$viewValue);
                    });
                    //slideLock = false;
                });
                // scope.$watchCollection('ngModel.$modelValue', function() {
                //     //console.log(value);
                //     //$scope.slimScrollTo(element);
                //     console.log("value",ngModel.$modelValue);
                //     //$('#testDiv2').slimScroll({ scrollTo: '300px' });
                // });
                // console.log(ngModel.$modelValue);
                // scope.$watch(ngModel.$modelValue, function(newValue, oldValue) {
                //     console.log("newValue",newValue);
                // });
            }
        }
    })
	.directive("toggleNavCollapsedMin", ["$rootScope",
        function($rootScope) {
            return {
                restrict: "A",
                link: function(scope, ele) {
                    var app;
                    app = $("#app"), ele.on("click", function(e) {
						var navMin = app.hasClass("nav-collapsed-min");
						navMin ? app.removeClass("nav-collapsed-min") : ( app.addClass("nav-collapsed-min"), $rootScope.$broadcast("nav:reset") );
						$rootScope.$broadcast("mainSideWidth",navMin ? 100 : -100)
						e.preventDefault();
                    })
                }
            }
        }
    ])
	.directive("collapseNav", [
        function() {
            return {
                restrict: "A",
                link: function(scope, ele) {
                    setTimeout(function(){
                        var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, prevWidth, updateClass;
                        $window = $(window);
                        $lists = ele.find("ul").parent("li");
                        $lists.append('<i class="fa fa-angle-down icon-has-ul-h"></i><i class="fa fa-angle-right icon-has-ul"></i>');
                        $a = $lists.children("a");
                        $listsRest = ele.children("li").not($lists);
                        $aRest = $listsRest.children("a");
                        $app = $("#app");

                        $nav = $("#nav-container");

                        $a.on("click", function(event) {
                            var $parent, $this;
                            if($app.hasClass("nav-collapsed-min") || $nav.hasClass("nav-horizontal") && $window.width() >= 768){
                                !1
                            }
                            else{
                                $this = $(this);
                                $parent = $this.parent("li");
                                $lists.not($parent).removeClass("open").find("ul").slideUp();
                                $parent.toggleClass("open").find("ul").stop().slideToggle();
                                event.preventDefault()
                            }
                        });
                        $aRest.on("click", function() {
                            $lists.removeClass("open").find("ul").slideUp();
                        });
                        scope.$on("nav:reset", function() {
                            $lists.removeClass("open").find("ul").slideUp();
                        });
                        Timer = void 0, prevWidth = $window.width(), updateClass = function() {
                            var currentWidth;
                            currentWidth = $window.width();
                            768 > currentWidth && $app.removeClass("nav-collapsed-min");
                            768 > prevWidth && currentWidth >= 768 && $nav.hasClass("nav-horizontal") && $lists.removeClass("open").find("ul").slideUp();
                            prevWidth = currentWidth;
                        };
                        $window.resize(function() {
                            var t;
                            clearTimeout(t);
                            t = setTimeout(updateClass, 300);
                        })
                    
                    }, 300);

                    }
            }
        }
    ])
	.directive("highlightActive", [
        function() {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", "$location", '$filter', '$timeout',
					function($scope, $element, $attrs, $location, $filter, $timeout) {
						var highlightActive, links, path;
						links = $element.find("a");
						//console.log('links=',$filter('uppercase')(links));
						path = function() {
							return $location.path()
						};
						highlightActive = function(links, path) {
							return path = "#" + path,
                            //console.log('path=',path,', links=',links),
							angular.forEach( links, function(link) {
    								var $li, $link, href,tempHref;
    								$link = angular.element(link);
    								$li = $link.parent("li");
    								href = $link.attr("href");
                                    tempHref = href.replace('#/','').split('/');
    								$li.hasClass("active") && $li.removeClass("active");
    								//console.log('path=',path,', tempHref=',href,path.indexOf(href));
    								if(path.indexOf(href) >= 0){
                                        $li.addClass("active");
                                        $li.parent('ul').parent('li').addClass("active");
                                    }else{
                                        void 0;
                                    }
    							}
                            )
						};
						$timeout(function(){
							links = $element.find("a");
							highlightActive(links, $location.path());
						},200);
						$scope.$watch(path,
							function(newVal, oldVal) {
								return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
							}
						)
					}
                ]
            }
        }
    ])
	.directive("toggleOffCanvas", [
        function() {
            return {
                restrict: "A",
                link: function(scope, ele) {
                    return ele.on("click", function() {
                        return $("#app").toggleClass("on-canvas")
                    })
                }
            }
        }
    ])
	.directive("uiFileUpload", [
		function() {
			return {
				restrict: "A",
				link: function($scope, $ele) {
					return $ele.bootstrapFileInput()
				}
			}
		}
	])
    .factory('aHoverFactory', ['$position',
        function($position) {
            function tdo($ele){
            }
            return { tdo : tdo };
        }
    ])
    // 输入框自动获取焦点
    // .directive("inputAutoFocus", [
    //     function() {
    //         return {
    //             restrict: "A",
    //             link: function($scope, $ele) {
    //                 setTimeout(function(){
    //                     $ele.focus();
    //                 },500);
    //             }
    //         }
    //     }
    // ])
    .directive("tabselect", [
        function() {
            return {
                restrict: "A",
                link: function($scope, $ele) {
                    setTimeout(function(){

                        var tabsBtn = $ele.find('.nav-tabs > li');
                        var tabsContent = $ele.find('.tab-content > .tab-pane');
                        
                        for(var i = 0,len = tabsBtn.length; i < len; i++){
                            tabsBtn[i].index = i;
                            tabsBtn[i].onclick = function(){
                                showContent(this.index);
                                this.className = 'active';
                            }
                        }
                        
                        function showContent(n){
                            for(var i = 0,len = tabsBtn.length; i < len; i++){
                                tabsBtn[i].className = '';
                                tabsContent[i].className = 'tab-pane';
                            }
                            tabsContent[n].className = 'tab-pane active';
                        }

                    }, 300)
                }
            }
        }
    ])
    .factory('dtRowCallBack', [function() {

            //报警栏选择事件
            function selectAllAlarm(obj){
                //$(obj).parents('table').children('tbody').children('tr').toggleClass('selected');
                console.log("OK");
            }

            var selectedArr = {};
            var dtSelectAllAlarm = {};
            var checkName = '';
            //取已选择的值
            function getSelectedArr(scopeCheckName){
                return selectedArr[scopeCheckName] || [];
            }
            //设置已选择的值
            function setSelectedArr(scopeCheckName,scopeSelectedArr){
                selectedArr[scopeCheckName] = scopeSelectedArr || [];
                return selectedArr[scopeCheckName];
            }
            //行选择
            function rowSelect(nRow,aData){
                var _self = $(nRow);
                var _check = _self.children('td:first').find('input[type="checkbox"]');
                checkName = _check.attr('name');
                var sIndex = $.inArray(aData.id, selectedArr[checkName]);
                if(!dtSelectAllAlarm[checkName]){
                    selectedArr[checkName] = [];
                    $('#' + checkName).on('click',function(){
                        checkName = $(this).attr('name');
                        var isCheckAll = $(this).is(":checked"), _trAll = $(this).parents('table').children('tbody').children('tr');
                        var _checkAll = _trAll.find('input[type="checkbox"]');

                        if(isCheckAll){
                            for (var i = 0; i < _checkAll.length; i++) {
                                sIndex = $.inArray( _checkAll[i].value, selectedArr[checkName] );
                                if( sIndex === -1 ) selectedArr[checkName].push( _checkAll[i].value );
                            };
                            _trAll.addClass('selected');
                            _checkAll.prop("checked","checked");
                        }else{
                            for (var i = 0; i < _checkAll.length; i++) {
                                sIndex = $.inArray( _checkAll[i].value, selectedArr[checkName] );
                                if( sIndex != -1 ) selectedArr[checkName].splice( sIndex, 1 );
                            };
                            _trAll.removeClass('selected');
                            _checkAll.removeAttr("checked");
                        }
                        console.log( checkName, selectedArr[checkName] );
                    });
                    console.log(checkName);
                    dtSelectAllAlarm[checkName] = true;
                }
                if ( sIndex !== -1 ) {
                    _self.addClass('selected');
                    _check.prop("checked","checked");
                }
                _self.bind('click', function() {
                    checkName = _check.attr('name');
                    if(!selectedArr[checkName]) selectedArr[checkName] = [];
                    sIndex = $.inArray(aData.id, selectedArr[checkName]);
                    if( sIndex === -1 ){
                        selectedArr[checkName].push( aData.id );
                        _check.prop("checked","checked");
                    } else {
                        selectedArr[checkName].splice( sIndex, 1 );
                        _check.removeAttr("checked");
                    }
                    _self.toggleClass('selected');
                    //console.log(checkName,selectedArr[checkName]);
                });
            }
            return {
                rowSelect : rowSelect,
                selectAllAlarm : selectAllAlarm,
                getSelectedArr : getSelectedArr,
                setSelectedArr : setSelectedArr
            };
        }
    ])
    .directive("dtSelectRow", [
        function() {
            return {
                restrict: "A",
                scope: {dtSelectedArr: "="},
                link: function($scope, $ele) {
                    var dtSelectedArr = $scope.dtSelectedArr;
                    console.log(dtSelectedArr);
                }
            }
        }
    ])
    .directive("subMenuDrag", [
        function() {
            return {
                restrict: "A",
                link: function($scope, $ele) {
                    $ele.draggable({
                        revert: true,
                        helper: "clone",
                        opacity: 0.7,
                        appendTo: '#deskIcon',
                        start: function(event, ui) {
                            //$('.start_item .item').hide();
                            //console.log("draggable:" + this.id);
                            var offset = $(this).offset();
                            $('#deskIcon').data("addIcon", $(this).data('menu'));
                            console.log("menu:" + $(this).data('menu'));
                        }
                    })
                }
            }
        }
    ])
    .directive("subMenuDrop", [
        function() {
            return {
                restrict: "A",
                scope: {deskcells: "="},
                link: function($scope, $ele) {
                    $ele.droppable({
                        drop: function() {
                            var addIcon = $('#deskIcon').data('addIcon');
                            if(addIcon){
                                var sIndex = -1;
                                for (var i = 0; i < $scope.deskcells.length; i++) {
                                    if ( $scope.deskcells[i].id == addIcon.id ) {
                                        sIndex = i;
                                        break;
                                    }
                                };
                                if (sIndex === -1) {
                                    $('body').data("deskcellsChange",addIcon);
                                    $scope.$apply(function(){
                                        $scope.deskcells.push(addIcon);
                                    });
                                    //存储桌面布局元素的jquery对象
                                    myLib.desktop.desktopPanel();
                                    myLib.desktop.deskIcon.init();
                                };
                                $('#deskIcon').data('addIcon','');
                            }
                            $('#removeDesktopIcon').fadeOut();
                        }
                    })
                }
            }
        }
    ])
    .directive("removeDeskIcon", [
        function() {
            return {
                restrict: "A",
                scope: {deskcells: "="},
                link: function($scope, $ele) {
                    $ele.droppable({
                        drop: function() {
                            var curDragIcon = $('body').data("curDragIcon");
                            var curDragIconId = curDragIcon.attr('id');
                            if(curDragIcon){
                                for (var i = 0; i < $scope.deskcells.length; i++) {
                                    if ( $scope.deskcells[i].id == curDragIconId ) {
                                        $('body').data("deskcellsChange",$scope.deskcells[i]);
                                        $scope.$apply(function(){
                                            $scope.deskcells.splice( i, 1 );
                                        });
                                        //存储桌面布局元素的jquery对象
                                        myLib.desktop.desktopPanel();
                                        myLib.desktop.deskIcon.init();
                                        break;
                                    }
                                };
                                $('body').data('curDragIcon','');
                                $('#removeDesktopIcon').fadeOut();
                            }
                        }
                    })
                }
            }
        }
    ])
    .directive("validformCheck", [
        function() {
            return {
                restrict: "A",
                scope:{validformOptions:"="},
                link: function($scope, $ele) {
                    var _o = $scope.validformOptions;
                    var _default = {
                        btnSubmit:"#btn_submit",
                        //btnReset:".btn_reset",
                        tiptype:2
                    };
                    var newOp = $.extend(_default, _o);
                    setTimeout(function(){
                        $ele.Validform(newOp);
                        $(newOp.btnSubmit).click(function(){
                            $ele.submit();
                        });
                    }, 200)
                }
            }
        }
    ])
    .directive("aHoverEv", ['$position','aHoverFactory',
        function($position,aHoverFactory) {
            return {
                restrict: "A",
                scope: {aHoverOption: "=",aHoverHeight:"="},
                link: function($scope, $ele) {
                    //aHoverFactory.tdo($ele);
                    var aHoverHeight = parseInt($scope.aHoverHeight);
                    var _wrapBox = $ele.parents('.slimScrollDiv');
                    var _cntBox = $ele.parents('.tile-ul');
                    var _menuBox = $ele.find('.custom-menu');
                    var _menuDrop = $ele.find('.dropdown-menu')
                    var vWinH = $(window).height();
                    var timeOut = null,hoverTimeout;
                    //$position.offset(element) : $position.position(element)
                    $ele.hover(function() {
                        //console.log($position.offset($ele));
                        clearTimeout(timeOut);
                        hoverTimeout = setTimeout(function(){
                            _menuBox.addClass('hover');
                            //注：元素要显示后才能获取到宽高
                            var menuW = _menuBox.parent().width();
                            var menuH = _menuDrop.height();
                            var box = {
                                w:_wrapBox.width(),
                                h:_wrapBox.height()
                            };
                            var thisPos = $ele.offset();
                            //var gapW = box.w - _this.left;
                            var gapH = box.h - thisPos.top;
                            var cntBoxW = _cntBox.width(), cntBoxH = _cntBox.height();
                            //console.log('box.w:',box.w,',thisPos.left:',thisPos.left,',menuW:',menuW,',Value:',box.w + 308 - thisPos.left - 140);
                            if(box.w + 308 - thisPos.left - 140 < menuW){
                                _menuBox.addClass('pull-left');
                            }
                            //console.log('vWinH:',vWinH,',thisPos.top:',thisPos.top,',menuH:',menuH,',Value:',vWinH - thisPos.top - 140);
                            if(vWinH - thisPos.top - 140 < menuH){
                                _menuDrop.css({top: - menuH - 23 + 'px'});
                            }
                        },300)
                    },function(){
                        clearTimeout(hoverTimeout);
                        timeOut = setTimeout(function(){
                            _menuBox.removeClass('hover').removeClass('pull-left');
                            _menuDrop.css({top: - aHoverHeight + 'px'});
                        }, 200)
                    })
                }
            }
        }
    ])
    .directive("aHoverEv2", ['$position','aHoverFactory',
        function($position,aHoverFactory) {
            return {
                restrict: "A",
                scope: {aHoverOption: "=",aHoverHeight:"="},
                link: function($scope, $ele) {
                    //aHoverFactory.tdo($ele);
                	var aHoverHeight = parseInt($scope.aHoverHeight);
                    var _wrapBox = $ele.parents('.slimScrollDiv');
                    var _cntBox = $ele.parents('.tile-ul');
                    var _menuBox = $ele.find('.custom-menu');
                    var _menuDrop = $ele.find('.dropdown-menu')
                    var vWinH = $(window).height();
                    var timeOut = null,hoverTimeout;
                    //$position.offset(element) : $position.position(element)
                    $ele.hover(function() {
                        //console.log($position.offset($ele));
                        clearTimeout(timeOut)
                        hoverTimeout = setTimeout(function(){
                            _menuBox.addClass('hover');
                            //注：元素要显示后才能获取到宽高
                            var menuW = _menuBox.parent().width();
                            var menuH = _menuDrop.height();
                            var box = {
                                w:_wrapBox.width(),
                                h:_wrapBox.height()
                            };
                            var thisPos = $ele.offset();
                            //var gapW = box.w - _this.left;
                            var gapH = box.h - thisPos.top;
                            var cntBoxW = _cntBox.width(), cntBoxH = _cntBox.height();
                            //console.log('box.w:',box.w,',thisPos.left:',thisPos.left,',menuW:',menuW,',Value:',box.w + 308 - thisPos.left - 100);
                            if(box.w + 308 - thisPos.left - 100 < menuW){
                                _menuBox.addClass('pull-left');
                            }
                            //console.log('vWinH:',vWinH,',thisPos.top:',thisPos.top,',menuH:',menuH,',Value:',vWinH - thisPos.top - 40);
                            if(vWinH - thisPos.top - 40 < menuH){
                                _menuDrop.css({top: - menuH - 23 + 'px'});
                            }                            
                        },300);
                    },function(){
                        clearTimeout(hoverTimeout);
                        timeOut = setTimeout(function(){
                            _menuBox.removeClass('hover').removeClass('pull-left');
                            _menuDrop.css({top: - aHoverHeight + 'px'});
                        }, 200)
                    })
                }
            }
        }
    ])
	.directive("tileMini", function() {
        return {
            restrict: "E",
            scope: {
                item: "=data"
            },
            template: function($scope){
                var tmplStr = '<a class="shortcut-tiles" ng-href="{{item.href}}">\n'
                            + '    <div class="tiles-wrap">\n'
                            + '        <div class="tiles-body">\n'
                            + '            <span class="tiles-badge {{item.state}}"></span>\n'
                            + '            <div class="img"><img src="{{item.imgsrc}}"></div>\n'
                            + '        </div>\n'
                            + '        <div class="tiles-footer text-{{item.txtcolor}}">\n'
                            + '            <label class="ui-checkbox"><input name="{{item.checkname}}" type="checkbox" value="{{item.checkvalue}}" ><span>{{item.text}}</span></label>\n'
                            + '        </div>\n'
                            + '    </div>\n'
                            + '    <div class="custom-menu" ng-show="{{item.hovermenu}}">'
                            + '        <div class="arrow"></div><ul class="dropdown-menu tooltip-custom">'
                            + '            <li><span><i class="fa fa-caret-right pull-before"></i>ÊÖ¹¤Ìí¼ÓÉè±¸</span></li>'
                            + '            <li class="divider"></li>'
                            + '            <li><span><i class="fa fa-caret-right pull-before"></i>µ¼ÈëÉè±¸</span></li>'
                            + '            <li class="divider"></li>'
                            + '            <li><span><i class="fa fa-caret-right pull-before"></i>×Ô¶¯·¢ÏÖÉè±¸</span></li>'
                            + '            <li class="divider"></li>'
                            + '        </ul>'
                            + '    </div>'
                            + '</a>\n'
                return tmplStr;
            }
        }
    });


    /**
     * Enhanced Select2 Dropmenus
     *
     * @AJAX Mode - When in this mode, your value will be an object (or array of objects) of the data used by Select2
     *     This change is so that you do not have to do an additional query yourself on top of Select2's own query
     * @params [options] {object} The configuration options passed to $.fn.select2(). Refer to the documentation
     */
    angular.module('ui.select2', []).value('uiSelect2Config', {}).directive('uiSelect2', ['uiSelect2Config', '$timeout', function(uiSelect2Config, $timeout) {
        var options = {};
        if (uiSelect2Config) {
            angular.extend(options, uiSelect2Config);
        }
        return {
            require: 'ngModel',
            priority: 1,
            compile: function(tElm, tAttrs) {
                var watch,
                    repeatOption,
                    repeatAttr,
                    isSelect = tElm.is('select'),
                    isMultiple = angular.isDefined(tAttrs.multiple);

                // Enable watching of the options dataset if in use
                if (tElm.is('select')) {
                    repeatOption = tElm.find('optgroup[ng-repeat], optgroup[data-ng-repeat], option[ng-repeat], option[data-ng-repeat]');

                    if (repeatOption.length) {
                        repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
                        watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
                    }
                }

                return function(scope, elm, attrs, controller) {
                    // instance-specific options
                    var opts = angular.extend({}, options, scope.$eval(attrs.uiSelect2));

                    /*
                    Convert from Select2 view-model to Angular view-model.
                    */
                    var convertToAngularModel = function(select2_data) {
                        var model;
                        if (opts.simple_tags) {
                            model = [];
                            angular.forEach(select2_data, function(value, index) {
                                model.push(value.id);
                            });
                        } else {
                            model = select2_data;
                        }
                        return model;
                    };

                    /*
                    Convert from Angular view-model to Select2 view-model.
                    */
                    var convertToSelect2Model = function(angular_data) {
                        var model = [];
                        if (!angular_data) {
                            return model;
                        }

                        if (opts.simple_tags) {
                            model = [];
                            angular.forEach(
                                angular_data,
                                function(value, index) {
                                    model.push({
                                        'id': value,
                                        'text': value
                                    });
                                });
                        } else {
                            model = angular_data;
                        }
                        return model;
                    };

                    if (isSelect) {
                        // Use <select multiple> instead
                        delete opts.multiple;
                        delete opts.initSelection;
                    } else if (isMultiple) {
                        opts.multiple = true;
                    }

                    if (controller) {
                        // Watch the model for programmatic changes
                        scope.$watch(tAttrs.ngModel, function(current, old) {
                            if (!current) {
                                return;
                            }
                            if (current === old) {
                                return;
                            }
                            controller.$render();
                        }, true);
                        controller.$render = function() {
                            if (isSelect) {
                                elm.select2('val', controller.$viewValue);
                            } else {
                                if (opts.multiple) {
                                    controller.$isEmpty = function(value) {
                                        return !value || value.length === 0;
                                    };
                                    var viewValue = controller.$viewValue;
                                    if (angular.isString(viewValue)) {
                                        viewValue = viewValue.split(',');
                                    }
                                    elm.select2(
                                        'data', convertToSelect2Model(viewValue));
                                    if (opts.sortable) {
                                        elm.select2("container").find("ul.select2-choices").sortable({
                                            containment: 'parent',
                                            start: function() {
                                                elm.select2("onSortStart");
                                            },
                                            update: function() {
                                                elm.select2("onSortEnd");
                                                elm.trigger('change');
                                            }
                                        });
                                    }
                                } else {
                                    if (angular.isObject(controller.$viewValue)) {
                                        elm.select2('data', controller.$viewValue);
                                    } else if (!controller.$viewValue) {
                                        elm.select2('data', null);
                                    } else {
                                        elm.select2('val', controller.$viewValue);
                                    }
                                }
                            }
                        };

                        // Watch the options dataset for changes
                        if (watch) {
                            scope.$watch(watch, function(newVal, oldVal, scope) {
                                if (angular.equals(newVal, oldVal)) {
                                    return;
                                }
                                // Delayed so that the options have time to be rendered
                                $timeout(function() {
                                    elm.select2('val', controller.$viewValue);
                                    // Refresh angular to remove the superfluous option
                                    controller.$render();
                                    if (newVal && !oldVal && controller.$setPristine) {
                                        controller.$setPristine(true);
                                    }
                                });
                            });
                        }

                        // Update valid and dirty statuses
                        controller.$parsers.push(function(value) {
                            var div = elm.prev();
                            div
                                .toggleClass('ng-invalid', !controller.$valid)
                                .toggleClass('ng-valid', controller.$valid)
                                .toggleClass('ng-invalid-required', !controller.$valid)
                                .toggleClass('ng-valid-required', controller.$valid)
                                .toggleClass('ng-dirty', controller.$dirty)
                                .toggleClass('ng-pristine', controller.$pristine);
                            return value;
                        });

                        if (!isSelect) {
                            // Set the view and model value and update the angular template manually for the ajax/multiple select2.
                            elm.bind("change", function(e) {
                                e.stopImmediatePropagation();

                                if (scope.$$phase || scope.$root.$$phase) {
                                    return;
                                }
                                scope.$apply(function() {
                                    controller.$setViewValue(
                                        convertToAngularModel(elm.select2('data')));
                                });
                            });

                            if (opts.initSelection) {
                                var initSelection = opts.initSelection;
                                opts.initSelection = function(element, callback) {
                                    initSelection(element, function(value) {
                                        var isPristine = controller.$pristine;
                                        controller.$setViewValue(convertToAngularModel(value));
                                        callback(value);
                                        if (isPristine) {
                                            controller.$setPristine();
                                        }
                                        elm.prev().toggleClass('ng-pristine', controller.$pristine);
                                    });
                                };
                            }
                        }
                    }

                    elm.bind("$destroy", function() {
                        elm.select2("destroy");
                    });

                    attrs.$observe('disabled', function(value) {
                        elm.select2('enable', !value);
                    });

                    attrs.$observe('readonly', function(value) {
                        elm.select2('readonly', !!value);
                    });

                    if (attrs.ngMultiple) {
                        scope.$watch(attrs.ngMultiple, function(newVal) {
                            attrs.$set('multiple', !!newVal);
                            elm.select2(opts);
                        });
                    }

                    // Initialize the plugin late so that the injected DOM does not disrupt the template compiler
                    $timeout(function() {
                        elm.select2(opts);

                        // Set initial value - I'm not sure about this but it seems to need to be there
                        elm.select2('data', controller.$modelValue);
                        // important!
                        controller.$render();

                        // Not sure if I should just check for !isSelect OR if I should check for 'tags' key
                        if (!opts.initSelection && !isSelect) {
                            var isPristine = controller.$pristine;
                            controller.$pristine = false;
                            controller.$setViewValue(
                                convertToAngularModel(elm.select2('data'))
                            );
                            if (isPristine) {
                                controller.$setPristine();
                            }
                            elm.prev().toggleClass('ng-pristine', controller.$pristine);
                        }
                    });
                };
            }
        };
    }]);


});





