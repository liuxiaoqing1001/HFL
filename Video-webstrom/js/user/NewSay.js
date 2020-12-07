var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;
var vUname;
var p;
var c;
// console.log("uname:"+uname);

$(function () {
    $.ajax({
        url: sayGetAll,
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function (reqData) {
            // console.log(reqData.data);
            if(reqData.data.length==0){
                $("#say").append("<p style=\"color: #3e8f3e;text-indent:2em\">目前没有任何动态<p>") ;
            }else {
                for (var i = 0; i < reqData.data.length; i++) {

                    if(reqData.data[i].photourl == null || reqData.data[i].photourl == '') {
                        srcUrl = "../../img/userphoto_default.jpg" ;
                    } else {
                        srcUrl = userPhotoPath + reqData.data[i].uname ;
                    }

                    var content = $('<div style="float: left;clear: both;" class="content" >' +
                        '<img src='+srcUrl+' class="img-circle img"/>' + '</div>' +
                        '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span></p>' +
                        '<span>' + reqData.data[i].time + '</span></div>' +
                        // '<div class="btn-group" style="float: right;margin-right: 110px;" >' +
                        // '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                        // '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                        // '<ul class="dropdown-menu " id="menu">' +
                        // '<li><a href="NewSay.html" >' + "所有" + '</a></li>' +
                        // '<li><a href="#" class="NoLookit">' + "不看他" + '</a></li>' +
                        // '<li role="separator" class="divider"></li>' +
                        // '<li><a href="#">' + "取消" + '</a></li>' +
                        // '</ul>' +
                        // '</div>' +
                        '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 20px">' +
                        '<a href="PlayVideo.html?id='+reqData.data[i].vid+'" target="_blank">'+ reqData.data[i].say+ '</a></div>' +
                        '<div style="float: right">' +
                        '<button class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+
                        getP(reqData.data[i].vid) + '</button>' +
                        '<button class="glyphicon glyphicon-heart-empty collect" style="margin-right: 20px;" >'+
                        getC(reqData.data[i].vid) + '</button>'+
                        // '<button class="glyphicon glyphicon-pencil forward" style=0"margin-right: 50px;" type="button"/>' +
                        '</div><hr/>'
                    );
                    content.appendTo($("#say"));

                    $(".img").eq(i).attr("id", reqData.data[i].id);

                    $(".praise").eq(i).attr("id", reqData.data[i].id);
                    $(".collect").eq(i).attr("id", reqData.data[i].id);
                    $(".praise").eq(i).attr("vid", reqData.data[i].vid);
                    $(".collect").eq(i).attr("vid", reqData.data[i].vid);
                }

                $(".praise").click(function () {
                    var id = $(this).attr("id");
                    var vid = $(this).attr("vid");

                    $.get(
                        videoVUname +vid,
                        function(reqData) {
                            vUname=reqData.data;
                        }
                    );

                    var pMsg = {
                        vid: vid,
                        uname: uname
                    };
                    $.ajax({
                        url : praiseAdd ,
                        type : "POST" ,
                        data :JSON.stringify(pMsg),
                        contentType : 'application/json;charset=UTF-8',
                        dataType : 'json' ,
                        success : function(reqData){
                            if (reqData.msg == "点赞成功") {
                                alert(reqData.msg) ;
                                /**
                                 * 发送点赞消息
                                 */
                                $.ajax({
                                    url : videoById + vid ,
                                    type : 'GET',
                                    dataType : 'json' ,
                                    success : function(reqData){
                                        var praiseMsg = {
                                            title: "点赞消息" ,
                                            content: uname +"赞了你的<<" + reqData.data.title + ">>视频" ,
                                            sender: uname ,
                                            receiver: vUname
                                        };
                                        localStorage.setItem("praiseMsg" ,JSON.stringify(praiseMsg)) ;
                                        // alert("发送点赞消息成功！");
                                        /**
                                         * 保存发送消息进数据库消息表
                                         */
                                        $.ajax({
                                            url : msgAdd ,
                                            type : 'POST',
                                            data : JSON.stringify(praiseMsg),
                                            contentType : 'application/json;charset=UTF-8',
                                            dataType : 'json' ,
                                            success : function(reqData){
                                                location.reload();
                                            }
                                        });
                                    }
                                });
                            } else if (reqData.msg == "您已经赞过该视频") {
                                $.ajax({
                                    url : praiseDel + vid + "/" + uname  ,
                                    type : 'DELETE',
                                    contentType : 'application/json;charset=UTF-8',
                                    dataType : 'json' ,
                                    success : function(reqData){
                                        location.reload();
                                        // alert(reqData.msg)
                                    }
                                });
                            }
                        }
                    }) ;
                });

                $(".collect").click(function () {
                    var id = $(this).attr("id");
                    var vid = $(this).attr("vid");
                    $.get(
                        videoVUname +vid,
                        function(reqData) {
                            vUname=reqData.data;
                        }
                    );

                    var cMsg = {
                        vid: vid,
                        uname: uname
                    };
                    $.ajax({
                        url : collectAdd ,
                        type : "POST" ,
                        data :JSON.stringify(cMsg),
                        contentType : 'application/json;charset=UTF-8',
                        dataType : 'json' ,
                        success : function(reqData){
                            if (reqData.msg == "收藏成功") {
                                alert(reqData.msg) ;
                                /**
                                 * 发送收藏消息
                                 */
                                $.ajax({
                                    url : videoById + vid ,
                                    type : 'GET',
                                    dataType : 'json' ,
                                    success : function(reqData){
                                        var collectMsg = {
                                            title: "收藏消息" ,
                                            content: uname +"收藏了你的<<" + reqData.data.title + ">>视频" ,
                                            sender: uname ,
                                            receiver: vUname
                                        };
                                        localStorage.setItem("collectMsg" ,JSON.stringify(collectMsg)) ;
                                        /**
                                         * 保存发送消息进数据库消息表
                                         */
                                        $.ajax({
                                            url : msgAdd ,
                                            type : 'POST',
                                            data : JSON.stringify(collectMsg),
                                            contentType : 'application/json;charset=UTF-8',
                                            dataType : 'json' ,
                                            success : function(reqData){
                                                location.reload();
                                            }
                                        });
                                    }
                                });
                            } else if (reqData.msg == "您已经收藏过该视频") {
                                $.ajax({
                                    url : collectDel + vid + "/" + uname  ,
                                    type : 'DELETE',
                                    contentType : 'application/json;charset=UTF-8',
                                    dataType : 'json' ,
                                    success : function(reqData){
                                        location.reload();
                                        // alert(reqData.msg)
                                    }
                                });
                            }
                        }
                    }) ;
                });

            }
        }
    });
});

function getP(vid) {
    $.ajax({
        url: praiseNum + vid,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqPData) {
            // console.log(reqPData);
            p=reqPData.data;
        }
    });
    return p;
}

function getC(vid) {
    $.ajax({
        url: collectNum + vid ,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqCData) {
            // console.log(reqCData);
            c=reqCData.data;
        }
    });
    return c;
}

