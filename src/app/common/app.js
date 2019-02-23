/**
 * define app module
 * @Author: zhangxuelian 
 * @Date: 2017-09-13 11:11:28 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-02-23 17:32:27
 **/
define([
	'app/home/home.router',
	], function () {
  	var app = angular.module('app', [ 
		'home',
		"services",
		"filters",
		"ui.bootstrap",
		"directives"
	]);

	app.config(['$stateProvider',
		'$urlRouterProvider',
		'$locationProvider',
		'angularShiroConfigProvider', 
		'$couchPotatoProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider, angularShiroConfigProvider,$couchPotatoProvider) {
			//$locationProvider.html5Mode(true);
			var href = window.location.href;
			// angularShiroConfigProvider.options.urls['/**'] = 'authc';
			// angularShiroConfigProvider.options.urls['/login','/other/**','/pseudo_login/**','/home/case_work'] = 'anon';

			// $stateProvider.state('home', {
			// 	url: "/home",
			// 	templateUrl: 'app/home/home_tradition_black.tpl.html',
			// 	controller: 'homeCtrl',
			// 	resolve: {
			// 		dummy: $couchPotatoProvider.resolveDependencies(['app/home/home_tradition_black.ctrl.js'])
			// 	}
			// })
			$stateProvider.state('home', {
				url: "/home",
				templateUrl: 'app/home/demo.html',
				controller: 'demoCtrl',
				resolve: {
					dummy: $couchPotatoProvider.resolveDependencies(['app/home/demo.ctrl.js'])
				}
			})
		}]);

    return app;
});
