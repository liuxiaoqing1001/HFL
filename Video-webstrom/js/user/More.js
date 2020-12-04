$(function () {

    var typename = sessionStorage.getItem("typename");

    $.get(
        videoByType + typename ,
        function(videoData) {
            // console.log(videoData);
            // console.log(videoByType + typename);
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $(".container-fluid").append(str) ;
            }
        }
    );
});

function getVideoByType(videoData) {
    videoArr = videoData.data ;
    var str = '' ;
    $.each(videoArr , function(index , item){
// console.log("index:::::::::::::::" + index);
        if (index % 4 != 0) {
            str += '<div class="flexitem" style="float: left">' +
                '<a href="PlayVideo.html?id=' + item.id + '">' +
                '<img src="../../img/yyqx1.jpg" height="220" width="300" style="margin-right: 50px ; margin-top: 10px" class="img-thumbnail"/>' +
                '</a><p>' +
                '<a href="PlayVideo.html">' + item.title + '</a>' +
                '</p></div>';
        } else {
            str += '<div style="clear: both"></div>' +
                '<div class="flexitem" style="float: left">' +
                '<a href="PlayVideo.html?id=' + item.id + '">' +
                '<img src="../../img/yyqx1.jpg" height="220" width="300" style="margin-right: 50px; margin-top: 10px" class="img-thumbnail"/>' +
                '</a><p>' +
                '<a href="PlayVideo.html">' + item.title + '</a>' +
                '</p></div>'
        }
    });
    return str;
}

