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

    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showUserPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#showUserPhoto").attr("src",photoSrc);
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
                    $("#carousel").empty();
                    for (var i = 0 ; i < reqData.data.length ; i++) {
                        var content = $('<div style="float: left;both:clear;margin-right: 23px"><div >' +
                            '<video controls="controls" src="#" />' + '</div>' +
                            '<div ><span class="name">' +"用户:"+ reqData.data[i].uname + '</span>' + '</p>' +
                            '<span>'  +"标题:"+ reqData.data[i].title + '</span>' +
                            '</div></div>'
                        );
                        content.appendTo($("#carousel"));

                        // $(".img").eq(i).attr("id", reqData.data[i].id);
                        // $(".editor").eq(i).attr("id", reqData.data[i].id);
                        // $(".delete").eq(i).attr("id", reqData.data[i].id);
                        // $(".say").eq(i).attr("id", reqData.data[i].id);

                        // if (reqData.data[i].photourl != null) {
                        //     $(".img").attr("src", reqData.data[i].photourl);
                        // }
                    }
                }
            })
        }

    });
});