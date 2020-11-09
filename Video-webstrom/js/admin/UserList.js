$(function () {

    //点击新增按钮跳转页面
    $("#btnAdd").click(function () {
        location.href = "AddUser.html" ;

    })

    //点击修改按钮跳转页面
    $("#btnModify").click(function () {
        location.href = "ModifyUser.html" ;
    })

    //遍历数据库将信息存入表格中


    //使用ajax调用分页的url来计算
    $.ajax({
        url : serverPath + "page/2" ,
        type : 'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        success : function(reqData) {
            console.log(reqData)
            console.log(reqData.rows)
            for (var i = 0 ; i < reqData.rows.length ; i++) {
                console.log(reqData.rows[i].name)
                var line = i + 1 ;
                console.log(line)
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
                    '<td><button class="btn btn-info btn-sm" id="btnModify">修改</button>' +
                    '&nbsp;<button class="btn btn-danger btn-sm" id="btnDelete">删除</button></td></tr>');
                trtd.appendTo($("#userTable"));
            }
            $("#currentPage").text(reqData.curPage)
            $("#totalPage").text(reqData.pageCount)
        }
    })

    //使用ajax方式获取数据库内容
    // $.ajax({
    //     url : serverPath + "getAll" ,
    //     type : 'GET',
    //     contentType : 'application/json;charset=UTF-8',
    //     dataType : 'json' ,
    //     success : function(reqData){
    //         console.log(reqData)
    //         for (var i = 0 ; i < reqData.length ; i++) {
    //             console.log(reqData[i].name)
    //             var line = i + 1 ;
    //             var trtd = $('<tr><td>'+line+'</td>' +
    //                 '<td>'+reqData[i].name+'</td>' +
    //                 '<td>'+reqData[i].age+'</td>' +
    //                 '<td>'+reqData[i].sex+'</td>' +
    //                 '<td>'+reqData[i].email+'</td>' +
    //                 '<td>'+reqData[i].mobile+'</td>' +
    //                 '<td>'+reqData[i].address+'</td>' +
    //                 '<td>'+reqData[i].role+'</td>' +
    //                 '<td>'+reqData[i].regdate+'</td>' +
    //                 '<td>'+reqData[i].status+'</td>' +
    //                 '<td><button class="btn btn-info btn-sm" id="btnModify">修改</button>' +
    //                 '&nbsp;<button class="btn btn-danger btn-sm" id="btnDelete">删除</button></td></tr>');
    //             trtd.appendTo($("#userTable"));
    //         }
    //     }
    // })
    // $.ajax({
    //     url : serverPath + "getAll" ,
    //     type : 'GET',
    //     contentType : 'application/json;charset=UTF-8',
    //     dataType : 'json' ,
    //     success : function(user) {
    //         //user为json数据
    //         //通过$.each遍历json数据
    //         $.each(user,function(key,obj){
    //             var line = key + 1 ;
    //                 var trtd = $('<tr><td>'+line+'</td>' +
    //                     '<td>'+obj.name+'</td>' +
    //                     '<td>'+obj.age+'</td>' +
    //                     '<td>'+obj.sex+'</td>' +
    //                     '<td>'+obj.email+'</td>' +
    //                     '<td>'+obj.mobile+'</td>' +
    //                     '<td>'+obj.address+'</td>' +
    //                     '<td>'+obj.role+'</td>' +
    //                     '<td>'+obj.regdate+'</td>' +
    //                     '<td>'+obj.status+'</td>' +
    //                     '<td><button class="btn btn-info btn-sm" id="btnModify">修改</button>' +
    //                     '&nbsp;<button class="btn btn-danger btn-sm" id="btnDelete">删除</button></td></tr>');
    //                 trtd.appendTo($("#userTable"));
    //         })
    //     }
    // })












})