$(function () {
    //传入登录者的名字
    $("#userName").val('aaa')
    // 设置该项为禁用
    $("#userName").attr("disabled" , "disabled")

    //点击上传按钮之后
    $("#btnUpLoad").click(function () {
        //获取输入的年龄内容
        var userAge = $("#userAge").val() ;
        console.log(userAge)
        //校验年龄
        if ('' == userAge) {
            alert("年龄不能为空")
        } else if (userAge < 0 || userAge > 100) {
            alert("输入的年龄不符合实际")
        } else {
            $("#userAge").val(userAge)
        }

        //获得输入的邮箱内容
        var userEmail =  $("#userEmail").val() ;
        console.log(userEmail)
        //校验邮箱
        if ('' == userEmail) {
            alert("邮箱不能为空")
        } else if (userEmail.indexOf('@') == -1 || userEmail.indexOf('.') == -1) {
            alert("邮箱格式不对，要包含@和.")
        } else {
            $("#userEmail").val(userEmail)
        }

        //获得输入的手机号码内容
        var userPhone = $("#userPhone").val() ;
        console.log(userPhone)
        //校验手机号码
        if ('' == userPhone) {
            alert("手机号码不能为空")
        } else if (userPhone.length != 11) {
            alert("手机号码长度错误")
        } else {
            $("#userPhone").val(userPhone)
        }

        //获得输入的家庭住址内容
        var userAddress = $("#userAddress").val() ;
        console.log(userAddress)
        //校验家庭住址
        if ('' == userAddress) {
            alert("家庭住址不能为空")
        } else {
            $("#userAddress").val(userAddress)
        }

        //校验复选框是否选中
        var isChecked = $("#checkbox").is(':checked')
        console.log(isChecked)
        if (isChecked == false) {
            alert("请勾选同意协议的复选框")
        }
    })

    //点击取消按钮之后
    $("#btnReset").click(function () {
        $("#userAge").val('')
        $("#userEmail").val('')
        $("#userPhone").val('')
        $("#userAddress").val('')
        $("#checkbox").prop('checked', false)
    })
})