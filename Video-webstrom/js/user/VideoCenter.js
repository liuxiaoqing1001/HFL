// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;

if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}

$(function () {
    // 日期
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000);

    if (null != userObj) {
        $(".showLoginUser").text(userObj.name);
        // $(".caret").text(userObj.name);
    } else {
        $(".showLoginUser").text('未登录');
    }

    // 未登录用户不允许访问该页
    if(str == null || str == undefined || str == "") {
        location.href="../Login.html" ;
    }

    $("#Exit").click(function () {
        location.href="../Login.html";
        // 从 sessionStorage 删除所有保存的数据
        sessionStorage.clear();
        alert("已退出登录")
    });

    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showUserPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#showUserPhoto").attr("src",photoSrc);
    }

    $('#collection a[name="collectVideo"]').removeAttr("style") ;
    $('#materialLibrary a[name="libVideo"]').removeAttr("style") ;

    $('#videoLibrary a[name="loadVideo"]').attr("style" , "color:white") ;

    //视频库
    $("#videoLibrary").click(function () {
        $("#contentFrame").attr("src", "VideoLibrary.html");

        $('#collection a[name="collectVideo"]').removeAttr("style") ;
        $('#materialLibrary a[name="libVideo"]').removeAttr("style") ;

        $('#videoLibrary a[name="loadVideo"]').attr("style" , "color:white") ;
    });

    //素材库
    $("#materialLibrary").click(function () {
        $("#contentFrame").attr("src", "Material.html");

        $('#collection a[name="collectVideo"]').removeAttr("style") ;
        $('#videoLibrary a[name="loadVideo"]').removeAttr("style") ;

        $('#materialLibrary a[name="libVideo"]').attr("style" , "color:white") ;
    });

    //待审核
    $("#collection").click(function () {
        $("#contentFrame").attr("src", "Collection.html");

        $('#videoLibrary a[name="loadVideo"]').removeAttr("style") ;
        $('#materialLibrary a[name="libVideo"]').removeAttr("style") ;

        $('#collection a[name="collectVideo"]').attr("style" , "color:white") ;
    });

    $("#Search").click(function () {
        var content=$('#searchByKeyWord input[name="content"]').val();
        console.log(content);
        if(content==""){
            alert("要想搜索，搜索框不能为空");
        }else {
            $.ajax({
                url : videoByKeyWord + content ,
                type : 'GET',
                dataType : 'json' ,
                success : function(reqData){
                    console.log(reqData) ;
                    $("#iframe").empty();
                    for (var i = 0 ; i < reqData.data.length ; i++) {
                        var content = $('<div style="float: left;both:clear;margin-right: 23px"><div >' +
                            '<video controls="controls" src="'+videoPlayPath + reqData.data[i].id+'" />' + '</div>' +
                            '<div ><span class="name">' +"用户:"+ reqData.data[i].uname + '</span>' + '</p>' +
                            '<span>'  +"标题:"+ reqData.data[i].title + '</span>' +
                            '</div></div>'
                        );
                        content.appendTo($("#iframe"));

                    }
                }
            })
        }

    });
});
