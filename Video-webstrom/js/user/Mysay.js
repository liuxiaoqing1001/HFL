var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
if (str != null || str != "" || str != undefined) {
    userObj = JSON.parse(str);
}
var uname=userObj.name;
$(function () {
    $.ajax({
        url : Path+"say/Mydata/"+uname+"/"+uname,
        type:'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        cache: false,
        success:function(reqData) {
            for (var i = 0 ; i < reqData.data.length ; i++) {
                var content = $('<div style="float: left;clear: both" id="content" ><img src="../../img/yyqx1.jpg" class="img-circle img" width="50" height="50" class="img"/>' + '</div>' +
                    '<div style="float: left"><span class="name">' + reqData.data[i].uname + '</span>' + '</p>' +
                    '<span>' + reqData.data[i].time + '</span>' +
                    '</div>' +
                    '<div class="btn-group" style="float: right;margin-right: 110px;" >' +
                    '<button type="button" class="btn btn-default" data-toggle="dropdown" style="margin-top: 10px">' + "..." + '</button>' +
                    '<span class="sr-only">' + "Toggle Dropdown" + '</span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" id="menu">' +
                    '<li><a href="UpdateSay.html" class="editor">'+"编辑"+'</a></li>' +
                    '<li><a href="#" class="delete">' + "删除" + '</a></li>' +
                    '<li role="separator" class="divider"></li>' +
                    '<li><a href="#">' + "取消" + '</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div style="clear: both;padding-top: 10px;padding-bottom: 10px;margin-right: 20px" class="say">' + reqData.data[i].say + '</div>' +
                    '<div style="float: right"><button class="glyphicon glyphicon-thumbs-up praise" style="margin-right: 20px">'+reqData.data[i].praise + '</button>'+
                    '<button class="glyphicon glyphicon-level-up forward" style="margin-right: 50px;"/>'+
                    '</div>'
                );
                content.appendTo($("#mysay"));
                $(".forward").eq(i).attr("id", reqData.data[i].id);
                $(".praise").eq(i).attr("id", reqData.data[i].id);



                $(".img").eq(i).attr("id", reqData.data[i].id);
                $(".editor").eq(i).attr("id", reqData.data[i].id);
                $(".delete").eq(i).attr("id", reqData.data[i].id);
                $(".say").eq(i).attr("id", reqData.data[i].id);


                if (reqData.data[i].photourl != null) {
                    $(".img").attr("src", reqData.data[i].photourl);
                }
            }
            //点击修改按钮操作
            $(".editor").click(function () {
                var id =  $(this).attr("id");
                location.href="UpdateSay.html";
                var id=sessionStorage.setItem("id",id)
            });

            //点击删除按钮操作
            $(".delete").click(function () {
                var id =  $(this).attr("id");
                deleteById(id);
                location.reload([true]);

            })

            $(".forward").click(function () {
                var id = $(this).attr("id");
                $.ajax({
                    url : Path+'/say/forward/'+id ,
                    type : 'GET',
                    dataType : 'json' ,
                    success : function(reqData) {
                        console.log(reqData.data);
                        sessionStorage.setItem("descripiton",JSON.stringify(reqData.data));
                    }

                });


                location.href="AddSay.html"



            });
            $(".praise").click(function () {
                var id = $(this).attr("id");
                $.ajax({
                    url: Path+"say/getPraiseCount/"+id,
                    type : 'GET',
                    dataType : 'json' ,
                    success: function (reqdata) {
                        console.log(reqdata);
                        sessionStorage.setItem("praiseCount",reqdata.data);
                        count=reqdata.data+1;

                        if(reqdata.errCode==0){
                            $.ajax({
                                url: Path+"say/praiseCount/"+id+"/"+count,
                                type : 'PUT',
                                dataType : 'json' ,
                                success: function (data) {
                                    alert("爱你哦~");

                                }
                            });

                        }

                    }
                });


                location.reload([true]);



            });



        }

    });



    //使用ajax根据id删除对应id的用户的信息
    function deleteById(id) {
        $.ajax({
            url : Path + "say/delete/" + id  ,
            type : 'DELETE',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData+"删除")

            }
        })
    }












});