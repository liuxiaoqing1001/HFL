var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;
var p;
var c;

$(function () {

    if(userObj.photourl == null || userObj.photourl == '') {
        srcUrl = "../../img/userphoto_default.jpg" ;
    } else {
        srcUrl = userPhotoPath + uname ;
    }

    $.ajax({
        url : sayMyData + uname ,
        type:'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        cache: false,
        success:function(reqData) {
            for (var i = 0 ; i < reqData.data.length ; i++) {
                var content = $('<div style="float: left;clear: both" id="content" >' +
                    '<img src='+srcUrl+' class="img-circle img"/>' + '</div>' +
                    '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span></p>' +
                    '<span>' + reqData.data[i].time + '</span>' +
                    '</div>' +
                    '<div class="btn-group" style="float: right;margin-right: 20px;" >' +
                    '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                    '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                    '<ul class="dropdown-menu" id="menu">' +
                    // '<li><a href="UpdateSay.html" class="editor">'+"编辑"+'</a></li>' +
                    '<li><a class="delete">' + "删除" + '</a></li>' +
                    // '<li role="separator" class="divider"></li>' +
                    // '<li><a href="#">' + "取消" + '</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 20px" class="say">' +
                    '<a href="PlayVideo.html?id='+reqData.data[i].vid+'" target="_blank">'+ reqData.data[i].say+ '</a></div>' +
                    '<div style="float: right"><span class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+
                    getP(reqData.data[i].vid) + '</span>'+
                    '<span class="glyphicon glyphicon-heart-empty collect" style="margin-right: 20px;" >'+
                    getC(reqData.data[i].vid) + '</span>'+
                    '</div><hr/>'
                );
                content.appendTo($("#mysay"));

                $(".img").eq(i).attr("id", reqData.data[i].id);

                // $(".editor").eq(i).attr("id", reqData.data[i].id);
                $(".delete").eq(i).attr("id", reqData.data[i].id);
                // $(".say").eq(i).attr("id", reqData.data[i].id);

            }
            // //点击修改按钮操作
            // $(".editor").click(function () {
            //     var id =  $(this).attr("id");
            //     location.href="UpdateSay.html";
            //     var id=sessionStorage.setItem("id",id)
            // });
            //
            //点击删除按钮操作
            $(".delete").click(function () {
                var id =  $(this).attr("id");
                deleteById(id);
            })
        }
    });

    //使用ajax根据id删除对应id的用户的信息
    function deleteById(id) {
        $.ajax({
            url : sayDel + id  ,
            type : 'DELETE',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                // console.log(reqData+"删除");
                alert(reqData.msg);
                location.reload([true]);

            }
        })
    }
});

function getP(vid) {
    $.ajax({
        url: praiseNum + vid,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqPData) {
            // console.log(reqPData);
            p=reqPData.data;
        }
    });
    return p;
}

function getC(vid) {
    $.ajax({
        url: collectNum + vid ,
        type: "GET",
        dataType: 'json',
        async:false,
        success: function (reqCData) {
            // console.log(reqCData);
            c=reqCData.data;
        }
    });
    return c;
}