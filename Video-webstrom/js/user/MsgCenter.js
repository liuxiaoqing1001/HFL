$(function () {

    // 日期
    setInterval(function () {
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

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
                        '<a id="'+item.id+'" class="glyphicon glyphicon-remove">删除</a>'+
                        '</span>'+
                        '<div class="content">'+
                        '<p class="msg">'+item.content+'</p></div></li>';
                    i++;
                    // console.log(str);
                });
                $(".list").append(str) ;
            }
        }
    );

});