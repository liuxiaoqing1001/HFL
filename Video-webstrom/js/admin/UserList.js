$(function() {

    //点击新增按钮跳转页面
    $("#btnAdd").click(function () {
        location.href = "AddUser.html" ;
    });

    //使用ajax调用分页的url来计算
    var currentPage = 1; //当前是第几页
    // var size = 2   //每页几条记录
    //当前页有几条记录
    var record = 0 ;
    //使用ajax调用分页的url来计算
    function f(currentPage , size) {
        $.ajax({
            url : userPage + size + "/" +currentPage ,
            type : 'GET',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData) {
                console.log(reqData);
                console.log(reqData.rows);
                for (var i = 0 ; i < reqData.rows.length ; i++) {
                    record = i ;
                    console.log(reqData.rows[i].name);
                    var line = i + 1 ;
                    console.log(line);
                    var trtd = $('<tr><td>'+line+'</td>' +
                        '<td>'+reqData.rows[i].name+'</td>' +
                        '<td>'+reqData.rows[i].age+'</td>' +
                        '<td>'+reqData.rows[i].sex+'</td>' +
                        '<td>'+reqData.rows[i].email+'</td>' +
                        '<td>'+reqData.rows[i].mobile+'</td>' +
                        '<td>'+reqData.rows[i].address+'</td>' +
                        '<td>'+reqData.rows[i].role+'</td>' +
                        '<td>'+reqData.rows[i].regdate+'</td>' +
                        '<td>'+reqData.rows[i].status+'</td>' +
                        '<td><button class="btn btn-info btn-sm btnModify">修改</button>' +
                        '&nbsp;<button class="btn btn-danger btn-sm btnDel">删除</button></td></tr>');
                    trtd.appendTo($("#userTable"));

                    //给每一行的修改、删除按钮动态添加id属性并给值
                    $(".btnModify").eq(i).attr("id" , reqData.rows[i].id);
                    $(".btnDel").eq(i).attr("id" , reqData.rows[i].id);

                }
                //当前是第几页
                $("#currentPage").text(reqData.curPage);
                //总过有几页
                $("#totalPage").text(reqData.pageCount);

                var firstID = size * (reqData.curPage - 1) + 1;
                var lastID= firstID+ size - 1;
                $("#firstId").text(firstID);
                if (lastID >= reqData.total) {
                    $("#lastID").text(reqData.total);
                } else {
                    $("#lastID").text(lastID);
                }
                $("#totalID").text(reqData.total);

                //点击修改按钮操作
                $(".btnModify").click(function () {
                    var id =  $(this).attr("id");
                    getById(id);
                });

                //点击删除按钮操作
                $(".btnDel").click(function () {
                    var id =  $(this).attr("id");
                    deleteById(id);
                    $("#tb").text("");
                    console.log(reqData.curPage);
                    if (record == 1) {
                        f(reqData.curPage);
                    } else if (record == 0){
                        f(reqData.curPage - 1);
                    }
                })

            }
        })
    }

    //初始化
    f(currentPage , $("#size").val());
    $("#size").change(function () {
        $("#tb").text("");
        f(currentPage , $("#size").val());
    })
    //下一页
    $("#right").click(function () {
        currentPage++;
        if (currentPage <= $("#totalPage").text()) {
            $("#tb").text("");
            f(currentPage , $("#size").val());
        } else {
            alert("当前是最后一页");
            currentPage = $("#totalPage").text();
        }
    })

    //最后一页
    $("#forwardLast").click(function () {
        currentPage = $("#totalPage").text();
        console.log($("#totalPage").text());
        if (currentPage <= $("#totalPage").text()) {
            $("#tb").text("");
            f(currentPage , $("#size").val());
        }
    });

    //上一页
    $("#left").click(function () {
        currentPage--;
        if (currentPage > 0) {
            $("#tb").text("");
            f(currentPage , $("#size").val())
        } else {
            alert("当前是第一页");
            currentPage = 1
        }
    });
    //第一页
    $("#backwardFirst").click(function () {
        currentPage = 1;
        if (currentPage > 0) {
            $("#tb").text("");
            f(currentPage , $("#size").val());
        }
    });


    //使用ajax根据id获取对应id的用户的信息
    function getById(id) {
        $.ajax({
            url : userPath + id  ,
            type : 'GET',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                sessionStorage.setItem("modifyBtn" , JSON.stringify(reqData));
                location.href = "ModifyUser.html";
            }
        })
    }

    //使用ajax根据id删除对应id的用户的信息
    function deleteById(id) {
        $.ajax({
            url : userDel + id  ,
            type : 'DELETE',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                alert(reqData.msg);
            }
        })
    }


});