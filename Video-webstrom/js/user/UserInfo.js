// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;

$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    //用户名称模块传递的内容
    $("#userName").text(userObj.name) ;

    //用户年龄模块传递的内容
    $("#userAge").text(userObj.age) ;

    //用户性别模块传递的内容
    $("#userGender").text(userObj.sex) ;

    //用户邮箱模块传递的内容
    $("#userEmail").text(userObj.email) ;

    //手机号码模块传递的内容
    $("#userPhone").text(userObj.mobile) ;

    //头像模块传递的内容
    if(userObj.photourl == null || userObj.photourl == '') {
        $("#userPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#userPhoto").attr("src",photoSrc);
    }

    $("#userPhoto").click(function () {
       console.log("更换头像");
    });

});