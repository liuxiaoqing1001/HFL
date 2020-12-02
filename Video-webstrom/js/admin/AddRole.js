$(function () {
// 验证码
    yzhm = drawCode("verifyCanvas" , 4);
// 点击图片换验证码
    $("#code_img").click(function(){
        changeYzhm();
    });
    $("#formRegister").bootstrapValidator({
        message : "登录信息填写不符合规则" ,
        feedbackIcons: {			// 图标设置
            valid: 'glyphicon glyphicon-ok',		// 合格
            invalid: 'glyphicon glyphicon-remove',	// 不合格
            validating: 'glyphicon glyphicon-refresh'	// 校验中，，，
        },
        fields : {
            verify : {
                message : '验证码错误！' ,
                validators : {
                    notEmpty : {
                        message : '验证码不能为空!'
                    },
                    callback : {
                        message : '验证码填写错误!' ,
                        callback : function(value , validator , $field) {
                            return value.toLowerCase()==yzhm.toLowerCase() ;
                        }
                    }
                }
            } ,
            registerName : {
                message: '用户名填写错误!' ,
                validators : {
                    notEmpty : {
                        message : '用户名不能为空!'
                    } ,
                    stringLength : {
                        min : 3 ,
                        message : '用户名至少三个字符'
                    }
                }
            } ,
            registerPass : {
                message: '密码填写错误!' ,
                validators : {
                    notEmpty : {
                        message : '密码不能为空!'
                    } ,
                    stringLength : {
                        min : 6,
                        max : 12,
                        message : '密码长度应该在6-12之间' ,
                    } ,
                    regexp: {
                        regexp: /^[\d\w]{6,12}$/,
                        message: '密码应该是6-12位之间数字和字母相结合'
                    }
                }
            } ,
            registerAge : {
                message: '年龄填写错误' ,
                validators : {
                    notEmpty : {
                        message : '年龄不能为空!'
                    } ,
                    stringLength : {
                        min : 1,
                        max : 3 ,
                        message : '年龄长度应该在1-3之间' ,
                    } ,
                    digits: {
                        message: '该值只能包含数字!'
                    } ,
                    // 判断输入数字是否符合大于0小于100
                    greaterThan: {
                        value: 0
                    },
                    lessThan: {
                        value: 100
                    } ,
                    regexp : {
                        regexp: /^[\d]{1,3}$/,
                        message: '年龄应该是1-3位数字'
                    }
                }
            } ,
            registerEmail : {
                message : '邮箱填写错误' ,
                validators : {
                    notEmpty : {
                        message : '邮箱不能为空!'
                    } ,
                    emailAddress: {
                        message: '邮箱格式不正确!'
                    } ,
                    regexp: {
                        regexp: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                        message: '邮箱格式应该是数字字母+@+数字或字母+.+字母组成'
                    }
                }
            } ,
            registerPhone : {
                message : '手机号码填写错误' ,
                validators : {
                    notEmpty : {
                        message : '手机号码不能为空!'
                    } ,
                    digits: {
                        message: '该值只能包含数字!'
                    } ,
                    stringLength:{
                        max : 11 ,
                        message : '手机号码长度错误'
                    } ,
                    regexp: {
                        regexp: /^1[0-9]{10}$/,
                        message: '手机号码由1开头的11为数字组成'
                    }
                }
            } ,
            registerPhoto : {
                uri: {}
            }
        }

    }).on('success.form.bv', function(e) {//点击提交之后
        // 阻止表单提交
        e.preventDefault();
        // 获取表单引用
        var $form = $(e.target);

        // 得到bootstrapvalidator实例
        var bv = $form.data('bootstrapValidator');

        // 使用Ajax提交表单并进行校验
        var userObj = {
            name : $('#formRegister input[name="registerName"]').val(),
            password : $('#formRegister input[name="registerPass"]').val(),
            age : $('#formRegister input[name="registerAge"]').val(),
            sex : $('#formRegister select[name="registerSex"]').val(),
            email : $('#formRegister input[name="registerEmail"]').val(),
            mobile : $('#formRegister input[name="registerPhone"]').val(),
            // photourl : $('#formRegister input[name="registerPhoto"]').val()
        } ;
        var upData = JSON.stringify(userObj) ;
        console.log(upData) ;
        $.ajax({
            url : userRoleAdd ,
            type : 'POST',
            data : upData,
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                if(reqData.errorCode==1){
                    alert(reqData.msg);
                    location.href = "UserList.html" ;
                }
                alert(reqData.msg) ;
                location.href = "RoleList.html" ;
            }
        })

    });

    $("#btnRegisterReset").click(function () {
        $('#formRegister input[name="registerName"]').val(''),
            $('#formRegister input[name="registerPass"]').val(''),
            $('#formRegister input[name="registerAge"]').val(''),
            $('#formRegister select[name="registerSex"]').val(''),
            $('#formRegister input[name="registerEmail"]').val(''),
            $('#formRegister input[name="registerPhone"]').val('')
            // $('#formRegister input[name="registerPhoto"]').val('')
    })

})
function changeYzhm() {
    $('#verifyCanvas').remove();
    $('#verify').after('<canvas width="80" height="40" id="verifyCanvas"></canvas>');
    yzhm=drawCode("verifyCanvas" , 4);
}

// 绘制图片
function convertCanvasToImage(canvas) {
    document.getElementById("verifyCanvas").style.display = "none";
    var image = document.getElementById("code_img");
    image.src = canvas.toDataURL("image/png");
    return image;
}
