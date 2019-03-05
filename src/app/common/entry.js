/**
 * entry
 * @Author: zhangxuelian 
 * @Date: 2017-09-14 09:32:34 
 * @Last Modified by: chenpeiyu
 * @Last Modified time: 2019-03-05 11:34:56
 **/
require(['angular'], function () {
    require([
        'angular-couch-potato',
        'angular-ui-router',
        'angular-ui-bootstrap-tpls',
        'angular-shiro',
        'angular-cookies',

        'app/common/constants',
        'app/common/models',

        // 'bower_components/common/security/index',
        
        'bower_components/common/exception/index',

        'bower_components/common/services/date_util',
        'bower_components/common/services/normal_util',
        'bower_components/common/services/modal_ext',
        'bower_components/common/services/common_util',
        
        'bower_components/common/services/ui-bootstrap-locale_zh-cn',

        'bower_components/common/directives/common_table',
        'bower_components/common/directives/common_table_add',
        'bower_components/common/directives/common_select',
        'bower_components/common/directives/common_select_ext',
        'bower_components/common/directives/simple_panigation',
        'bower_components/common/directives/common_list',
        'bower_components/common/directives/common-ratio-tool',
        'bower_components/common/directives/repeat_finish',
        'bower_components/common/directives/accordion_menu',

        'bower_components/common/filters/filters'

    ], function () {
        require(['app/common/app', 'angular', 'angular-couch-potato','layer'], function (app, angular, couchPotato) {

            var main = angular.module('main', [
                'scs.couch-potato',
                'ui.router',
                'models',
                'ui.bootstrap',
                // 'security', 
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
                '$couchPotato', '$state', '$stateParams', '$rootScope',
                function ($couchPotato, $state, $stateParams, $rootScope) {
                    
                    app.lazy = $couchPotato;

                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;

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