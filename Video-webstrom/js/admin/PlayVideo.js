$(function(){
    // $("video-box").on("click",function () {
        // var src=$(this).data("src");
        var src= videoPath;
    // , sourceDom=$("<source src=\""+src+"\">")
        $("#video-box showVideo").src=src;
        $("#video-box").play();
    // })


    // var videoSrc = videoPath;
    // document.getElementById("videoid").src=videoSrc ;
    // document.getElementById("videoid").play();
})