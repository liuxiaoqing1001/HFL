// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;

$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    //用户名称模块传递的内容
    $("#userName").text(userObj.name) ;

    //用户年龄模块传递的内容
    $("#userAge").text(userObj.age) ;

    //用户性别模块传递的内容
    $("#userGender").text(userObj.sex) ;

    //用户邮箱模块传递的内容
    $("#userEmail").text(userObj.email) ;

    //手机号码模块传递的内容
    $("#userPhone").text(userObj.mobile) ;

    //头像模块传递的内容
    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        // console.log("name:"+userObj.name);
        var photoSrc = userPhotoPath + userObj.name;
        // console.log(photoSrc);
        $("#showPhoto").attr("src",photoSrc);
    }

    // $("#showPhoto").click(function () {
    //    console.log("更换头像");
    //     // 更新头像-FileInput 初始化,更换uploadUrl？？？？？？？？？？？
    //     // window.parent.modalOut(location.href);
    //
    //     // $('#updatePhoto').modal('show');
    //
    //     var oFileInput = new FileInput();
    //     oFileInput.Init("userphoto", userPhoto + userObj.id);
    // });

});

//初始化FileInput
var FileInput = function () {
    var oFile = new Object();
    //初始化fileinput控件（第一次初始化）
    oFile.Init = function(ctrlName, uploadUrl) {
        var control = $('#' + ctrlName);
        // console.log("uploadUrl:"+uploadUrl);
        //初始化上传控件的样式
        control.fileinput({
            language: 'zh', //设置语言
            uploadUrl: uploadUrl, //上传的地址
            allowedFileExtensions : ['jpg', 'png','gif'],
            maxFileSize : 2048,			// 以kb为单位
            maxFilesNum: 1,

            showUpload: true, //是否显示上传按钮
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式
            dropZoneEnabled: true,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 1000,//图片的最大宽度
            //maxImageHeight: 1000,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            enctype: 'multipart/form-data',
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        });

        //导入文件上传完成之后的事件？？？？？？？？？？？？？？？？
        $("#userphoto").on("fileuploaded", function (event, data, previewId, index) {
            $("#updatePhoto").modal("hide");
            console.log(data) ;
            // 获取服务器回传的数据
            var responseData = data.response ;
            if(responseData.errCode === 0) {
                bootbox.alert('上传成功');
                // 清除文件上传预览框
                $(event.target).fileinput('clear') ;

                // location.reload([true]);
                location.replace(location.href);

                // $("#uPhoto").load(location.href+" #uPhoto>*","");

                // 刷新头像？？？？？？？？？
                // $("#showPhoto").attr("src" ,responseData.data.photourl) ;
                // console.log("userPhotoPath + userObj.name:::"+responseData.data.photourl);

                // $("#showUserPhoto", window.parent.document).attr("src", responseData.data.photourl);

                // $("#showPhoto").attr("src" ,userPhotoPath + userObj.name) ;
                // console.log("userPhotoPath + userObj.name:::"+userPhotoPath + userObj.name);

                // sessionStorage.setItem("loginuser" , JSON.stringify(responseData.data)) ;
                // console.log("data:"+JSON.stringify(responseData.data));

            }
        }).on("fileerror" , function(event , data , msg){
            console.log(msg) ;
        }) ;
    };
    return oFile;

};