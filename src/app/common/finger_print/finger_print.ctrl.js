/**
 * 指纹仪
 * @Author: zhangxuelian 
 * @Date: 2018-01-03 11:49:51 
 * @Last Modified by: caihao
 * @Last Modified time: 2018-09-19 08:48:07
 **/
define(['app/common/app','common/ocx/ocx3.0/mkv_ocx_3.0'], function (app,mkvOcx) {
    app.registerController('fingerPrintCtrl',
        function ($scope, $modalInstance, $modal, Models, $timeout,commonUtil,modalExt,normalUtil,subject) {

            var ocxObj = null;
        
            var finger = $scope.finger = {
                //指纹仪变量
                fingerParms: {
                    reviewId:'#reviewId',
                    imgBase64:'',
                    imgUrl:'',
                    paTemplate:'',
                    iLen: ''
                },
                //等待dom加载完毕
                load: function(){
                    $timeout(function(){
                        try{
                            //初始化ocx
                            ocxObj = mkvOcx.init("fingerOcx",finger.fingerRegistCallback).ocxObj;
                            
                        }catch(e){
                            modalExt.modalTip({content: "请检查指纹仪安装是否正常！",type: 'warning',height:150});
                        }
                        mkvOcx.initSensor(ocxObj);//初始化指纹仪
                        mkvOcx.beginEnroll(ocxObj);//检测指纹仪
                        subject.ocxArray.push({
                            name: 'fingerPrintOcx',
                            obj: ocxObj,
                        });
                    },500);
                },
                //指纹仪回调
                fingerRegistCallback: function(data){
                    var ret = JSON.parse(data);
                    if(ret.code == 0){
                        finger.fingerParms.imgBase64 = ret.paImage;//指纹仪图片base64
                        finger.fingerParms.paTemplate = ret.paTemplate;//特征值
                        finger.fingerParms.iLen = ret.iLen;//特征值长度
    
                        $(finger.fingerParms.reviewId).attr("src","data:image/bmp;base64,"+finger.fingerParms.imgBase64);
                        Models.File.all('upload').post({        
                            data:'data:image/jpeg;base64,'+finger.fingerParms.imgBase64
                        }).then(function(ret){
                            if(commonUtil.checkCode(ret.state)){
                                finger.fingerParms.imgUrl = ret.data;
                            }
                        });
    
                        beginEnroll.beginEnroll(ocxObj);
                        
                    }else{
                        finger.fingerParms.imgBase64 = '';
                    }
                },
                ok:function(){
                    $modalInstance.close({
                        imgUrl:finger.fingerParms.imgUrl,
                        paTemplate:finger.fingerParms.paTemplate,
                        iLen:finger.fingerParms.iLen
                    })
                },
                cancel: function () {
                    $modalInstance.dismiss();
                }
            }

            $scope.$on("$destroy", function() {
                mkvOcx.uninitSensor(ocxObj);
                mkvOcx.unInit(ocxObj);
                ocxObj = null;
                var index = normalUtil.eleInArr(subject.ocxArray,'name','fingerPrintOcx');
                subject.ocxArray.splice(index,1);
            })
    })
})
