$(function () {
    //传入被选中用户的名称
    var userObj = new Object() ;
    var str = sessionStorage.getItem("modifyBtn") ;
    // console.log(str)
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    //传入被选中用户的名称
    $("#clickName").val(userObj.name);
    // 设置该项为禁用
    $("#clickName").attr("disabled" , "disabled");

    //传入被选中用户的注册时间
    $("#regDate").val(userObj.regdate);
    // 设置该项为禁用
    $("#regDate").attr("disabled" , "disabled");

    //点击上传按钮之后
    $("#btnUpLoad").click(function () {
        // //获取输入的年龄内容
        // var userAge = $("#userAge").val() ;
        // console.log(userAge)
        // //校验年龄
        // if ('' == userAge) {
        //     alert("年龄不能为空")
        // } else if (userAge < 0 || userAge > 100) {
        //     alert("输入的年龄不符合实际")
        // } else {
        //     $("#userAge").val(userAge)
        // }
        //
        // //获得输入的邮箱内容
        // var userEmail =  $("#userEmail").val() ;
        // console.log(userEmail)
        // //校验邮箱
        // if ('' == userEmail) {
        //     alert("邮箱不能为空")
        // } else if (userEmail.indexOf('@') == -1 || userEmail.indexOf('.') == -1) {
        //     alert("邮箱格式不对，要包含@和.")
        // } else {
        //     $("#userEmail").val(userEmail)
        // }
        //
        // //获得输入的手机号码内容
        // var userPhone = $("#userPhone").val() ;
        // console.log(userPhone)
        // //校验手机号码
        // if ('' == userPhone) {
        //     alert("手机号码不能为空")
        // } else if (userPhone.length != 11) {
        //     alert("手机号码长度错误")
        // } else {
        //     $("#userPhone").val(userPhone)
        // }
        //
        // //获得输入的家庭住址内容
        // var userAddress = $("#userAddress").val() ;
        // console.log(userAddress)
        // //校验家庭住址
        // if ('' == userAddress) {
        //     alert("家庭住址不能为空")
        // } else {
        //     $("#userAddress").val(userAddress)
        // }

        //校验角色信息
        var userRole = $("#role").val() ;
        if ('' == userRole) {
            alert("角色不能为空")
        } else {
            $("#role").val(userRole)
        }

        //状态信息
        var userStatus = $("#status").val() ;

        //新数据存入数据库
        var user = {
            id : userObj.id ,
            role : userRole ,
            status : userStatus
        } ;
        console.log(user);
        $.ajax({
            url : userUpdate  ,
            type : 'PUT',
            data : user ,
            dataType : 'json' ,
            success : function(reqData){
                alert(reqData.msg);
                location.href = "UserList.html" ;
            }
        });
        // alert("更新成功！")

    })
});