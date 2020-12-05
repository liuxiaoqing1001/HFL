// 从sessionStorage取出信息
var forgetObj = new Object() ;
var str = sessionStorage.getItem("forget") ;
if (str != null || str != "" || str != undefined) {
    forgetObj = JSON.parse(str);
}
console.log(forgetObj);
$(function () {
    $("#formResetPassword").bootstrapValidator({
        message: "登录信息填写不符合规则",
        feedbackIcons: {			// 图标设置
            valid: 'glyphicon glyphicon-ok',		// 合格
            invalid: 'glyphicon glyphicon-remove',	// 不合格
            validating: 'glyphicon glyphicon-refresh'	// 校验中，，，
        },
        fields: {
            password: {
                message: '密码填写错误!',
                validators: {
                    notEmpty: {
                        message: '密码不能为空!'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度应该在6-12之间',
                    },
                    regexp: {
                        regexp: /^[\d\w]{6,12}$/,
                        message: '密码应该是6-12位之间数字和字母相结合'
                    }
                }
            },
            repassword: {
                message: '密码填写错误!',
                validators: {
                    notEmpty: {
                        message: '密码不能为空!'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度应该在6-12之间',
                    },
                    regexp: {
                        regexp: /^[\d\w]{6,12}$/,
                        message: '密码应该是6-12位之间数字和字母相结合'
                    }
                }
            },

        }

    }).on('success.form.bv', function (e) {//点击提交之后
        // 阻止表单提交
        e.preventDefault();
        // 获取表单引用
        var $form = $(e.target);

        // 得到bootstrapvalidator实例
        var bv = $form.data('bootstrapValidator');


        var password=$("#password").val();
        var repassword=$("#repassword").val();
        if(password!=repassword){
            alert("两次密码不一致")
        }else{
            $.ajax({
                url : userModifyP + password + '/' + forgetObj.name,
                type :"PUT",
                contentType : 'application/json;charset=UTF-8',
                dataType : 'json' ,
                success : function(reqData){
                    console.log(reqData);
                    alert(reqData.msg) ;
                    location.href="../Login.html"
                }
            })
        }
    })
});