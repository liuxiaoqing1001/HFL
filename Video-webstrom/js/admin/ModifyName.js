var NameId = new Object() ;
//得到id字段
var str = sessionStorage.getItem("Nameid") ;
if (str != null || str != "" || str != undefined) {
    NameId = JSON.parse(str);
}

//进行修改
$(function () {
    $("#ModifyName").click(function () {
        var typeName = $('#ModifyNameForm input[name="TypeName"]').val();

        $.ajax({
            url : videoTypeNC + typeName,
            type : 'GET',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData) {
                // console.log(reqData);
                // alert(reqData.msg);
                if(reqData.errCode==0){
                    $.ajax({
                        url :  videoTypeTN + typeName + "/" + NameId,
                        type : 'PUT',
                        contentType : 'application/json;charset=UTF-8',
                        dataType : 'json' ,
                        success : function(reqData){
                            if(reqData.errCode == 0) {
                                alert(reqData.msg);
                                location.href = "TypeList.html" ;
                            }
                        }

                    })

                }
            }

            })

    });

    $("#goback").click(function () {
        window.history.go(-1);
    });

});





