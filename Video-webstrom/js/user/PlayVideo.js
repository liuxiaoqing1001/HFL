$(function () {
        // //获取url中"?"符后的字串
        // var req=GetRequest();
        // var a=req["id"];
        // console.log(a);
        console.log(GetQueryString("id"));
        var id=GetQueryString("id");
        var videoSrc = videoPlayPath + id;
        $("#showVideo").attr("src",videoSrc);

        // $(".showTitle").html("title");

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
            }
        );

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
                                            console.log(str);
                                    });
                            }
                            $(".list").append(str) ;
                    }
            }
        );



        // 打印最后一个保存的thisVideo（错误，修改）
        // description: "coffe"
        // id: 2
        // pubdatetime: "2020年10月08日 00:42:10"
        // status: "未审核"
        // title: "startPark"
        // typeid: 2
        // uname: "liu"
        // videopath: "tweetsip.mp4"

});

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

