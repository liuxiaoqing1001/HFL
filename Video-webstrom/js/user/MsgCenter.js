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

    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showUserPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#showUserPhoto").attr("src",photoSrc);
    }

    // 日期
    setInterval(function () {
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

    $.get(
        msgAllReceiver + userObj.name ,
        function(msgData) {
            // console.log(msgData);
            if(0 == msgData.errCode) {
                msgArr = msgData.data ;
                // console.log(msgArr);
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

    $("#Search").click(function () {
        var content=$('#searchByKeyWord input[name="content"]').val();
        console.log(content);
        if(content==""){
            alert("要想搜索，搜索框不能为空");
        }else {
            $.ajax({
                url : videoByKeyWord + content ,
                type : 'GET',
                dataType : 'json' ,
                success : function(reqData){
                    console.log(reqData) ;
                    $(".msg-list").empty();
                    for (var i = 0 ; i < reqData.data.length ; i++) {
                        var content = $('<div style="float: left;both:clear;margin-right: 23px"><div >' +
                            '<video controls="controls" src="'+videoPlayPath + reqData.data[i].id+'" />' + '</div>' +
                            '<div ><span class="name">' +"用户:"+ reqData.data[i].uname + '</span>' + '</p>' +
                            '<span>'  +"标题:"+ reqData.data[i].title + '</span>' +
                            '</div></div>'
                        );
                        content.appendTo($(".msg-list"));

                        // $(".img").eq(i).attr("id", reqData.data[i].id);
                        // $(".editor").eq(i).attr("id", reqData.data[i].id);
                        // $(".delete").eq(i).attr("id", reqData.data[i].id);
                        // $(".say").eq(i).attr("id", reqData.data[i].id);

                        // if (reqData.data[i].photourl != null) {
                        //     $(".img").attr("src", reqData.data[i].photourl);
                        // }
                    }
                }
            })
        }

    });

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