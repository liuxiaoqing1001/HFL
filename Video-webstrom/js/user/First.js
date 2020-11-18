$(function () {
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000)

    $('.carousel').carousel({
        interval: 2000
    });

    $.get(
        msgAllReceiver + "liu" ,
        function(msgData) {
            // console.log(msgData);
            if(0 == msgData.errCode) {
                msgArr = msgData.data ;
                var str = '' ;
                var i=0;
                $.each(msgArr , function(index , item){
                    str += '<li id="'+"li_"+i+'">'+
                        '<span id="sender" class="msg-type">'+item.sender+'</span>'+
                        '<span class="msg-title">'+item.title+'</span>'+
                        '<span class="option">'+
                        '<em class="data-time">'+item.time+'</em>'+
                        '</span>'+
                        '<div class="content">'+
                        '<p class="msg">'+item.content+'</p></div></li>';
                    //'<a id="'+item.id+'" class="glyphicon glyphicon-remove">删除</a>'+
                    i++;
                    // console.log(str);
                });
                $(".list").append(str) ;
            }
        }
    );
});