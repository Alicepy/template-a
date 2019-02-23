/**
 * usb播放
 * @Author: zhangxuelian 
 * @Date: 2018-01-07 20:50:28 
 * @Last Modified by: zhangxuelian
 * @Last Modified time: 2018-05-26 11:18:37
 **/
define(['app/common/app', 'common/ocx/ocx3.0/mkv_ocx_3.0', 'layer'], function (app,mkvOcx,layer) {
    app.registerController('usbPlayCtrl',
        function ($scope, $modalInstance, $modal, Models,$timeout,commonUtil,modalExt,content,constant_imagestore_url,constant_filestore_url,subject,normalUtil) {

            var usbDicMap = [{
                count: 0,
                keyVal: 'VSKY',
                name: '高拍仪'
            },{
                count: 0,
                keyVal: 'USB',
                name: 'usb摄像头'
            },{
                count: 0,
                keyVal: 'Logitech',
                name: '罗技摄像头'
            }]

            $scope.content = content;
            var ocxObj = null;

            var usbPlay = $scope.usbPlay = {
                imgprefix:constant_imagestore_url+'_332x250/',
                url:"",
                selectDevices:{
                    data: [],
                    filter: false,
                    panelHeight: 'auto'
                },
                currentCamera:"",
                load:function(){
                    $timeout(function(){
              
                        try{
                            //初始化ocx
                            ocxObj = mkvOcx.init("mkvOcx",function(ret){
                                //console.log(ret);注册回调
                            }).ocxObj;
                            subject.ocxArray.push({
                                name: 'mkvOcx',
                                obj: ocxObj
                            });
                        }catch(e){
                            modalExt.comfirm({
                                title: "系统提示",
                                content: "您未安装OCX控件，是否现在下载？",
                                type: 'warning',
                                height:200,
                                comfirmCallback: function() {
                                    window.open(constant_filestore_url+"/transport/GSWebOcxPackageSetup.exe");
                                },
                            })
                        }
                        
                        var cameraListRet = mkvOcx.getUsbCamaraList(ocxObj);
                        mkvOcx.createView(ocxObj);
                        if(cameraListRet && cameraListRet.cameralist && cameraListRet.cameralist.length){
                            var tempArr = [];

                            //数据格式化及翻译
                            angular.forEach(cameraListRet.cameralist,function(item,i){
                                var temp = {};
                                var flag = true;
                                angular.forEach(usbDicMap,function(list,j){
                                    if(item.indexOf(list.keyVal) != -1){
                                        flag = false;
                                        if(list.count){
                                            temp.label = list.name + list.count;
                                        }else{
                                            temp.label = list.name;
                                        }
                                        list.count++;
                                    }
                                });
                                if(flag){
                                    temp.label = item;
                                }
                                temp.value = item;
                                tempArr.push(temp);
                            });
                            usbPlay.selectDevices.data = tempArr;

                            //同域本地存储上次使用usb摄像头类型,当前仅默认取高拍仪和USB接口摄像头
                            if(content.storageName){
                                var shotInstrument = localStorage.getItem(content.storageName);
                                if(shotInstrument && normalUtil.eleInArr(tempArr,'value',shotInstrument) != -1){
                                    usbPlay.selectDevices.setValue = shotInstrument;
                                    mkvOcx.startPlayVideo(ocxObj,{szCameraName:shotInstrument});
                                }else if(content.storageName.indexOf("USB") != -1){
                                    var index = 0;
                                    for(var i=0; i<tempArr.length; i++){
                                        if(tempArr[i].value.indexOf("USB") != -1){
                                            index = i;
                                            break;
                                        }
                                    }
                                    usbPlay.selectDevices.setValue = tempArr[index].value;
                                    mkvOcx.startPlayVideo(ocxObj,{szCameraName:tempArr[index].value});
                                    localStorage.setItem(content.storageName,tempArr[index].value);
                                }else if(content.storageName.indexOf("VSKY") != -1){
                                    var index = 0;
                                    for(var i=0; i<tempArr.length; i++){
                                        if(tempArr[i].value.indexOf("VSKY") != -1){
                                            index = i;
                                            break;
                                        }
                                    }
                                    usbPlay.selectDevices.setValue = tempArr[index].value;
                                    mkvOcx.startPlayVideo(ocxObj,{szCameraName:tempArr[index].value});
                                    localStorage.setItem(content.storageName,tempArr[index].value);
                                }else{
                                    usbPlay.selectDevices.setValue = tempArr[0].value;
                                    mkvOcx.startPlayVideo(ocxObj,{szCameraName:cameraListRet.cameralist[0]});
                                    localStorage.setItem(content.storageName,tempArr[0].value);
                                }
                            }else{
                                usbPlay.selectDevices.setValue = tempArr[0].value;
                                mkvOcx.startPlayVideo(ocxObj,{szCameraName:cameraListRet.cameralist[0]});
                            }
                        }else{
                            modalExt.modalTip({content:"未识别到USB摄像头！",type:"warning",height:150});
                            return;
                        }
                    },500);
                },
                startPlayVideo:function(){
                    mkvOcx.stopPlayViedo(ocxObj);
                    mkvOcx.destoryViewMKV(ocxObj);
                    mkvOcx.creatViewMKV(ocxObj);
                    mkvOcx.startPlayViedo(ocxObj,{szCameraName:usbPlay.currentCamera});
                    if(content.storageName){
                        localStorage.setItem(content.storageName,usbPlay.currentCamera);
                    }
                }, 
                cancel:function(){
                    $modalInstance.dismiss('cancel');
                },
                capture:function(){
                    layer.load();
                    var ret = mkvOcx.capture(ocxObj);
                    if(ret.code != 0){
                        modalExt.modalTip({content:"抓拍失败！",type:"warning",height:150});
                        return;
                    }
                    Models.File.all('upload').post({        
                        data:'data:image/jpeg;base64,'+ret.data.base64code
                    }).then(function(result){
                        if(commonUtil.checkCode(result.state)){
                            usbPlay.url = result.data;
                            layer.closeAll('loading');
                        }
                    })
                },
                confirm:function(){
                    $modalInstance.close({
                        url:usbPlay.url,
                        description:usbPlay.description
                    })
                }
            }
            
            $scope.$on("$destroy",function(){
                $timeout(function(){
                    mkvOcx.startPlayVideo(ocxObj);
                    mkvOcx.stopPlayVideo(ocxObj);
                    mkvOcx.unInit(ocxObj);
                    ocxObj = null;
                    var index = normalUtil.eleInArr(subject.ocxArray,'name','mkvOcx');
                    subject.ocxArray.splice(index,1);
                },1000);
            });
        })
})