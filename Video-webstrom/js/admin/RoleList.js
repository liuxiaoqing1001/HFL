$(function () {
    var currentPage = 1;//当前页
    var size = 5;   //每页记录个数
    function f(currentPage) {
        $.get(
            userRolePage + currentPage + "/" + size,
            function (reqData) {
                // console.log(reqData);
                // console.log(reqData.rows.length);
                for (var i = 0; i < reqData.rows.length; i++) {
                    record = i;
                    var line = i + 1;

                    // var role;
                    var role = "管理员" ;
                    // if(reqData.rows[i].role==0){
                    //     role = "管理员" ;
                    // }else if(reqData.rows[i].role==1){
                    //     role = "用户";
                    // }

                    var trtd = $('<tr><td>' + line + '</td>' +
                        '<td >'+reqData.rows[i].name+'</td>' +
                        '<td class="role" id="roleTd">'+role+'</td>' +
                        '<td><button class="btn btn-info btn-sm btnModify">转为普通用户</button>' +
                        '&nbsp;<button class="btn btn-danger btn-sm btnDel">彻底删除</button></td></tr>');
                    trtd.appendTo($("#roleTable"));

                    $(".btnModify").eq(i).attr("id", reqData.rows[i].id);
                    $(".btnDel").eq(i).attr("id", reqData.rows[i].id);

                    $(".role").eq(i).attr("id", reqData.rows[i].id);

                }

                //当前是第几页
                $("#currentPage").text(currentPage);
                //总页数
                $("#totalPage").text(Math.ceil((reqData.total) * 1.0 / size));

                var firstID = size * (currentPage - 1) + 1;
                var lastID = firstID + size - 1;
                $("#firstId").text(firstID);
                if (lastID >= reqData.total) {
                    $("#lastID").text(reqData.total)
                } else {
                    $("#lastID").text(lastID)
                }
                $("#totalID").text(reqData.total);

                //点击修改按钮操作
                $(".btnModify").click(function () {
                    var id = $(this).attr("id");
                    $.ajax({
                        url : userRole + id,
                        type:'PUT',
                        contentType : 'application/json;charset=UTF-8',
                        dataType : 'json' ,
                        success:function(reqData) {
                            if(reqData.errCode == 0) {
                                alert(reqData.msg);
                                location.href = "RoleList.html" ;
                            }
                        }
                    });
                });

                //点击删除按钮操作
                $(".btnDel").click(function () {
                    var id = $(this).attr("id");
                    deleteById(id);
                    // $("#roleTable").text("");
                    // location.reload([true]);
                });
            });
    }
    f(currentPage);

    $("#right").click(function () {
        currentPage++;
        if (currentPage <= $("#totalPage").text()) {
            $("#roleTable").text("");
            f(currentPage)
        } else {
            alert("当前是最后一页");
            currentPage = $("#totalPage").text()
        }
    });


    //上一页
    $("#left").click(function () {
        currentPage--;
        if (currentPage > 0) {
            $("#roleTable").text("");
            f(currentPage)
        } else {
            alert("当前是第一页");
            currentPage = 1
        }
    });
    //第一页
    $("#backwardFirst").click(function () {
        currentPage = 1;
        if (currentPage > 0) {
            $("#roleTable").text("");
            f(currentPage)
        }
    });
    //最后一页
    $("#forwardLast").click(function () {
        currentPage = $("#totalPage").text();
        console.log($("#totalPage").text());
        if (currentPage <= $("#totalPage").text()) {
            $("#roleTable").text("");
            f(currentPage)
        }
    });

    function deleteById(id){
        $.ajax({
            url : userDelPole + id ,
            type:'DELETE',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success:function(reqData) {
                // console.log(reqData) ;
                alert(reqData.msg);
                location.href = "RoleList.html" ;
            }

        });
    }

});


