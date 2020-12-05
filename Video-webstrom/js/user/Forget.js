$(function () {
    $("#btnConfrim").click(function () {
        var uname =  $("#name").val();
        console.log(uname);

        if(uname==null || uname==""){
            alert("账号不能为空")
        }
        $.ajax({
            url:userByName + uname,
            type :"GET",
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                sessionStorage.setItem("forget" , JSON.stringify(reqData.data)) ;

                if(reqData.errCode == 0) {
                    location.href="Identity.html"
                }
            }
        })
    })
});

