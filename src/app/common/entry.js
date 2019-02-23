/**
 * entry
 * @Author: zhangxuelian 
 * @Date: 2017-09-14 09:32:34 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-02-23 17:41:57
 **/
require(['angular'], function () {
    require([
        'angular-couch-potato',
        'angular-ui-router',
        'angular-ui-bootstrap-tpls',
        'angular-shiro',
        'angular-cookies',

        'app/common/constants',

        'models/models',
        
        'common/security/index',
        'common/exception/index',

        'services/date_util',
        'services/normal_util',
        'services/modal_ext',
        'services/common_util',
        
        'services/ui-bootstrap-locale_zh-cn',

        'directives/common_table',
        'directives/common_table_add',
        'directives/common_select',
        'directives/common_select_ext',
        'directives/simple_panigation',
        'directives/common_list',
        'directives/common-ratio-tool',
        'directives/repeat_finish',
        'directives/accordion_menu',

        'filters/filters'

    ], function () {
        require(['app/common/app', 'angular', 'angular-couch-potato','layer'], function (app, angular, couchPotato) {

            var main = angular.module('main', [
                'scs.couch-potato',
                'ui.router',
                'models',
                'ui.bootstrap',
                'security', 
                'exception',
                'angularShiro',
                'constants',
                'ngCookies',
                'app',
                'ngCookies'
            ]);
            couchPotato.configureApp(app);
            main.config(function ($httpProvider) {
                $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            });
            main.run([
                '$couchPotato', '$state', '$stateParams', '$rootScope', 'security', 'securityAuthorization',
                function ($couchPotato, $state, $stateParams, $rootScope,security,securityAuthorization) {
                    
                    app.lazy = $couchPotato;

                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;

                    // $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                    //     layer.load();
                    //     var homeIndex = toState.name.indexOf("home");//home首次出现的位置

                    //     if (toState.notAuthenticate) {

                    //     } else {
                    //         var eventPrevent = false;
                    //     	if(!security.isAuthenticated()){
                    //     		eventPrevent = true;
                    //     		event.preventDefault(); 
                    //         }
                    //         securityAuthorization.requireAuthenticatedUser().then(function (){
                    //             if(eventPrevent){
                    //                 if(homeIndex != -1){
                    //                     $state.go('home');
                    //                 }else{
                    //                     $state.go(toState, toParams);
                    //                 }
                    //             }
                    //         });
                    //     }
                    // });

                    // $rootScope.$on("$stateChangeStart",function(){
                    //     layer.closeAll('loading');
                    // });
                }
            ]);
            
            angular.element(document).ready(function () {
                angular.bootstrap(document, [main['name'], function () {
                    angular.element(document).find('html').addClass('ng-app');
                }]);
            });
        });
    });
});