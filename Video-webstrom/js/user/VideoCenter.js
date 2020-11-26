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

    //视频库
    $("#videoLibrary").click(function () {
        $("#contentFrame").attr("src", "VideoLibrary.html");
    })

    //素材库
    $("#materialLibrary").click(function () {
        $("#contentFrame").attr("src", "Material.html");
    })

    //待审核
    $("#collection").click(function () {
        $("#contentFrame").attr("src", "Collection.html");
    })
})