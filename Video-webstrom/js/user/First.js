$(function () {
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000)

    $('.carousel').carousel({
        interval: 2000
    });


    $.get(
        videoByType + "影视" ,
        function(videoData) {
            // console.log(videoData);
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#type1").append(str) ;
            }
        }
    );

    $.get(
        videoByType + "新闻" ,
        function(videoData) {
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#type2").append(str) ;
            }
        }
    );

    $.get(
        videoByType + "生活" ,
        function(videoData) {
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#type3").append(str) ;
            }
        }
    );

    $.get(
        videoByType + "美食" ,
        function(videoData) {
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#type4").append(str) ;
            }
        }
    );

    $.get(
        videoByType + "音乐" ,
        function(videoData) {
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#type5").append(str) ;
            }
        }
    );

});

function getVideoByType(videoData) {
    videoArr = videoData.data ;
    var str = '' ;
    $.each(videoArr , function(index , item){
        if(index<4){
            // sessionStorage.setItem("thisVideo" , JSON.stringify(item)) ;
            // var thisVideo=JSON.parse(sessionStorage.getItem("thisVideo"));
            str += '<div class="flexitem">'+
                '<a href="PlayVideo.html?id=">'+
                '<img src="../../img/yyqx1.jpg" height="220" width="300"/>'+
                '</a>'+
                '<p>'+
                '<a href="PlayVideo.html">'+item.title+'</a>'+
                '</p>'+
                '</div>';
        }
    });
    return str;
}