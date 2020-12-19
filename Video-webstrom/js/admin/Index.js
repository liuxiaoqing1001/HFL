var userObj = new Object() ;
var str = sessionStorage.getItem("loginuser") ;
$(function () {
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    if(str == null || str == undefined || str == "") {
        location.href="../Login.html" ;
    }
    if(userObj.photourl != null && userObj.photourl != '') {
        $("#photo").attr("src" ,userObj.photourl) ;
    }
    if (null != userObj) {
        $("#showLoginUser").text(userObj.name);
    } else {
        $("#showLoginUser").text('未登录');
    }

    // 未登录用户不允许访问该页
    if(str == null || str == undefined || str == "") {
        location.href="../../pages/Login.html" ;
    }

    $("#exitBtn").click(function () {
        location.href="../../pages/Login.html";
        // 从 sessionStorage 删除所有保存的数据
        sessionStorage.clear();
        alert("已退出登录")
    });

    setInterval(function () {       //setInterval(function(){},1000)：该方法可按照指定的周期<即第二个参数[以毫秒为单位]>来调用函数或计算表达式
        var now = new Date() ;
        document.getElementById("showLoginTime").innerHTML = initDate(now) ;
    },1000);

    // treeview设置
    // $.getJSON(url , 回调函数) 是使用ajax的get请求方式，请求结果是一个json字符串
    $.getJSON('../../json/menu.json', function (data) {
        $("#tree").treeview({
            data: data,
            selectedIcon: "glyphicon glyphicon-menu-right",
            selectedBackColor: '#FF7F24',
            collapseIcon : '' ,  // 子项展开时去掉前面默认的 + 图标
            expandIcon : '' ,    // 子项未展开时去掉前面默认 + 图标
            onNodeSelected: function (event, data) {
                var navHtml = '' ;
                // if(data.text.indexOf('首页') >= 0) {
                //     navHtml = "<li>首页</li>" ;
                // } else {
                //     // 根据当前选中节点的父节点
                //     var parent = $("#tree").treeview("getNode", data.parentId);
                //     // var children = $("#tree").treeview("getNode",data.parentId.parentId)
                //     navHtml = navHtml + "<li>" + parent.text + "</li>" +
                //         "<li>" + data.text + "</li>" ;
                // }
                var parent = $("#tree").treeview("getNode", data.parentId);
                navHtml = "<li>" + parent.text + "</li>" +
                    "<li>" + data.text + "</li>" ;
                $("#breadcrumb").html(navHtml);
                $("#contentFrame").attr("src", data.href);
                // console.log(data.href)
            }
        })
    })
});
