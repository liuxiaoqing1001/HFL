$(function () {
    $("#okBtn").click(function () {
        //将数据存入数据库
        var userName = $("#userName").val();
        var email = $("#Email").val();
        var passsword = $("#password").val();
        var role = $("#role").val();
        var status = $("#status").val();
        alert("提交成功!") ;

    })

    $("#resetBtn").click(function () {
        $("#userName").val("") ;
        $("#Email").val("") ;
        $("#password").val("") ;
        $("#role").val("") ;
        $("#status").val("已认证") ;
    })
})