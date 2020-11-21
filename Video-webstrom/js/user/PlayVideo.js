$(function () {
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
            console.log(videoData);
            if(0 == videoData.errCode) {
                video = videoData.data ;
                $(".showTitle").html(video.title);
                $(".showUName").text(video.uname);
                $(".showDate").text(video.pubdatetime) ;
                $(".showDescription").text(video.description) ;
            }
        });

    $.get(
        commentByVid + id ,
        function(commentData) {
            console.log(commentData);
            if(0 == commentData.errCode) {
                commentArr = commentData.data ;
                console.log(commentArr);
                var str = '' ;
                var i=0;
                if(commentArr.length==0){
                    str='<p class="comment">该视频还没有评论<p>';
                }else {
                    $.each(commentArr , function(index , item){
                        str += '<li id="'+"li_"+i+'">'+
                            '<span id="sender" class="msg-sender">'+item.sender+'</span>'+
                            '<span class="msg-comment">'+item.comment+'</span>'+
                            '<div class="option">'+
                            '<em class="data-time">'+item.time+'</em>'+
                            '</div></li>';
                        i++;
                        // console.log(str);
                    });
                }
                $(".list").append(str) ;
            }
        });

    //弹幕
    $(".barrage_close").click(function(){
        // console.log("barrage_close");
        $(".content div").remove();
    });

    //提交评论
    $(".s_btn").click(function () {
        console.log("s_btn");
        var text = $(".s_text").val();
        if (text == "") {
            alert('你的内容为空，请填写评论在再发送');
            return false;
        }
        var lable = $("<div style='right:20px;top:0px;opacity:1;color:" + getColor() + ";'class='content_text'>" + text + "</div>");
        $(".content").append(lable.show());
        init_barrage();
        $(".s_text").val("");
    });

    init_barrage();

});

//将弹幕内容放进数组贮存起来
var arr=[];
var barra=arr.push();

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
        console.log(wid);
        var height =$(".video-box").height();
        console.log(height);
        top += 35;
        if (top >= (height - 150)) {
            top = 0;
        }
        $(this).css({ left: wid, top: top, color: getColor() });
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

