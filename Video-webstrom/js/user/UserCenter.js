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

    // 个人信息
    $("#userInfo").click(function () {
        // $("#userInfo ").attr("aria-expanded" , true) ;
        // $("#userInfoA").style.color="white";
        $("#contentFrame").attr("src", "UserInfo.html");

    })

    // // 账户信息
    // $("#accountInfo").click(function () {
    //     $("#contentFrame").attr("src", "AccountInfo.html");
    // })

    // 修改信息
    $("#modifyInfo").click(function () {
        $("#contentFrame").attr("src", "ModifyInfo.html");
    })

    // 密码管理
    $("#modifyPassword").click(function () {
        $("#contentFrame").attr("src", "ModifyPassword.html");
    })
})