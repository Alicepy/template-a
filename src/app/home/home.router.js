/**
 * home router
 * @Author: zhangxuelian
 * @Date: 2017-09-13 14:37:45
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-02-27 20:35:05
 **/
define(['app/common/app'], function(app) {
    //出入库路径
    angular.module("home", ['security.service'])
    .config(function($stateProvider, $urlRouterProvider, $couchPotatoProvider) {
        $stateProvider
        /**
         * 系统管理模块
         */
        .state('home.demo', {
            url: "/demo",
            templateUrl: 'app/home/demo.html',
            controller: 'demoCtrl',
            noanimation: true,
            cache: true,
            resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/home/demo.ctrl.js'])
            }
        })
    });
});
