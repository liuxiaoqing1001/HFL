$(function(){
    // $("video-box").on("click",function () {
        // var src=$(this).data("src");
        var src= videoPath;
    // , sourceDom=$("<source src=\""+src+"\">")
        $("#video-box video").src=src;
        $("#video-box").play();
    // })
    // var videoSrc = videoPath;//新的视频播放地址
    // document.getElementById("videoid").src=videoSrc ;
    // document.getElementById("videoid").play();
})