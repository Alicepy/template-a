/**
 * constants
 * @Author: zhangxuelian 
 * @Date: 2017-09-27 09:36:46 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-10-16 17:01:04
 **/
define([], function () {
  angular.module("constants", [])
  .constant('constant_models_url','../../cmt/service/')
  .constant('constant_models_demo_url','../../cmt/service/jaxrs')
  .constant('constant_login_url','../../cmt/service/login')
  .constant('constant_logout_url','../../cmt/service/logout')
  .constant('constant_pseudo_login_url','../../cmt/service/login/cas')
  .constant('constant_filestore_url','../../cmt/view/filestore')
  .constant('constant_imagestore_url','../../cmt/view/imagestore')
  .constant('static_project_url','/cmt/view/index.html')
  .constant('constant_sso_enable',false)
  .constant('constant_menu_icon_url_prefix',"./images/menu");
});
