$(function () {

    var home = $('<a class="home" href="First.html"> ' +
        '<span class="iconfont">&#xe61e;</span> ' +
        '</a>');
    home.appendTo($("#sort"));

    /**
     * 超链接 锚点
     */
    $.ajax({
        url : videoVType ,
        type : 'GET' ,
        contentType : 'application/json;charset=UTF-8',
        success:function(reqData) {
            for (var i = 0 ; i < reqData.data.length ; i++) {
                // var videoTypeName=reqData.data[i].typename;
                var ul = $('<li style="margin-right: 20px ; list-style: none ; float: left ;">' +
                    '<a class="moreVideo">'+reqData.data[i].typename+'</a>' +
                    '</li>');

                ul.appendTo($("#sort"));
                $(".moreVideo").eq(i).attr("name" , reqData.data[i].typename);

                $(".moreVideo").eq(i).attr("href" , "#" + reqData.data[i].typename);

                getVideoByTypeName(reqData.data[i].id , reqData.data[i].typename);

            }
            $(".moreVideo").click(function () {
                var typename = $(this).attr("name") ;
                sessionStorage.setItem("typename" , typename) ;
                location.href = "More.html" ;
            })
        }
    });

    var typename = sessionStorage.getItem("typename");
    // console.log(typename);

    $.get(
        videoByType + typename ,
        function(videoData) {
            if(0 == videoData.errCode) {
                console.log(videoData);
                if(0 == videoData.errCode) {
                    var str=getVideoByType(videoData);
                    $("#video").append(str) ;
                }
            }
        }
    );
});

function getVideoByTypeName(id , typename) {
    $.get(
        videoByType + typename ,
        function(videoData) {
            // console.log(videoByType + typename);
            if(0 == videoData.errCode) {
                var str=getVideoByType(videoData);
                $("#" + id).append(str) ;
            }
        }
    );

}

function getVideoByType(videoData) {
    videoArr = videoData.data ;
    var str = '' ;
    $.each(videoArr , function(index , item){
        // if(index<4){
        //     str += '<div class="flexitem">'+
        //         '<a href="PlayVideo.html?id='+item.id+'" target="_blank">'+
        //         '<img src="'+videoImg + item.id+'" height="220" width="300"/>'+
        //         '</a><p>'+
        //         '<a href="PlayVideo.html">'+item.title+'</a>'+
        //         '</p></div>';
        // }

        if (index % 4 != 0) {
            str += '<div class="flexitem" style="float: left">' +
                '<a href="PlayVideo.html?id=' + item.id + '">' +
                '<img src='+ videoImg  + item.id + ' height="500" width="600" ' +
                'style="margin-right: 50px ; margin-top: 10px" class="img-thumbnail"/>' +
                '</a><p>' +
                '<a href="PlayVideo.html">' + "<<" + item.title + ">> " + item.description + '</a>' +
                '</p></div>';
        } else {
            str += '<div style="clear: both"></div>' +
                '<div class="flexitem" style="float: left">' +
                '<a href="PlayVideo.html?id=' + item.id + '">' +
                '<img src='+ videoImg  + item.id + ' height="500" width="600" ' +
                'style="margin-right: 50px; margin-top: 10px" class="img-thumbnail"/>' +
                '</a><p>' +
                '<a href="PlayVideo.html">' + "<<" + item.title + ">> " + item.description + '</a>' +
                '</p></div>'
        }

    });
    return str;
}
