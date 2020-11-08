$(function () {
    //点击更改按钮
    $("#btnModify").click(function () {
        //获取输入的旧密码的值
        var oldPwd = $("#oldPwd").val()

        //获取新密码的值
        var newPwd = $("#newPwd").val()

        //与数据库中的密码比较
        if (oldPwd != "数据库中密码") {
            alert("输入的旧密码错误")
        } else if (newPwd.length < 6 || newPwd.length > 12) {
            alert("新密码长度有误，要求6-12位")
        }

        //校验复选框是否选中
        var isChecked = $("#checkbox").is(':checked')
        console.log(isChecked)
        if (isChecked == false) {
            alert("请勾选同意协议的复选框")
        }

        //信息成功后的操作
    })
    //点击取消按钮
    $("#btnReset").click(function () {
        $("#oldPwd").val('')
        $("#newPwd").val('')
        $("#checkbox").prop('checked', false)
    })
})