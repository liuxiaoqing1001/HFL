// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;

$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    if (null != userObj) {
        $(".showLoginUser").text(userObj.name);
        // $(".caret").text(userObj.name);
    } else {
        $(".showLoginUser").text('未登录');
    }

    // 日期
    setInterval(function () {
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

    $.get(
        msgAllReceiver + userObj.name ,
        function(msgData) {
            console.log(msgData);
            if(0 == msgData.errCode) {
                msgArr = msgData.data ;
                console.log(msgArr);
                var str = '' ;
                var i=0;
                if(msgArr.length==0){
                    str='<p class="msg">目前没有任何消息<p>';
                }else {
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
                }
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