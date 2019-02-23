/**
 * Created by whh on 2014/10/09.
 */
define(['app'], function (app) {
    angular.module('customValidation', [])
        .directive('userAccountUnique', function ($http) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, ele, attrs, ctrl) {
                    ele.bind('blur', function (evt) {
                        if(angular.isDefined(ctrl.$modelValue)){
                            $http({
                                method: 'POST',
                                url: '../services/jaxrs/users/isexistaccount',
                                data: ctrl.$viewValue
                            }).success(function (data, status, headers, cfg) {
                                ctrl.$setValidity('unique', !data.isexist);
                            }).error(function (data, status, headers, cfg) {
                                ctrl.$setValidity('unique', false);
                            });
                        }
                    }).bind('focus', function (evt) {
                        ctrl.$setValidity('unique', true);
                    });

                }
            }
        });
});