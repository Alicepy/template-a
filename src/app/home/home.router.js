/**
 * home router
 * @Author: zhangxuelian
 * @Date: 2017-09-13 14:37:45
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-01 18:57:21
 **/
define(['app/common/app'], function(app) {
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
