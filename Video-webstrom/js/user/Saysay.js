var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;


$(function () {
    $.ajax({
        url: Path + "say/getSay/" + uname,
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function (reqData) {
            console.log(reqData.data);
            for (var i = 0; i < reqData.data.length; i++) {

                if(reqData.data[i].photourl == null || reqData.data[i].photourl == '') {
                    srcUrl = "../../img/userphoto_default.jpg" ;
                } else {
                    srcUrl = reqData.data[i].photourl ;
                }

                var content = $('<div style="float: left;clear: both" class="content" ><img src='+srcUrl+' class="img-circle img"/>' + '</div>' +
                    '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span>' + '</p>' +
                    '<span>' + reqData.data[i].time + '</span>' +
                    '</div>' +
                    '<div class="btn-group" style="float: right;margin-right: 110px;" >' +
                    '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                    '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu " id="menu">' +
                    '<li><a href="say.html" >' + "所有" + '</a></li>' +
                    '<li><a href="#" class="NoLookit">' + "不看他" + '</a></li>' +
                    '<li role="separator" class="divider"></li>' +
                    '<li><a href="#">' + "取消" + '</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 10px">' + reqData.data[i].say + '</div>' +
                    '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up" style="margin-right: 20px">' + '</button>' +
                    '<button class="glyphicon glyphicon-comment" style="margin-right: 20px"/>' +
                    '<button class="glyphicon glyphicon-level-up" style="margin-right: 10px;"/>' +
                    '</div>'
                );
                content.appendTo($("#say"));

                $(".name").eq(i).attr("id", reqData.data[i].id);
                $(".NoLookit").eq(i).attr("id", reqData.data[i].id);
                $(".menu").eq(i).attr("id", reqData.data[i].id);
                $(".content").eq(i).attr("id", reqData.data[i].id);

                $(".img").eq(i).attr("id", reqData.data[i].id);
                var sid = reqData.data[i].id;

            }


            $(".NoLookit").click(function () {
                var id = $(this).attr("id");
                NoLookit(id,uname);


            });

        }
    });

    function NoLookit(id,uname) {
        $.ajax({
            url : Path+"say/getSay/"+id+"/"+uname,
            type:'GET',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            cache: false,
            success:function(reqData) {
                $("#say").empty();
                for (var i = 0 ; i < reqData.data.length ; i++) {
                    if(reqData.data[i].photourl == null || reqData.data[i].photourl == '') {
                        srcUrl = "../../img/userphoto_default.jpg" ;
                    } else {
                        srcUrl = reqData.data[i].photourl ;
                    }
                    var content = $('<div style="float: left;clear: both" id="content" ><img src='+srcUrl+' class="img-circle img" />' + '</div>' +
                        '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span>' + '</p>' +
                        '<span>' + reqData.data[i].time + '</span>' +
                        '</div>' +
                        '<div class="btn-group" style="float: right;margin-right: 60px;" >' +
                        '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                        '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                        '</button>' +
                        '<ul class="dropdown-menu" id="menu">' +
                        '<li><a target="contentFrame" href="say.html">'+"所有"+'</a></li>' +
                        '<li><a href="#" class="NoLookit">' + "不看他" + '</a></li>' +
                        '<li role="separator" class="divider"></li>' +
                        '<li><a href="#">' + "取消" + '</a></li>' +
                        '</ul>' +
                        '</div>' +
                        '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 10px">' + reqData.data[i].say + '</div>' +
                        '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up" style="margin-right: 20px">'+"()"+'</button>'+
                        '<button class="glyphicon glyphicon-comment" style="margin-right: 20px"/>'+
                        '<button class="glyphicon glyphicon-level-up" style="margin-right: 10px;"/>'+
                        '</div>'
                    );
                    content.appendTo($("#say"));

                    $(".NoLookit").eq(i).attr("id", reqData.data[i].id);
                    $(".NoLookit").click(function () {
                        var id = $(this).attr("id");
                        NoLookit(id, uname)
                    })


                }


            }

        });


    }





});
