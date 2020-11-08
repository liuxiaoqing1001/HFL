$(function () {
    // 日期
    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showDt").innerHTML = initDate(now) ;
    },1000)

    // 个人信息
    $("#userInfo").click(function () {
        // $("#userInfo ").attr("aria-expanded" , true) ;
        $("#contentFrame").attr("src", "UserInfo.html");
    })

    // 账户信息
    $("#accountInfo").click(function () {
        $("#contentFrame").attr("src", "AccountInfo.html");
    })

    // 修改信息
    $("#modifyInfo").click(function () {
        $("#contentFrame").attr("src", "ModifyInfo.html");
    })

    // 密码管理
    $("#modifyPassword").click(function () {
        $("#contentFrame").attr("src", "ModifyPassword.html");
    })
})