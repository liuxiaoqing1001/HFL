$(function () {
    var currentPage = 1;//当前页
    var size = 5;   //每页记录个数
    function f(currentPage) {
        $.get(
            videoTypePage + currentPage + "/" + size,
            function (reqData) {
                for (var i = 0; i < reqData.rows.length; i++) {
                    record = i;
                    var line = i + 1;
                    var trtd = $('<tr><td>' + line + '</td>' +
                        // '<td>'+videoObj[i].typeid+'</td>' +
                        '<td>' + reqData.rows[i].typename + '</td>' +
                        '<td><button class="btn btn-info btn-sm btnModify">修改</button>' +
                        // '&nbsp;<button class="btn btn-danger btn-sm btnInsert">增加</button></td></tr>');
                        '&nbsp;<button class="btn btn-danger btn-sm btnDel">删除</button></td></tr>');
                    trtd.appendTo($("#typetable"));

                    // 给每一行的修改、删除按钮动态添加id属性并给值
                    $(".btnModify").eq(i).attr("id", reqData.rows[i].id);
                    $(".btnDel").eq(i).attr("id", reqData.rows[i].id);

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
                    location.href = "ModifyName.html";
                    var str = sessionStorage.setItem("Nameid", id);
                });

                //点击删除按钮操作
                $(".btnDel").click(function () {
                    var id = $(this).attr("id");
                    alert(id)
                    deleteById(id);
                    $("#typetable").text("");
                    location.reload([true]);


                });
                // $(".btnInsert").click(function () {
                //     location.href="AddType.html"
                //
                //
                // });
            });
        }
    f(currentPage);

    $("#right").click(function () {
        currentPage++;
        if (currentPage <= $("#totalPage").text()) {
            $("#typetable").text("");
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
            $("#typetable").text("");
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
            $("#typetable").text("");
            f(currentPage)
        }
    });
    //最后一页
    $("#forwardLast").click(function () {
        currentPage = $("#totalPage").text();
        console.log($("#totalPage").text());
        if (currentPage <= $("#totalPage").text()) {
            $("#typetable").text("");
            f(currentPage)
        }
    });


    function deleteById(id){
        $.ajax({
            url : videoTypeDel + id ,
            type:'DELETE',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success:function(reqData) {
                console.log(reqData) ;
            }

        });
    }

});


