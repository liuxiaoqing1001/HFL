var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;
// console.log("uname:"+uname);

$(function () {
    $.ajax({
        url: sayGetAll,
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

                var content = $('<div style="float: left;clear: both;" class="content" >' +
                    '<img src='+srcUrl+' class="img-circle img"/>' + '</div>' +
                    '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span></p>' +
                    '<span>' + reqData.data[i].time + '</span></div>' +
                    // '<div class="btn-group" style="float: right;margin-right: 110px;" >' +
                    // '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                    // '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                    // '<ul class="dropdown-menu " id="menu">' +
                    // '<li><a href="NewSay.html" >' + "所有" + '</a></li>' +
                    // '<li><a href="#" class="NoLookit">' + "不看他" + '</a></li>' +
                    // '<li role="separator" class="divider"></li>' +
                    // '<li><a href="#">' + "取消" + '</a></li>' +
                    // '</ul>' +
                    // '</div>' +
                    '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 20px">' +
                    '<a href="PlayVideo.html?id='+reqData.data[i].vid+'" target="_blank">'+ reqData.data[i].say+ '</a></div>' +
                    '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+reqData.data[i].praise + '</button>' +
                    '<button class="glyphicon glyphicon-heart-empty collect" style="margin-right: 20px;" >'+reqData.data[i].collect + '</button>'+
                    // '<button class="glyphicon glyphicon-pencil forward" style="margin-right: 50px;" type="button"/>' +
                    '</div><hr/>'
                );
                content.appendTo($("#say"));

                // $(".name").eq(i).attr("id", reqData.data[i].id);
                // console.log($(".name").val());
                // $(".NoLookit").eq(i).attr("id", reqData.data[i].id);
                // $(".menu").eq(i).attr("id", reqData.data[i].id);
                // $(".content").eq(i).attr("id", reqData.data[i].id);

                $(".img").eq(i).attr("id", reqData.data[i].id);
                // var sid = reqData.data[i].id;

                $(".praise").eq(i).attr("id", reqData.data[i].id);
                $(".collect").eq(i).attr("id", reqData.data[i].id);
                $(".praise").eq(i).attr("vid", reqData.data[i].vid);
                $(".collect").eq(i).attr("vid", reqData.data[i].vid);

                // $(".forward").eq(i).attr("id", reqData.data[i].id);



            }

            $(".praise").click(function () {
                var id = $(this).attr("id");
                var vid = $(this).attr("vid");
                $.ajax({
                    url: sayGetPraiseCount + id,
                    type : 'GET',
                    dataType : 'json' ,
                    success: function (reqdata) {
                        // console.log(reqdata);
                        sessionStorage.setItem("praiseCount",reqdata.data);
                        count=reqdata.data+1;
                        if(reqdata.errCode==0){
                            $.ajax({
                                url: sayPraiseCount + vid + "/" + count,
                                type : 'PUT',
                                dataType : 'json' ,
                                success: function (data) {
                                    alert("爱你哦~");
                                    location.reload([true]);
                                }
                            });
                        }
                    }
                });
            });

            $(".collect").click(function () {
                var id = $(this).attr("id");
                var vid = $(this).attr("vid");
                $.ajax({
                    url: sayGetCollectCount + id,
                    type : 'GET',
                    dataType : 'json' ,
                    success: function (reqdata) {
                        // console.log(reqdata);
                        sessionStorage.setItem("praiseCount",reqdata.data);
                        count=reqdata.data+1;
                        if(reqdata.errCode==0){
                            $.ajax({
                                url: sayCollectCount + vid + "/" + count,
                                type : 'PUT',
                                dataType : 'json' ,
                                success: function (data) {
                                    alert("爱你哦~");
                                    location.reload([true]);
                                }
                            });
                        }
                    }
                });
            });

            // $(".forward").click(function () {
            //     //调转到对应的视频
            //     var id = $(this).attr("id");
            //     console.log(id);
            //     // $.ajax({
            //     //     url : sayForward + id ,
            //     //     type : 'GET',
            //     //     dataType : 'json' ,
            //     //     success : function(reqData) {
            //     //         console.log(reqData.data);
            //     //         sessionStorage.setItem("descripiton",JSON.stringify(reqData.data));
            //     //     }
            //     // });
            //     // location.href="AddSay.html"
            // });
            // $(".NoLookit").click(function () {
            //     var id = $(this).attr("id");
            //     NoLookit(id,uname);
            // });
        }
    });

    // function NoLookit(id,uname) {
    //     var ids=new Array();
    //     ids.push(id);
    //     $.ajax({
    //         url : sayOtherSay + ids + "/" + uname,
    //         type:'GET',
    //         contentType : 'application/json;charset=UTF-8',
    //         dataType : 'json' ,
    //         cache: false,
    //         success:function(reqData) {
    //             $("#say").empty();
    //             for (var i = 0 ; i < reqData.data.length ; i++) {
    //                 if(reqData.data[i].photourl == null || reqData.data[i].photourl == '') {
    //                     srcUrl = "../../img/userphoto_default.jpg" ;
    //                 } else {
    //                     srcUrl = reqData.data[i].photourl ;
    //                 }
    //                 var content = $('<div style="float: left;clear: both" id="content" ><img src='+srcUrl+' class="img-circle img" />' + '</div>' +
    //                     '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span>' + '</p>' +
    //                     '<span>' + reqData.data[i].time + '</span>' +
    //                     '</div>' +
    //                     '<div class="btn-group" style="float: right;margin-right: 60px;" >' +
    //                     '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
    //                     '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
    //                     '</button>' +
    //                     '<ul class="dropdown-menu" id="menu">' +
    //                     '<li><a target="contentFrame" href="NewSay.html">'+"所有"+'</a></li>' +
    //                     '<li><a href="#" class="NoLookit">' + "不看他" + '</a></li>' +
    //                     '<li role="separator" class="divider"></li>' +
    //                     '<li><a href="#">' + "取消" + '</a></li>' +
    //                     '</ul>' +
    //                     '</div>' +
    //                     '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 20px">' + reqData.data[i].say + '</div>' +
    //                     '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+reqData.data[i].praise + '</button>'+
    //                     '<button class="glyphicon glyphicon-level-up forward" style="margin-right: 50px;"/>'+
    //                     '</div>'
    //                 );
    //                 content.appendTo($("#say"));
    //                 $(".forward").eq(i).attr("id", reqData.data[i].id);
    //                 $(".praise").eq(i).attr("id", reqData.data[i].id);
    //
    //
    //                 $(".NoLookit").eq(i).attr("id", reqData.data[i].id);
    //                 $(".NoLookit").click(function () {
    //                     var id = $(this).attr("id");
    //                     ids.push(id);
    //                     NoLookit(ids, uname)
    //                 })
    //
    //
    //             }
    //             $(".forward").click(function () {
    //                 var id = $(this).attr("id");
    //                 $.ajax({
    //                     url : sayForward + id ,
    //                     type : 'GET',
    //                     dataType : 'json' ,
    //                     success : function(reqData) {
    //                         console.log(reqData.data);
    //                         sessionStorage.setItem("descripiton",JSON.stringify(reqData.data));
    //                     }
    //
    //                 });
    //                 location.href="AddSay.html";
    //             });
    //             $(".praise").click(function () {
    //                 var id = $(this).attr("id");
    //                 $.ajax({
    //                     url: sayGetPraiseCount + id,
    //                     type : 'GET',
    //                     dataType : 'json' ,
    //                     success: function (reqdata) {
    //                         console.log(reqdata);
    //                         sessionStorage.setItem("praiseCount",reqdata.data);
    //                         count=reqdata.data+1;
    //                         if(reqdata.errCode==0){
    //                             $.ajax({
    //                                 url: sayPraiseCount + id + "/" + count,
    //                                 type : 'PUT',
    //                                 dataType : 'json' ,
    //                                 success: function (data) {
    //                                     alert("爱你哦~");
    //                                 }
    //                             });
    //                         }
    //                     }
    //                 });
    //                 location.reload([true]);
    //             });
    //         }
    //     });
    // }
});
