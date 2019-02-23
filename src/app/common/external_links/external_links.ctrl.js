/**
 * 外链控制器
 * @Author: zhangxuelian 
 * @Date: 2018-05-02 18:41:56 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-05-02 19:27:15
 **/
define(['app/common/app'], function (app) {
    app.registerController('externalLinksCtrl',
    function ($scope) {
        $scope.theUrl = $scope.$parent.assistVar.externalLinks.url;
    })
})