$(function(){

        var vid=2;
        $.ajax({
                type:"GET",
                url:videoPath+vid,
                async:false,
                success:function (data) {
                        console.log("video:"+data);
                        $("#showVideo").innerHTML='<source class="source" src="' + data + '" type="video/mp4">';
                        $("#showVideo").play();

                }
        })

        // // $("video-box").on("click",function () {
        //     // var src=$(this).data("src");
        //     var vid=2;
        //     var src= videoPath+vid;
        //     // sourceDom=$("<source src=\""+src+"\">")
        //     document.getElementById("showVideo").src=src;
        //     document.getElementById("showVideo").play();
        //     // $("#showVideo").src=src;
        //     // $("#showVideo").play();
        // // })


        // var videoSrc = videoPath;
        // document.getElementById("videoid").src=videoSrc ;
        // document.getElementById("videoid").play();
})