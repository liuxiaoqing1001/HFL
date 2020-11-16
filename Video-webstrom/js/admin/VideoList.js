$(function () {

    // //点击审核页面跳转
    // $("#btnShenHe").click(function () {
    //     location.href = "PlayVideo.html" ;
    // })

    console.log(videoType);
    // 页面初始化时，填充视频类别
    $.get(
        videoType ,
        function(reqData) {
            console.log(reqData);
            if(0 == reqData.errCode) {
                typeArr = reqData.data ;
                console.log(typeArr);
                var str = '' ;
                $.each(typeArr , function(index , item){
                    str += '<option value="'+item.id+'">' + item.typename + '</option>' ;
                });
                $("#search_typeid").html($("#search_typeid").html() + str) ;
            }
        }
    );

    $("#btn_query").click(function () {
        $("#videoTable").bootstrapTable('refresh');
    });

    //日历
    $("#pubDatetimePicker").datetimepicker({
        format:'yyyy年mm月dd日',
        autoclose:true,
        minView:'month',
        maxView:'month',
        todayBtn:true,
        language:'zh-CN'
    });

    $("#btn_delete").click(function () {
        var rows = $("#videoTable").bootstrapTable('getSelections');
        //console.log(rows) ;
        if(0 == rows.length) {
            bootbox.alert('请选中要删除的行!') ;
            return ;
        }
        bootbox.confirm('确认删除?' , function(confirmData) {
            if(confirmData) {
                var ids = '' ;
                $.each(rows , function(index , item) {
                    ids += 'id=' + item.id + '&' ;
                });
                console.log(ids) ;
                $.ajax({
                    url : videoDelIds  ,
                    type : 'DELETE' ,
                    data : ids ,
                    datatype : 'json' ,
                    success : function(reqData) {
                        bootbox.alert(reqData.msg) ;
                        if(0 == reqData.errCode) {
                            // 表格刷新
                            $("#videoTable").bootstrapTable('refresh') ;
                        }
                    }
                });
            }
        })
    });

    $("#videoTable").bootstrapTable({
        url:videoPage,
        method:'GET',
        toolbar : '#toolbar' ,   // 为表格绑定工具栏
        striped: true,			// 显示为斑马线格式，奇偶行不通背景色

        showRefresh: "true",	// 显示刷新按钮
        showToggle: "true",		// 显示格式切换按钮
        showColumns: "true",	// 显示列过滤按钮

        // 分页相关 ，如果分页，服務器端返回的数据需要包含有total属性和rows属性
        pagination: true,		// 显示分页
        pageNumber: 1,			// 初始化加载第一页
        pageSize: 5,			// 每页2条数据
        pageList: [3, 5, 10],	// 可以选择的每页数量
        sidePagination: "server", //表示服务端请求分页数据

        // 提交到Server的参数列表 ，
        // 参数设定相关
        queryParamsType: "undefined",  // undefined：提交到服务器端的参数自定义
        queryParams: function(params) {
            // 参数params中自带 pageSize , pageNumber , sortName , sortOrder
            params.curPage = params.pageNumber ;
            params.size = params.pageSize ;
            params.title = $.trim($("#search_title").val()) ;
            params.pubdate = $.trim($("#search_date").val()) ;
            if(-1 != $("#search_typeid").val()) {
                params.typeid = $("#search_typeid").val();
            }
            return params ;

        },

        columns : [
            /*{checkbox : true} ,*/
            {checkbox : true} ,   // 显示复选框列

            {field : 'id' , title : 'ID' , visible : false} ,
            // {title : '序号' , formatter:function (value, row, index) {
            //         return index+1 ;
            //     }} ,
            {
                field : 'title' ,
                title : '标题' ,
                // formatter : function(value, row, index){
                //     return  '<span class="showDetail" style="color:blue; cursor: pointer; ">'+ value +'</span>';
                // },
                // events : window.showDetail = {
                //     'click .showDetail' : function (e , value , row , index) {
                //         sessionStorage.setItem("currentNews" , JSON.stringify(row)) ;
                //         window.open('NewsDetail.html') ;
                //
                //     }
                // }
            } ,
            {field :'description',title:'内容简述'},
            // {field : 'typeid' , title : '类别'},
            {field : 'uname' , title : '提交用户' } ,
            {field : 'pubdatetime' , title : '提交时间' } ,
            {field : 'status' , title : '审核状态' } ,
            {
                title : '' ,
                formatter: operateFormatter,
                events: operateEvent ,
            }

        ] ,


    });
});

// 操作栏外观
function operateFormatter(value, row, index) {
    var del = '<button  type="button" class="remove btn btn-xs btn-danger">' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除' +
        '</button>';
    var detail = '<button  type="button" class="check btn btn-xs btn-info">' +
        '<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>审核' +
        '</button>';
    return detail + "&nbsp;&nbsp;" + del ;

}

window.operateEvent = {
    'click .remove' : function(e , value , row , index) {
        bootbox.confirm("确认删除本视频审核?" , function(data){
            if(data) {
                $.ajax({
                    url : videoDel + row.id ,
                    type : 'DELETE' ,
                    datatype : 'json' ,
                    success : function(reqData) {
                        bootbox.alert(reqData.msg) ;
                        if(0 == reqData.errCode) {
                            // 表格刷新
                            $("#videoTable").bootstrapTable('refresh') ;
                        }
                    }
                });

            }
        }) ;
    } ,

    'click .check' : function(e , value , row , index) {
        sessionStorage.setItem("currentVideo" , JSON.stringify(row)) ;
        // window.open('PlayVideo.html') ;
        location.href = "PlayVideo.html" ;
    }

};

