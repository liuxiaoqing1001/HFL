$(function () {
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    // if(userObj.photourl!=null){
    //     $("#img").attr("src",userObj.photourl);
    // }

    if (null != userObj) {
        $(".showLoginUser").text(userObj.name);
        // $(".caret").text(userObj.name);
    } else {
        $(".showLoginUser").text('未登录');
    }

    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showUserPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#showUserPhoto").attr("src",photoSrc);
    }

    $("#mySay").removeAttr("style");
    $("#newSay").attr("style" , "color:white");


    $("#mySay").click(function () {
        $("#newSay").removeAttr("style");
        $(this).attr("style" , "color:white");
    });

    $("#newSay").click(function () {
        $("#mySay").removeAttr("style");
        $(this).attr("style" , "color:white");
    });

    $("#Search").click(function () {
        var content=$('#searchByKeyWord input[name="content"]').val();
        console.log(content);
        if(content==""){
            alert("要想搜索，搜索框不能为空");
        }else {
            $.ajax({
                url : videoByKeyWord + content ,
                type : 'GET',
                dataType : 'json' ,
                success : function(reqData){
                    console.log(reqData) ;
                    $("#carousel").empty();
                    for (var i = 0 ; i < reqData.data.length ; i++) {
                        var content = $('<div style="float: left;both:clear;margin-right: 23px"><div >' +
                            '<video controls="controls" src="'+videoPlayPath + reqData.data[i].id+'" />' + '</div>' +
                            '<div ><span class="name">' +"用户:"+ reqData.data[i].uname + '</span>' + '</p>' +
                            '<span>'  +"标题:"+ reqData.data[i].title + '</span>' +
                            '</div></div>'
                        );
                        content.appendTo($("#carousel"));

                        // $(".img").eq(i).attr("id", reqData.data[i].id);
                        // $(".editor").eq(i).attr("id", reqData.data[i].id);
                        // $(".delete").eq(i).attr("id", reqData.data[i].id);
                        // $(".say").eq(i).attr("id", reqData.data[i].id);

                        // if (reqData.data[i].photourl != null) {
                        //     $(".img").attr("src", reqData.data[i].photourl);
                        // }
                    }
                }
            })
        }

    });

});