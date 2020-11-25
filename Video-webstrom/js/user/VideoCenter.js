$(function () {
    // 日期
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000)

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