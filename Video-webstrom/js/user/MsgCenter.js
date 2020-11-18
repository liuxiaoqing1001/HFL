$(function () {

    // 日期
    setInterval(function () {
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

    $.get(
        //"liu“替换成用户名
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

    // $.ajax({
    //     url : msgDel + row.id ,
    //     type : 'DELETE' ,
    //     datatype : 'json' ,
    //     success : function(reqData) {
    //         bootbox.alert(reqData.msg) ;
    //         if(0 == reqData.errCode) {
    //             // 表格刷新
    //             $("#videoTable").bootstrapTable('refresh') ;
    //         }
    //     }
    // });

});