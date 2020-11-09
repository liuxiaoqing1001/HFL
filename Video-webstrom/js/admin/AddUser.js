$(function () {
    $("#okBtn").click(function () {
        //将数据存入数据库


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