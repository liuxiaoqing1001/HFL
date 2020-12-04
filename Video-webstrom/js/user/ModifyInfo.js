// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    //传入登录者的名字
    $("#userName").val(userObj.name);
    // 设置该项为禁用
    $("#userName").attr("disabled" , "disabled")

    $("#userAge").val(userObj.age);
    $("#userGender").val(userObj.sex);
    $("#userEmail").val(userObj.email);
    $("#userPhone").val(userObj.mobile);

    // $('#modifyForm input[name="id"]').val(userObj.id);
    // if(userObj.photourl != null && userObj.photourl != '') {
    //     $("#userPhoto").attr("src" ,userObj.photourl) ;
    // }

    $('#modifyForm input[name="id"]').val(userObj.id);
    if(userObj.photourl == null || userObj.photourl == '') {
        $("#showPhoto").attr("src" ,"../../img/userphoto_default.jpg") ;
    } else {
        $("#showPhoto").attr("src" ,userObj.photourl) ;
    }

    // 更新头像-FileInput 初始化,更换uploadUrl？？？？？？？？？？？
    var oFileInput = new FileInput();
    oFileInput.Init("userphoto", userPhoto + userObj.id);

    //点击上传按钮之后
    $("#btnUpLoad").click(function () {

        //获取输入的年龄内容
        var userAge = $("#userAge").val();
        // console.log(userAge);
        //校验年龄
        if ('' == userAge) {
            alert("年龄不能为空")
        } else if (userAge < 0 || userAge > 100) {
            alert("输入的年龄不符合实际")
        } else {
            $("#userAge").val(userAge)
        }

        //获得输入的邮箱内容
        var userEmail =  $("#userEmail").val() ;
        // console.log(userEmail)
        //校验邮箱
        if ('' == userEmail) {
            alert("邮箱不能为空")
        } else if (userEmail.indexOf('@') == -1 || userEmail.indexOf('.') == -1) {
            alert("邮箱格式不对，要包含@和.")
        } else {
            $("#userEmail").val(userEmail)
        }

        //获得输入的手机号码内容
        var userPhone = $("#userPhone").val() ;
        // console.log(userPhone)
        //校验手机号码
        if ('' == userPhone) {
            alert("手机号码不能为空")
        } else if (userPhone.length != 11) {
            alert("手机号码长度错误")
        } else {
            $("#userPhone").val(userPhone)
        }

        //校验复选框是否选中
        var isChecked = $("#checkbox").is(':checked');
        // console.log(isChecked)
        if (isChecked == false) {
            alert("请勾选同意协议的复选框")
        }else {
            // if(userObj.photourl != null && userObj.photourl != '') {
            //     $("#userPhoto").attr("src" ,userObj.photourl) ;
            // }

            var upData = {
                id : userObj.id ,
                age : userAge,
                sex : $('select[id="userGender"]').val(),
                email : userEmail,
                mobile : userPhone
            };
            // console.log(upData)
            $.ajax({
                url : userUpdate,
                type : 'PUT',
                data : upData,
                dataType : 'json' ,
                success : function(reqData){
                    // console.log(reqData.data) ;
                    alert(reqData.msg) ;
                    sessionStorage.setItem("loginuser" , JSON.stringify(reqData.data)) ;
                }

            });

            // // alert("kk")
            // var formData=new FormData($("#modifyForm")[0]);
            // $.ajax({
            //     url : userPath + 'photo/' ,
            //     type : 'POST' ,
            //     data : formData ,
            //     contentType : false ,    // 表单数据含有文件域，必须设置该项
            //     processData : false ,    // 上传不需要进行序列化处理
            //     success:function(reqData) {
            //         console.log(reqData) ;
            //         alert(reqData.msg) ;
            //         if(reqData.errCode == 0) {
            //             sessionStorage.setItem("loginuser" , JSON.stringify(reqData.data)) ;
            //             $("#showphoto").attr("src" , reqData.data.photourl) ;
            //         }
            //     }
            //
            // });
        }

    });

    //点击取消按钮之后，设置值为原数据库中数据
    $("#btnReset").click(function () {
        $("#userAge").val(userObj.age);
        $("#userGender").val(userObj.sex);
        $("#userEmail").val(userObj.email);
        $("#userPhone").val(userObj.mobile);
        // $("#userAddress").val('')
        $("#checkbox").prop('checked', false);
    })
});


//初始化FileInput
var FileInput = function () {
    var oFile = new Object();
    //初始化fileinput控件（第一次初始化）
    oFile.Init = function(ctrlName, uploadUrl) {
        var control = $('#' + ctrlName);
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
                // 刷新头像？？？？？？？？？
                $("#showPhoto").attr("src" ,responseData.data.photourl) ;

                // 更新数据存储？？？？？？？？？？？？？？
                sessionStorage.setItem("loginuser" , JSON.stringify(responseData.data)) ;
                userObj.photourl = responseData.data.photourl ;
                // 刷新index页面头像显示
                $("#showLoginPhoto", window.parent.document).attr("src", responseData.data.photourl);

            }
        }).on("fileerror" , function(event , data , msg){
            console.log(msg) ;
        }) ;
    }
    return oFile;

};