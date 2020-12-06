var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;
var vUname;
// console.log("uname:"+uname);

$(function () {
    $.ajax({
        url: sayGetAll,
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function (reqData) {
            // console.log(reqData.data);
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
                    '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+reqData.data[i].praise + '</button>' +
                    '<button class="glyphicon glyphicon-heart-empty collect" style="margin-right: 20px;" >'+reqData.data[i].collect + '</button>'+
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
                    uname: userObj.name
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
                                url : videoServerPath + "/getVideoById/" + videoId ,
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
                                    alert("发送点赞消息成功！");
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
                                            /**
                                             * 更新点赞数量
                                             */
                                            var upData = {
                                                id : id ,
                                                praise : ++praise
                                            };
                                            $.ajax({
                                                url : dynamicServerPath + "update",
                                                type : 'PUT',
                                                data : upData,
                                                dataType : 'json' ,
                                                success : function(reqData){
                                                    // alert(reqData.msg) ;
                                                    location.href = "Square.html" ;
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else if (reqData.msg == "您已经赞过该视频") {
                            /**
                             * 发送点赞消息
                             */
                            $.ajax({
                                url : videoServerPath + "/getVideoById/" + videoId ,
                                type : 'GET',
                                dataType : 'json' ,
                                success : function(reqData){
                                    var praiseMsg = {
                                        title: "取消点赞消息" ,
                                        content: userObj.name +"取消点赞了你的" + reqData.data.title + "视频" ,
                                        sender: userObj.name ,
                                        receiver: vUname
                                    };
                                    localStorage.setItem("praiseMsg" ,JSON.stringify(praiseMsg)) ;
                                    alert("发送取消点赞消息成功！")
                                    /**
                                     * 保存发送消息进数据库消息表
                                     */
                                    $.ajax({
                                        url : videoAddMsg ,
                                        type : 'POST',
                                        data : JSON.stringify(praiseMsg),
                                        contentType : 'application/json;charset=UTF-8',
                                        dataType : 'json' ,
                                        success : function(reqData){
                                            /**
                                             * 更新点赞数量
                                             */
                                            var upData = {
                                                id : id ,
                                                praise : --praise
                                            };
                                            $.ajax({
                                                url : dynamicServerPath + "update",
                                                type : 'PUT',
                                                data : upData,
                                                dataType : 'json' ,
                                                success : function(reqData){
                                                    // alert(reqData.msg) ;
                                                    location.href = "Square.html" ;
                                                    /**
                                                     * 删除点赞记录
                                                     */

                                                    $.ajax({
                                                        url : praiseServerPath + "deletePraise/" + videoId + "/" + userObj.name  ,
                                                        type : 'DELETE',
                                                        contentType : 'application/json;charset=UTF-8',
                                                        dataType : 'json' ,
                                                        success : function(reqData){
                                                            // alert(reqData.msg)
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    }
                }) ;


                // $.get(
                //     videoVUname +vid,
                //     function(reqData) {
                //         vUname=reqData.data;
                //     }
                // );
                // $.ajax({
                //     url: sayGetPraiseCount + id,
                //     type : 'GET',
                //     dataType : 'json' ,
                //     success: function (reqdata) {
                //         sessionStorage.setItem("praiseCount",reqdata.data);
                //         count=reqdata.data+1;
                //         if(reqdata.errCode==0){
                //             $.ajax({
                //                 url: sayPraiseCount + vid + "/" + count,
                //                 type : 'PUT',
                //                 dataType : 'json' ,
                //                 success: function (data) {
                //                     alert("爱你哦~");
                //                     var msgObj = {
                //                         title : "给你点赞",
                //                         content : "-"+uname+"-biu～地给你点了个赞",
                //                         sender : uname,
                //                         receiver : vUname,
                //                         // time : initDate(new Date())
                //                     } ;
                //                     var msgData = JSON.stringify(msgObj) ;
                //                     // console.log(msgData);
                //                     $.ajax({
                //                         url : msgAdd ,
                //                         type : 'POST',
                //                         data : msgData,
                //                         contentType : 'application/json;charset=UTF-8',
                //                         dataType : 'json' ,
                //                         success : function(reqData){
                //                             console.log(reqData.msg);
                //                         }
                //                     });
                //                     location.reload([true]);
                //                 }
                //             });
                //         }
                //     }
                // });
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
                $.ajax({
                    url: sayGetCollectCount + id,
                    type : 'GET',
                    dataType : 'json' ,
                    success: function (reqdata) {
                        sessionStorage.setItem("praiseCount",reqdata.data);
                        count=reqdata.data+1;
                        if(reqdata.errCode==0){
                            $.ajax({
                                url: sayCollectCount + vid + "/" + count,
                                type : 'PUT',
                                dataType : 'json' ,
                                success: function (data) {
                                    alert("爱你哦~");
                                    var msgObj = {
                                        title : "收藏了你的视频",
                                        content : "-"+uname+"-华丽丽地～收藏了你的视频",
                                        sender : uname,
                                        receiver : vUname,
                                    } ;
                                    var msgData = JSON.stringify(msgObj) ;
                                    $.ajax({
                                        url : msgAdd ,
                                        type : 'POST',
                                        data : msgData,
                                        contentType : 'application/json;charset=UTF-8',
                                        dataType : 'json' ,
                                        success : function(reqData){
                                            console.log(reqData.msg);
                                        }
                                    });
                                    location.reload([true]);
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});

function getPAndC() {


}
