var videoId = new Object() ;
//得到id字段
var str = sessionStorage.getItem("id") ;
if (str != null || str != "" || str != undefined) {
    Id = JSON.parse(str);
}

$(function () {
    var userInfo = new Object() ;
    var sttr = sessionStorage.getItem("userInfo") ;
    if (sttr != null || sttr != "" || sttr != undefined) {
        userInfo = JSON.parse(sttr);
    }
    console.log(userInfo)

    $("#UserName").val(userInfo.name);
    $("#UserName").attr("disabled" , "disabled");


    $("#queryStatusBtn").click(function () {
        var role = $("#role").val();
        $.ajax({
            url : userRole+role+"/"+Id,
            type:'PUT',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success:function(reqData) {
                if(reqData.errCode == 0) {
                    alert(reqData.msg)

                }
            }
        });
        // location.href="ModifyStatus.html"
        window.history.go(-1);

    });

    $("#NqueryStatusBtn").click(function () {
        window.history.go(-1);
    });
});



