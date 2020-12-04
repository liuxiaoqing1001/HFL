$(function () {
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

    $('.carousel').carousel({
        interval: 2000
    });

    // 从sessionStorage取出登录者信息
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    if (null != userObj) {
        $("#loginUser").text(userObj.name);
        $(".showLoginUser").text(userObj.name);
        // $(".caret").text(userObj.name);
    } else {
        $(".showLoginUser").text('未登录');
    }

    // 未登录用户不允许访问该页
    if(str == null || str == undefined || str == "") {
        location.href="../Login.html" ;
    }



    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showUserPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        var photoSrc = userPhotoPath + userObj.name;
        $("#showUserPhoto").attr("src",photoSrc);
        // $("#showUserPhoto").attr("src" ,userObj.photourl) ;
    }

    $.ajax({
        url : videoVType ,
        type : 'GET' ,
        contentType : 'application/json;charset=UTF-8',
        success:function(reqData) {
            // console.log(reqData.data.length) ;
            for (var i = 0 ; i < reqData.data.length ; i++) {
                var div1 = $('<div class="sortDiv">' +
                    '<a name="'+reqData.data[i].typename+'">'+reqData.data[i].typename+'</a>' +
                    '<a class="more moreVideo">更多>></a>' +
                    '</div>');
                var div2 = $('<div id='+reqData.data[i].id+' class="block page"></div>');

                var ul = $('<li style="margin-right: 20px ; list-style: none ; float: left ; background-color: #fcfcfc;">' +
                    '<a class="ulType">'+reqData.data[i].typename+'</a>' +
                    '</li>');

                ul.appendTo($("#sort"));
                div1.appendTo($("#mainBody"));
                div2.appendTo($("#mainBody"));

                $(".ulType").eq(i).attr("href" , "#" + reqData.data[i].typename);
                $(".moreVideo").eq(i).attr("name" , reqData.data[i].typename);
                getVideoByTypeName(reqData.data[i].id , reqData.data[i].typename);

            }

            //写成漂浮按钮
            var bottom = $('<div style="float: right ; background-color: #fcfcfc; width: 60px ;height: 20px ; text-align: center;" >' +
                '<a class="top" href="First.html">返回顶部</a>' +
                '</div>');
            bottom.appendTo($("#first"));

            $(".more").click(function () {
                var typename = $(this).attr("name") ;
                sessionStorage.setItem("typename" , typename) ;
                location.href = "More.html" ;
            });



            // console.log(reqData) ;
            // for (var i = 0 ; i < reqData.length ; i++) {
            //
            //
            // }



        }
    });

    // $.ajax({
    //     url : videoTypeServerPath + "/getAllType" ,
    //     type : 'GET' ,
    //     contentType : 'application/json;charset=UTF-8',
    //     success:function(reqData) {
    //         console.log(reqData) ;
    //         for (var i = 0 ; i < reqData.length ; i++) {
    //             var ul = $('<li style="margin-right: 20px ; list-style: none ; float: left ; background-color: #fcfcfc;">' +
    //                 '<a class="ulType">'+reqData[i].typename+'</a>' +
    //                 '</li>')
    //             ul.appendTo($("#sort"))
    //
    //             $(".ulType").eq(i).attr("href" , "#" + reqData[i].typename)
    //
    //         }
    //
    //         var bottom = $('<div style="float: right ; background-color: #fcfcfc; width: 40px ;height: 40px ; text-align: center;" >' +
    //             '<a class="top" href="First.html">返回顶部</a>' +
    //             '</div>')
    //         bottom.appendTo($("#first"))
    //
    //     }
    // });
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
        if(index<4){
            str += '<div class="flexitem">'+
                '<a href="PlayVideo.html?id='+item.id+'" target="_blank">'+
                '<img src="../../img/yyqx1.jpg" height="220" width="300"/>'+
                '</a><p>'+
                '<a href="PlayVideo.html">'+item.title+'</a>'+
                '</p></div>';
        }
    });
    return str;
}

