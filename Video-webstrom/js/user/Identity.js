// 从sessionStorage取出信息
var forgetObj = new Object() ;
var str = sessionStorage.getItem("forget") ;
if (str != null || str != "" || str != undefined) {
    forgetObj = JSON.parse(str);
}
console.log(forgetObj);

$(function () {
    $("#btnNext").click(function () {
        var mobile=$("#mobile").val();
        var email=$("#email").val();


        if(mobile==null || mobile==""){
            alert("手机号码不能为空")
        }
        if(email==null || email==""){
            alert("邮箱不能为空")
        }

        if(mobile==forgetObj.mobile&&email==forgetObj.email){
            location.href="ResetPassword.html"
        }else{
            alert("信息错误")
        }
    })




});

