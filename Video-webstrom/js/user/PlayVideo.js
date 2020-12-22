// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
var videoName;

var tag = [];
var t;
var i=0;
var p,c;

$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    // //获取url中"?"符后的字串
    // var req=GetRequest();
    // var a=req["id"];
    // console.log(a);

    // console.log(GetQueryString("id"));
    var id=GetQueryString("id");
    var videoSrc = videoPlayPath + id;
    $("#showVideo").attr("src",videoSrc);

    $.get(
        videoById + id ,
        function(videoData) {
            // console.log(videoData);
            if(0 == videoData.errCode) {
                video = videoData.data ;
                $(".showTitle").html(video.title);
                $(".showUName").text(video.uname);
                videoName=video.uname;
                $(".showDate").text(video.pubdatetime) ;
                $(".showDescription").text(video.description) ;
            }
        });

    $.get(
        commentSumByVid + id ,
        function(videoData) {
            // console.log(videoData);
            $("#comm").text(videoData.data);
        });

    $.ajax({
        url: praiseNum + id,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqPData) {
            // console.log(reqPData);
            p=reqPData.data;
            $("#praise").text(p);
        }
    });

    $.ajax({
        url: collectNum + id ,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqCData) {
            // console.log(reqCData);
            c=reqCData.data;
            $("#collect").text(c);
        }
    });

    $(".praiseOpera").click(function () {
        var pMsg = {
            vid: id,
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
                        url : videoById + id ,
                        type : 'GET',
                        dataType : 'json' ,
                        success : function(reqData){
                            var praiseMsg = {
                                title: "点赞消息" ,
                                content: userObj.name +"赞了你的 " + reqData.data.title + " 视频" ,
                                sender: userObj.name ,
                                receiver: videoName
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
                        url : videoById + id ,
                        type : 'GET',
                        dataType : 'json' ,
                        success : function(reqData){
                            // console.log(uname +"/" + reqData.data.title + "/" + vUname);
                            $.ajax({
                                url : msgDelP + userObj.name +"/" + reqData.data.title + "/" + videoName  ,
                                type : 'DELETE',
                                contentType : 'application/json;charset=UTF-8',
                                dataType : 'json' ,
                                success : function(reqData){
                                    // console.log(reqData);
                                    if(reqData.errCode==0){
                                        $.ajax({
                                            url : praiseDel + id + "/" + userObj.name  ,
                                            type : 'DELETE',
                                            contentType : 'application/json;charset=UTF-8',
                                            dataType : 'json' ,
                                            success : function(reqData){
                                                location.reload();
                                                // alert(reqData.msg)
                                            }
                                        });
                                    }else {
                                        alert(reqData.msg);
                                    }
                                }
                            });
                        }
                    });

                    // $.ajax({
                    //     url : praiseDel + id + "/" + userObj.name  ,
                    //     type : 'DELETE',
                    //     contentType : 'application/json;charset=UTF-8',
                    //     dataType : 'json' ,
                    //     success : function(reqData){
                    //         location.reload();
                    //         // alert(reqData.msg)
                    //     }
                    // });
                }
            }
        }) ;
    });

    $(".collectOpera").click(function () {
        var cMsg = {
            vid: id,
            uname: userObj.name
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
                        url : videoById + id ,
                        type : 'GET',
                        dataType : 'json' ,
                        success : function(reqData){
                            var collectMsg = {
                                title: "收藏消息" ,
                                content: userObj.name +"收藏了你的 " + reqData.data.title + " 视频" ,
                                sender: userObj.name ,
                                receiver: videoName
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
                        url : videoById + id ,
                        type : 'GET',
                        dataType : 'json' ,
                        success : function(reqData){
                            $.ajax({
                                url : msgDelC + userObj.name +"/" + reqData.data.title + "/" + videoName  ,
                                type : 'DELETE',
                                contentType : 'application/json;charset=UTF-8',
                                dataType : 'json' ,
                                success : function(reqData){
                                    // console.log(reqData);
                                    if(reqData.errCode==0){
                                        $.ajax({
                                            url : collectDel + id + "/" + userObj.name  ,
                                            type : 'DELETE',
                                            contentType : 'application/json;charset=UTF-8',
                                            dataType : 'json' ,
                                            success : function(reqData){
                                                location.reload();
                                                // alert(reqData.msg)
                                            }
                                        });
                                    }else {
                                        alert(reqData.msg);
                                    }
                                }
                            });
                        }
                    });

                    // $.ajax({
                    //     url : collectDel + id + "/" + userObj.name  ,
                    //     type : 'DELETE',
                    //     contentType : 'application/json;charset=UTF-8',
                    //     dataType : 'json' ,
                    //     success : function(reqData){
                    //         location.reload();
                    //         // alert(reqData.msg)
                    //     }
                    // });
                }
            }
        }) ;
    });

    $.get(
        commentByVid + id ,
        function(commentData) {
            // console.log(commentData);
            if(0 == commentData.errCode) {
                commentArr = commentData.data ;
                // console.log(commentArr);
                var str = '' ;
                var str2 = '';
                var t =0;
                if(commentArr.length==0){
                    str='<p class="comment">该视频还没有评论<p>';
                }else {
                    $.each(commentArr , function(index , item){
                        str += '<li>'+
                            '<span id="sender" class="msg-sender">'+item.sender+":"+'</span>'+
                            '<span class="msg-comment">'+item.comment+'</span></li>';
                        // console.log(str);
                        tag.push(item.comment);
                    });
                }
                $(".list").append(str) ;

                // console.log(tag);
                t=setInterval('show(i++)',3000);
            }
        });

    //弹幕
    $(".barrage_close").click(function(){
        // console.log($(".barrage_close")[0].firstChild.data);
        if ($(".barrage_close")[0].firstChild.data=="关闭弹幕"){
            i=tag.length;
            $(".content div").remove();
            $(".barrage_close")[0].firstChild.data="开启弹幕";
        }else {
            i=0;
            t=setInterval('show(i++)',3000);
            $(".barrage_close")[0].firstChild.data="关闭弹幕";
        }

    });

    //提交评论
    $(".s_btn").click(function () {
        console.log("s_btn");
        var text = $(".s_text").val();
        if (text == "") {
            alert('你的内容为空，请填写评论在再发送');
            return false;
        }

        var commentObj = {
            vid : id,
            comment : text,
            sender : userObj.name,
            receiver : videoName,
        } ;
        var commentData = JSON.stringify(commentObj) ;
        // console.log(commentObj);
        console.log(commentData);
        $.ajax({
            url : commentAddComment ,
            type : 'POST',
            data : commentData,
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                // alert(reqData.msg) ;
                var lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getColor() + ";'class='content_text'>" + text + "</div>");
                $(".content").append(lable.show());
                init_barrage();
                $(".s_text").val("");

                tag.push(text);

                str = '<li>'+
                    '<span id="sender" class="msg-sender">'+userObj.name+":"+'</span>'+
                    '<span class="msg-comment">'+text+'</span></li>';
                $(".list").append(str) ;

                var msgObj = {
                    title : "评论你",
                    content : text,
                    sender : userObj.name,
                    receiver : video.uname,
                    // time : initDate(new Date())
                } ;
                var msgData = JSON.stringify(msgObj) ;
                console.log(msgData);
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

                $.get(
                    commentSumByVid + id ,
                    function(videoData) {
                        // console.log(videoData);
                        $("#comm").text(videoData.data);
                    });
            }
        });

    });

    // init_barrage();

});

function show(i) {
    //如果超过数组长度，清除定时器
    if(i>tag.length-1){
        clearInterval(t);
        i=0;
    }else {
        var lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getColor() + ";'class='content_text'>" + tag[i] + "</div>");
        $(".content").append(lable.show());
        init_barrage();
        // console.log("i:"+i);
    }
}

// 按enter发送
document.onkeydown=function(event){
    var e = event || window.event;
    if(e && e.keyCode==13){
        console.log("enter");
        $(".s_btn").click();
    }
};

function init_barrage() {
    var top = 0;
    $(".content div").show().each(function () {
        var wid =$(".video-box").width();
        // console.log(wid);
        var height =$(".video-box").height();
        // console.log(height);
        top += 35;
        if (top >= (height - 150)) {
            top = 10;
        }
        $(this).css({left: wid, top: top, color: getColor()});
    });
}

//随机颜色
function getColor() {
    return '#' + (function (h) {
        return new Array(7 - h.length).join("0") + h
    })
    ((Math.random() * 0x1000000 << 0).toString(16))
}

// //获取url中"?"符后的字串
// function GetRequest() {
//         var url = location.search;
//         var theRequest = new Object();
//         if (url.indexOf("?") != -1) {
//                 var str = url.substr(1);
//                 strs = str.split("&");
//                 for(var i = 0; i < strs.length; i ++) {
//                         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
//                 }
//         }
//         return theRequest;
// }

//获取url中"?"符后的字串        正则分析
function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null)
                return (r[2]);
        return null;
}

