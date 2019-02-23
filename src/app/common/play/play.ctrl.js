/**
 * 播放
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 20:50:28 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-06-20 13:49:35
 **/
define(['app/common/app','common/ocx/ocx3.0/monitor_ocx_3.0'], function (app,monitorOcx) {
    app.registerController('playCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt,content,constant_filestore_url,subject,normalUtil) {

             $scope.content = content;
            var ocxObj = null;

            $scope.load = function(){
                $timeout(function(){
                    
                    try{
                        //初始化ocx
                        ocxObj = monitorOcx.init("playerOcx",function(ret){
                            //console.log(ret);注册回调
                        });
                        if(subject.ocxArray){
                            subject.ocxArray.push({
                                name: 'playerOcx',
                                obj: ocxObj
                            });
                        }
                    }catch(e){
                        modalExt.comfirm({
                            title: "系统提示",
                            content: "您未安装OCX控件，是否现在下载？",
                            type: 'warning',
                            height:200,
                            comfirmCallback: function() {
                                window.open(constant_filestore_url+"/transport/GSWebOcxPackageSetup.exe");
                            }
                        })
                    }
                    Models.Dictionary.one('SYSTEM_CONFIG', 'BMS_LOGIN_URL').get().then(function (ret) {
                        if (ret.state.code == 200) {
                            //登录BMS
                            monitorOcx.login(ocxObj,{
                                sIP:ret.data.fieldValue,
                                nPort:10002,
                                sUserName:"sysadmin",
                                sPassword:"90cfe39ede38a4deeb4f1750e8e01ba1"
                            });
                            //初始化playOcx
                            monitorOcx.playInit(ocxObj);
                            //初始化播放窗口
                            monitorOcx.initMonitorWnd(ocxObj);
                            //设置工具栏
                            monitorOcx.setLiveDispWndTool(ocxObj,$scope.content.toolParam);
                            //播放视频
                            monitorOcx.playRealVideo(ocxObj,$scope.content.palyParam);
                        }else{
                            modalExt.modalTip({content:"登录BMS失败！",type:"warning",height:150});
                        }
                    },function(){
                        modalExt.modalTip({content:"登录BMS失败！",type:"warning",height:150});
                    });
                    

                },500);
            }

            /**
             * 关闭
             */
             $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            
            $scope.$on("$destroy",function(){
                $timeout(function(){
                    monitorOcx.destoryView(ocxObj);
                    monitorOcx.logout(ocxObj);
                    ocxObj = null;
                    var index = normalUtil.eleInArr(subject.ocxArray,'name','playerOcx');
                    if(subject.ocxArray){
                        subject.ocxArray.splice(index,1);
                    }
                },1000)
            });
        })
})