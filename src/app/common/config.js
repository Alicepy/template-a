/**
 * @file require config and app entry
 * @Author: zhangxuelian
 * @Date: 2017-09-13 11:14:46
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-06 15:18:27
 **/
require.config({
    baseUrl: "",
    /* urlArgs:"v=" + (new Date()).getTime(), */
    urlArgs:"v=2.0.20180703",
    paths: {
        "angular": "bower_components/lib/angular/angular",
        "angular-bindonce": "bower_components/lib/angular/bindonce",
        "angular-animate": "bower_components/lib/angular/angular-animate",
        "angular-couch-potato": "bower_components/lib/angular/angular-couch-potato",
        "angular-shiro": "bower_components/lib/angular/angular-shiro",
        "angular-ui-router": "bower_components/lib/angular/angular-ui-router/release/angular-ui-router",
        "angular-file-upload":"bower_components/lib/angular-file-upload-master/dist/angular-file-upload.min",
        "console-sham":"bower_components/lib/angular-file-upload-master/dist/console-sham.min",
        "es5-sham":"bower_components/lib/angular-file-upload-master/dist/es5-sham.min",
        "es5-shim":"bower_components/lib/angular-file-upload-master/dist/es5-shim.min",
        "select2":"bower_components/lib/angular-ui-select2/select2",
        "ng-select2":"bower_components/lib/angular-ui-select2/ng-select2",
        "angular-sanitize":"bower_components/lib/angular-sanitize-master/angular-sanitize.min",
        "angular-table":"bower_components/lib/angular-table-master/dist/angular-table.min",
        'angular-cookies': "bower_components/lib/angular/angular-cookies.min",
        "jquery": "bower_components/lib/jquery/jquery-1.10.2.min",
        'json3':'bower_components/lib/json3/lib/json3.min',
        "jquery-1.8.3": "bower_components/lib/jquery/jquery-1.8.3",
        "jquery-ui": "bower_components/lib/jquery-ui/jquery-ui",
        "lodash": "bower_components/lib/lodash/dist/lodash",
        "restangular": "bower_components/lib/restangular/dist/restangular",
        "angular-ui-bootstrap-tpls": "bower_components/lib/angular-ui-bootstrap/ui-bootstrap-tpls-0.12.0",
        "angular-ui-tree": "bower_components/lib/angular-ui-tree-master/dist/angular-ui-tree-forie8",
        "alertify": "bower_components/lib/ui-custom/alertify/alertify.min",
        "ztree": "bower_components/lib/zTree_v3-master/js/jquery.ztree.all.min",
        "layui": "bower_components/lib/layui-v1.0.9_rls/layui/layui",
        "layer": "bower_components/lib/layer-v3.0.3/layer/layer",
        "WdatePicker": "bower_components/lib/My97DatePicker/WdatePicker",
        'easyui': 'bower_components/lib/jquery-easyui-1.5.1/jquery.easyui.min',
        'artDialog': 'bower_components/lib/artDialog/js/dialog-plus-min',
        'jquery-print': 'bower_components/lib/jquery-print/jquery.jqprint-0.3',
        'jquery-from': 'bower_components/lib/jquery-from/jquery.form.min',
        'jquery-lazyload': 'bower_components/lib/jquery-lazyload-1.9.3/jquery.lazyload.min',
        'jquery-table2excel':'bower_components/lib/jquery-table2excel/jquery.table2excel.min',
        'md5': 'bower_components/lib/js-md5/src/md5',
        'fancybox': 'bower_components/lib/fancybox/source/jquery.fancybox.ext',
        'fancybox-buttons': 'bower_components/lib/fancybox/source/helpers/jquery.fancybox-buttons',
        'mousewheel': 'bower_components/lib/fancybox/lib/jquery.mousewheel-3.0.6.pack',
        'dragsort': 'bower_components/lib/dragsort-0.5.2/jquery.dragsort-0.5.2.min',
        'ddpowerzoomer': 'bower_components/lib/ddpowerzoomer/ddpowerzoomer',
        // 'echarts': 'lib/echarts-3.8.4/echarts.min',
        'echarts': 'bower_components/lib/echarts-3.8.4/echarts',
        'ckplayer': 'bower_components/lib/ckplayer/ckplayer',
        'simple-echart': 'bower_components/lib/simple-echart/echarts',
        'map-load': 'bower_components/lib/offlinemap/map_load',
        'map': 'bower_components/lib/offlinemap/map',
        'InfoBox': 'bower_components/lib/offlinemap/tiles_self/InfoBox',
        'map-plus': 'bower_components/lib/offlinemap/map_plus',
        'map-city': 'bower_components/lib/offlinemap/map_city',
        'webuploader': 'bower_components/lib/webuploader/webuploader.min',
        'swfobject': 'bower_components/lib/swfobject/swfobject',
        'ueditor': 'bower_components/lib/ueditor-1.4.3.2/ueditor.all',
        'ueditor-ZeroClipboard': 'bower_components/lib/ueditor-1.4.3.2/third-party/zeroclipboard/ZeroClipboard',
        'ueditor-config': 'bower_components/lib/ueditor-1.4.3.2/ueditor.config',
        'pick-pcc': 'bower_components/lib/pick-pcc-1.0.2/pick-pcc.min.1.0.2',
        // 'des': 'des/tripledes',
        'ecb': 'bower_components/lib/des/mode-ecb',
        'zrender': 'bower_components/lib/zRender/zrender.min',
        'ol': 'bower_components/lib/openlayers/ol-debug'
    },
    shim: {
        "angular": {
            deps: ['jquery','json3'],
            exports: "angular"
        },
        "jquery-from": {
            deps: ['jquery'],
            exports: "jquery-from"
        },
        "jquery-lazyload": {
            deps: ['jquery'],
            exports: "jquery-lazyload"
        },
        /*"jquery-table2excel":{
            deps: ['jquery'],
            exports: "jquery-table2excel"
        },*/
        "angular-ui-router": [
            "angular"
        ],
        "angular-cookies":[
            "angular"
        ],
        "angular-ui-bootstrap-tpls": [
            "angular"
        ],
        "angular-couch-potato": [
            "angular"
        ],
        "restangular": [
            "angular",
            "lodash"
        ],
        "jquery-ui": [
            "jquery"
        ],
        'fancybox':[
            "mousewheel"
        ],
        'fancybox-buttons':[
            'fancybox'
        ],
        'dragsort':["jquery"],
        "ztree":["jquery"],
        "layer":["jquery"],
        "angular-ui-tree":["angular","console-sham","es5-shim","es5-sham"],
        "angular-file-upload":["angular","console-sham","es5-sham","es5-shim"],
        "ng-select2":["angular","jquery","select2"],
        "angular-sanitize":["angular"],
        "artDialog":["jquery"],
        "jquery-print":["jquery"],
        "easyui":["jquery"],
        'WdatePicker':{
            deps: ["jquery"],
            exports: "WdatePicker"
        },
        'validform':["jquery"],
        'webuploader':["jquery"],
        'map':{
            deps: ["jquery","map-load","map-plus","map-city"],
            exports: 'map'
        },
        'InfoBox':['map'],
        "des": ['ecb']
    },
    packages:[{
		name : 'app',
		location : 'app'
	},{
		name : 'common',
		location : 'bower_components/common'
	},{
		name : 'services',
		location : 'bower_components/common/services'
	},{
		name : 'filters',
		location : 'bower_components/common/filters'
	},{
		name : 'directives',
		location : 'bower_components/common/directives'
	},{
        name : 'lib',
        location : 'bower_components/lib'
    }]
});

//indexOf for IE8
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0)
        from += len;
    for (; from < len; from++){
        if (from in this && this[from] === elt)
        return from;
    }
    return -1;
    };
}
//indexOf for IE8
if(!Array.prototype.lastIndexOf){
    Array.prototype.lastIndexOf=function(item){
        var len = this.length;
        for(var i = len; i >= 0; i--){
            if(this[i] === item){
                return len-i;
            }
        }
        return -1;
    }
}
