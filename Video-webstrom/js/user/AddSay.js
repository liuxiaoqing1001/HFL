var forwardsay = new Object() ;
var des=sessionStorage.getItem("descripiton");
if (des != null || des != "" || des != undefined) {
    forwardsay = JSON.parse(des);
}
console.log(forwardsay);


var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;

// $("#description").text(des);

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

    $("#description").val(forwardsay.uname+":"+forwardsay.say);


    var description=$("#description").val();
    console.log(description);
    if(description!=null || description != ""|| description!= undefined ){
        $("#publish").click(function () {
            var description=$("#description").val();
            var obj ={
                uname : userObj.name ,
                say : description
            };
            $.ajax({
                url : Path+'/say/publish' ,
                type : 'POST',
                data : obj,
                dataType : 'json' ,
                success : function(reqData) {
                    console.log(reqData) ;
                    // alert(reqData.msg) ;
                    // sessionStorage.setItem("loginuser", JSON.stringify(reqData.data));
                }
            });
            window.history.back();

        })

    }else{
        $("#publish").attr("disabled","true");

    }


});