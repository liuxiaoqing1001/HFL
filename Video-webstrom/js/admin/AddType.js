//进行添加
$(function () {
    $("#AddName").click(function () {
        var typeName = $('#ModifyNameForm input[name="AddTypeName"]').val();

        $.ajax({
            url : videoTypeNC+typeName,
            type : 'GET',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                alert(reqData.msg);


                if(reqData.errCode==0){
                    $.ajax({
                        url :  videoTypeAdd+typeName,
                        type : 'POST',
                        contentType : 'application/json;charset=UTF-8',
                        dataType : 'json' ,
                        success : function(reqData){
                            if(reqData.errCode == 0) {
                                alert(reqData.msg);
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





