// 从sessionStorage取出登录者信息
var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    //传入登录者的名字
    $("#userName").val(userObj.name)
    // 设置该项为禁用
    $("#userName").attr("disabled" , "disabled")

    $("#userAge").val(userObj.age);
    $("#userGender").val(userObj.gender);
    $("#userEmail").val(userObj.email);
    $("#userPhone").val(userObj.phone);

    $('#modifyForm input[name="id"]').val(userObj.id);
    if(userObj.photourl != null && userObj.photourl != '') {
        $("#userPhoto").attr("src" ,userObj.photourl) ;
    }

    //点击上传按钮之后
    $("#btnUpLoad").click(function () {
        var upData = {
            id : userObj.id ,
            age : $('input[name="userAge"]').val(),
            gender : $('select[id="userGender"]').val(),
            email : $('input[name="userEmail"]').val(),
            phone : $('input[name="userPhone"]').val()
        }
        $.ajax({
            url : serverPath,//'http://localhost:8090/user'
            type : 'PUT',
            data : upData,
            dataType : 'json' ,
            success : function(reqData){
                //console.log(reqData) ;
                // alert(reqData.msg) ;
                sessionStorage.setItem("loginuser" , JSON.stringify(reqData.data)) ;
            }

        });

        alert("kk")
        var formData=new FormData($("#modifyForm")[0]);
        $.ajax({
            url : serverPath + 'photo/' ,
            type : 'POST' ,
            data : formData ,
            contentType : false ,    // 表单数据含有文件域，必须设置该项
            processData : false ,    // 上传不需要进行序列化处理
            success:function(reqData) {
                console.log(reqData) ;
                alert(reqData.msg) ;
                if(reqData.errCode == 0) {
                    sessionStorage.setItem("loginuser" , JSON.stringify(reqData.data)) ;
                    $("#showphoto").attr("src" , reqData.data.photourl) ;
                }
            }

        });

        //获取输入的年龄内容
        var userAge = $("#userAge").val();
        console.log(userAge);
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
        console.log(userEmail)
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
        console.log(userPhone)
        //校验手机号码
        if ('' == userPhone) {
            alert("手机号码不能为空")
        } else if (userPhone.length != 11) {
            alert("手机号码长度错误")
        } else {
            $("#userPhone").val(userPhone)
        }

        // //获得输入的家庭住址内容
        // var userAddress = $("#userAddress").val() ;
        // console.log(userAddress)
        // //校验家庭住址
        // if ('' == userAddress) {
        //     alert("家庭住址不能为空")
        // } else {
        //     $("#userAddress").val(userAddress)
        // }

        //校验复选框是否选中
        var isChecked = $("#checkbox").is(':checked')
        console.log(isChecked)
        if (isChecked == false) {
            alert("请勾选同意协议的复选框")
        }

        if(userObj.photourl != null && userObj.photourl != '') {
            $("#userPhoto").attr("src" ,userObj.photourl) ;
        }

        //新数据存入数据库


    })

    //点击取消按钮之后，设置值为原数据库中数据
    $("#btnReset").click(function () {
        $("#userAge").val(userObj.age)
        $("#userEmail").val(userObj.email)
        $("#userPhone").val(userObj.mobile)
        // $("#userAddress").val('')
        $("#checkbox").prop('checked', false)
    })
})