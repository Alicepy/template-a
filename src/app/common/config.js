/**
 * @file require config and app entry
 * @Author: zhangxuelian
 * @Date: 2017-09-13 11:14:46
 * @Last Modified by: zhuohuanjie
 * @Last Modified time: 2018-10-10 15:14:20
 **/
require.config({
    baseUrl: "",
    /* urlArgs:"v=" + (new Date()).getTime(), */
    urlArgs:"v=2.0.20180703",
    paths: {
        "angular": "lib/angular/angular",
        "angular-bindonce": "lib/angular/bindonce",
        "angular-animate": "lib/angular/angular-animate",
        "angular-couch-potato": "lib/angular/angular-couch-potato",
        "angular-shiro": "lib/angular/angular-shiro",
        "angular-ui-router": "lib/angular/angular-ui-router/release/angular-ui-router",
        "angular-file-upload":"lib/angular-file-upload-master/dist/angular-file-upload.min",
        "console-sham":"lib/angular-file-upload-master/dist/console-sham.min",
        "es5-sham":"lib/angular-file-upload-master/dist/es5-sham.min",
        "es5-shim":"lib/angular-file-upload-master/dist/es5-shim.min",
        "select2":"lib/angular-ui-select2/select2",
        "ng-select2":"lib/angular-ui-select2/ng-select2",
        "angular-sanitize":"lib/angular-sanitize-master/angular-sanitize.min",
        "angular-table":"lib/angular-table-master/dist/angular-table.min",
        'angular-cookies': "lib/angular/angular-cookies.min",
        "jquery": "lib/jquery/jquery-1.10.2.min",
        'json3':'lib/json3/lib/json3.min',
        "jquery-1.8.3": "lib/jquery/jquery-1.8.3",
        "jquery-ui": "lib/jquery-ui/jquery-ui",
        "lodash": "lib/lodash/dist/lodash",
        "restangular": "lib/restangular/dist/restangular",
        "angular-ui-bootstrap-tpls": "lib/angular-ui-bootstrap/ui-bootstrap-tpls-0.12.0",
        "angular-ui-tree": "lib/angular-ui-tree-master/dist/angular-ui-tree-forie8",
        "alertify": "lib/ui-custom/alertify/alertify.min",
        "ztree": "lib/zTree_v3-master/js/jquery.ztree.all.min",
        "layui": "lib/layui-v1.0.9_rls/layui/layui",
        "layer": "lib/layer-v3.0.3/layer/layer",
        "WdatePicker": "lib/My97DatePicker/WdatePicker",
        'easyui': 'lib/jquery-easyui-1.5.1/jquery.easyui.min',
        'artDialog': 'lib/artDialog/js/dialog-plus-min',
        'jquery-print': 'lib/jquery-print/jquery.jqprint-0.3',
        'jquery-from': 'lib/jquery-from/jquery.form.min',
        'jquery-lazyload': 'lib/jquery-lazyload-1.9.3/jquery.lazyload.min',
        'jquery-table2excel':'lib/jquery-table2excel/jquery.table2excel.min',
        'md5': 'lib/js-md5/src/md5',
        'fancybox': 'lib/fancybox/source/jquery.fancybox.ext',
        'fancybox-buttons': 'lib/fancybox/source/helpers/jquery.fancybox-buttons',
        'mousewheel': 'lib/fancybox/lib/jquery.mousewheel-3.0.6.pack',
        'dragsort': 'lib/dragsort-0.5.2/jquery.dragsort-0.5.2.min',
        'ddpowerzoomer': 'lib/ddpowerzoomer/ddpowerzoomer',
        // 'echarts': 'lib/echarts-3.8.4/echarts.min',
        'echarts': 'lib/echarts-3.8.4/echarts',
        'ckplayer': 'lib/ckplayer/ckplayer',
        'simple-echart': 'lib/simple-echart/echarts',
        'map-load': 'lib/offlinemap/map_load',
        'map': 'lib/offlinemap/map',
        'InfoBox': 'lib/offlinemap/tiles_self/InfoBox',
        'map-plus': 'lib/offlinemap/map_plus',
        'map-city': 'lib/offlinemap/map_city',
        'webuploader': 'lib/webuploader/webuploader.min',
        'swfobject': 'lib/swfobject/swfobject',
        'ueditor': 'lib/ueditor-1.4.3.2/ueditor.all',
        'ueditor-ZeroClipboard': 'lib/ueditor-1.4.3.2/third-party/zeroclipboard/ZeroClipboard',
        'ueditor-config': 'lib/ueditor-1.4.3.2/ueditor.config',
        'pick-pcc': 'lib/pick-pcc-1.0.2/pick-pcc.min.1.0.2',
        'des': 'des/tripledes',
        'ecb': 'lib/des/mode-ecb',
        'zrender': 'lib/zRender/zrender.min',
        'ol': 'lib/openlayers/ol-debug'
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
		location : 'common'
	},{
		name : 'models',
		location : 'common/models'
	},{
		name : 'services',
		location : 'common/services'
	},{
		name : 'filters',
		location : 'common/filters'
	},{
		name : 'directives',
		location : 'common/directives'
	},{
        name : 'lib',
        location : 'lib'
    }, {
        name: 'appraisal',
        location: 'app/case_manage/appraisal_check_manage/common/directives'
    },{
        name: 'appraisal_services',
        location: 'app/case_manage/appraisal_check_manage/common/services'
    }]
});

//indexOf for IE8
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
    if (from < 0)
        from += len;
    for (; from < len; from++)
    {
        if (from in this &&
            this[from] === elt)
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
