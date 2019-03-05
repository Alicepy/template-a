/**
 * define app module
 * @Author: zhangxuelian 
 * @Date: 2017-09-13 11:11:28 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-04 14:28:36
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
