/**
 * Created by whh on 2014/9/3.
 */


define(['app'], function (app) {
    /*
    * 将长度大于某一长度的字符串，超过指定长度的部分使用省略号表示    *
    * */
    app.filter('omitstring', function () {
        return function (input, length) {
            if (!angular.isString(input))
                return input;
            var result;
            if (input.length > length)
                result = input.substring(0, length) + "...";
            else
                result = input;
            return result;
        };
    });

    /*
    * 文件长度格式转换，文件大小输入的应该是字节数量
    * */
    app.filter('filesize',function(){

        /*
         四舍五入保留小数位数
         numberRound 被处理的数
         roundDigit  保留几位小数位
         */
        function  roundFun(numberRound,roundDigit)
        {
            if(numberRound>=0) {
                var   tempNumber   =   parseInt((numberRound   *   Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
                return   tempNumber;
            }else{
                numberRound1=-numberRound
                var   tempNumber   =   parseInt((numberRound1   *   Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
                return   -tempNumber;
            }
        }
        /*附件大小格式处理*/
        function renderSize(value){
            if(null==value||value==''){
                return "0 Bytes";
            }
            var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
            var index=0;
            var srcsize = parseFloat(value);
            var size =roundFun(srcsize/Math.pow(1024,(index=Math.floor(Math.log(srcsize)/Math.log(1024)))),2);
            return size+unitArr[index];
        }

        return function(input) {
            return renderSize(input);
        };
    });
});
