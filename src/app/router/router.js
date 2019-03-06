/**
 * home router
 * @Author: zhangxuelian
 * @Date: 2017-09-13 14:37:45
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-06 11:26:36
 **/
define(['app/common/app'], function(app) {
    angular.module("home", ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $couchPotatoProvider) {
        $stateProvider
        /**
         * 系统管理模块
         */
        .state('home.demo', {
            url: "/demo",
            templateUrl: 'app/demo/demo.html',
            controller: 'demoCtrl',
            noanimation: true,
            cache: true,
            resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/demo/demo.ctrl.js'])
            }
        })
        .state('home.test', {
            url: "/test",
            templateUrl: 'app/demo/test/test.html',
            controller: 'testCtrl',
            noanimation: true,
            cache: true,
            resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['app/demo/test/test.ctrl.js'])
            }
        })
    });
});

