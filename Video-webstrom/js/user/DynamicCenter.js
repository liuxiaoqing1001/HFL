$(function () {
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    // if(userObj.photourl!=null){
    //     $("#img").attr("src",userObj.photourl);
    // }

    if (null != userObj) {
        $(".showLoginUser").text(userObj.name);
        // $(".caret").text(userObj.name);
    } else {
        $(".showLoginUser").text('未登录');
    }

});