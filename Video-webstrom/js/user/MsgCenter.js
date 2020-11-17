$(function () {

    $.get(
        msgAllReceiver + "liu" ,
        function(msgData) {
            console.log(msgData);
            if(0 == msgData.errCode) {
                msgArr = msgData.data ;
                console.log(msgArr);
                var str = '' ;
                $.each(msgArr , function(index , item){
                    str += '<li id="'+"li_"+item.id+'">'+
                        '<span id="sender" class="msg-type">'+item.sender+'</span>'+
                        '<span class="msg-title">'+item.title+'</span>'+
                        '<span class="option">'+
                        '<em class="data-time">'+item.time+'</em>'+
                        '<a class="glyphicon glyphicon-remove">删除</a>'+
                        '</span>'+
                        '<div class="content">'+
                        '<p class="msg">'+item.content+'</p></div></li>';
                    // '<li value="'+item.id+'">' + item.typename + '</li>' ;
                });
                $("#list").append($("#list").append() + str) ;
            }
        }
    );
});