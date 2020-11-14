$(function () {
    $("#btnLogin").click(function(){
        prePath = userPath + $('#LoginForm input[name="loginName"]').val() + '/' +  $('#LoginForm input[name="loginPass"]').val();
        console.log(prePath);
        $.get(
            prePath ,
            function(reqData) {
                alert(reqData.msg) ;
                if(reqData.errCode == 0) {
                    sessionStorage.setItem("loginuser" , JSON.stringify(reqData.data)) ;
                    // 从sessionStorage取出登录者信息
                    var userObj = new Object() ;
                    var str = sessionStorage.getItem("loginuser") ;
                    if (str != null || str != "" || str != undefined) {
                        userObj = JSON.parse(str);
                    }
                    if(userObj.role==1){
                        location.href = "user/First.html" ;
                    }else{
                        location.href = "admin/Index.html" ;
                    }
                } else {
                    $('#LoginForm input[name="loginName"]').focus();
                }
            }
        );
    }) ;
})