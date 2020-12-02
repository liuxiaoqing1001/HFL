$(function () {
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    if(userObj.photourl!=null){
        $("#img").attr("src",userObj.photourl);
    }
    $("#uname").text(userObj.name);

    $("#goback").click(function () {
        window.history.go(-1)

    });

    $("#publish").click(function () {
        var id=sessionStorage.getItem("id");
        var say=$("#description").val();
        //使用ajax根据id获取对应id的用户的信息
        $.ajax({
            url : Path +"say/Update/"+say+"/"+ id  ,
            type : 'PUT',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
            }
        });
        window.history.back()

    })






});