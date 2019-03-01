/**
 * models
 * @Author: zhangxuelian
 * @Date: 2017-10-11 10:33:05
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-01 18:57:03
 **/
define(['restangular'], function () {
    var module = angular.module('models', ['restangular','constants']);

    module.factory('Models', function(Restangular,constant_models_url) {
        var  rest = Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(constant_models_url);
            RestangularConfigurer.setDefaultHeaders(
                {
                    'Access-Control-Allow-origin' : '*',
                    'Access-Control-Allow-Headers' : 'X-Requested-With',
                    'Access-Control-Allow-Methods' : 'GET',
                    'X-Requested-With' : 'XMLHttpRequest',
                    'If-Modified-Since':'0',
                    'Cache-Control':'no-cache'
                }
            );
        });

        /**
         * 公共模块
         */
        rest.File = rest.all('common/file');//指纹图片上传
    
        return rest;
    });
});
