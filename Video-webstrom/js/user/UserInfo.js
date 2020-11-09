// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    $("#userName").val(userObj.name)
    $("#userAge").val(userObj.age);
    $("#userGender").val(userObj.gender);
    $("#userEmail").val(userObj.email);
    $("#userPhone").val(userObj.phone);

    $('#modifyForm input[name="id"]').val(userObj.id);
    if(userObj.photourl != null && userObj.photourl != '') {
        $("#userPhoto").attr("src" ,userObj.photourl) ;
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
    $("#userPhone").text(userObj.phone) ;

    // //家庭地址模块传递的内容
    // $("#userAddress").text(userObj.) ;

    //头像模块传递的内容
    // $("#userPhoto").text(userObj.photourl) ;
    $("#userPhoto").attr("src",userObj.photourl) ;

})

// $(function () {
//     //用户名称模块传递的内容
//     $("#userName").text('admin') ;
//
//     //用户年龄模块传递的内容
//     $("#userAge").text(23) ;
//
//     //用户性别模块传递的内容
//     $("#userGender").text('男') ;
//
//     //用户邮箱模块传递的内容
//     $("#userEmail").text('admin@163.com') ;
//
//     //手机号码模块传递的内容
//     $("#userPhone").text('13566669999') ;
//
//     //家庭地址模块传递的内容
//     $("#userAddress").text('天津市西青区') ;
//
//     //头像模块传递的内容
// })