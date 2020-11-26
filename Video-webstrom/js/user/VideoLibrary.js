$(function () {
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    // console.log(userObj.name);
    $("#userName").val(userObj.name);
    $("#userName").attr("disabled" , "disabled");

    // $.ajax({
    //     url : videoType,
    //     type : 'GET' ,
    //     contentType : 'application/json;charset=UTF-8',
    //     success:function(reqData) {
    //         console.log(reqData) ;
    //         // for (var i = 0 ; i < reqData.length ; i++) {
    //         //     var optgroup = $('<optgroup label='+reqData[i].id+'>' +
    //         //         '<option value='+reqData[i].id+'>'+reqData[i].typename+'</option>' +
    //         //         '</optgroup>');
    //         //     optgroup.appendTo($("#videoType"));
    //         // }
    //     }
    // });

    $.get(
        videoType ,
        function(reqData) {
            // console.log(reqData);
            if(0 == reqData.errCode) {
                typeArr = reqData.data ;
                // console.log(typeArr);
                var str = '' ;
                $.each(typeArr , function(index , item){
                    str += '<option value="'+item.id+'">' + item.typename + '</option>' ;
                });
                $("#videoType").html($("#videoType").html() + str) ;
            }
        }
    );

    initFileInput(userObj.name);

});

function initFileInput(uname) {
    // var videopath = $("#input-id").val() ;
    // var path = null ;
    // var control = $('#' + ctrlName);
    $("#input-id").fileinput({
        language: 'zh', //设置语言
        uploadUrl: videoUpload, //上传的地址
        allowedFileExtensions: [ "mp4","avi","dat","3gp","mov","rmvb"],//接收的文件后缀
        // uploadExtraData:{"uname": uname, "videoName":videoName , "videoDes":videoDes , "videoType":videoType},  //上传文件时额外传递的参数设置
        uploadAsync: true, //默认异步上传
        showUpload: true, //是否显示上传按钮
        showRemove : true, //显示移除按钮
        showPreview : true, //是否显示预览
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        //dropZoneEnabled: true,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
        //minFileCount: 0,
        //maxFileCount: 10, //表示允许同时上传的最大文件个数
        // enctype: 'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        layoutTemplates :{
            //actionDelete:'', //去除上传预览的缩略图中的删除图标
            //actionUpload:'',//去除上传预览缩略图中的上传图片；
            //actionZoom:''   //去除上传预览缩略图中的查看详情预览的缩略图标。
        },
    });


    $("#input-id").on('filepreupload', function(event, data, previewId, index) {     //上传中
        var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader;
        console.log('文件正在上传' + response);
    });
    $("#input-id").on("fileuploaded", function (event, data, previewId, index) {    //一个文件上传成功
        var videoName = $("#videoName").val() ;
        var videoDes = $("#description").val() ;
        var videoType = $("#videoType").val() ;
        var videopath = getValue($("#input-id").val()) ;
        var videopathAll = "/home/liu/视频/"+getValue($("#input-id").val()) ;
        alert('文件上传成功！');
        debugger
        alert('文件上传成功！'+ data);
        console.log(videoName + videoDes + videoType + videopath );
        var obj ={
            uname : uname ,
            typeid : videoType ,
            description : videoDes.trim() ,
            videopath : videopath ,
            title : videoName,
            videopathAll:videopathAll
        };
        var upData = JSON.stringify(obj) ;
        console.log(upData);
        $.ajax({
            async : false ,
            url : videoAdd ,
            type : 'POST' ,
            data : upData ,
            contentType : 'application/json;charset=UTF-8',
            success:function(reqData) {
                console.log(reqData) ;
                alert(reqData.msg) ;
            }
        });
        location.href = "Material.html";
    });
    $("#input-id").on('fileerror', function(event, data, msg) {  //一个文件上传失败
        alert('文件上传失败！'+data.id);
    })

}

function getValue(url){
    //获取最后一个\的位置
    var site = url.lastIndexOf("\\");
    //截取最后一个\后的值
    return url.substring(site + 1, url.length);
}