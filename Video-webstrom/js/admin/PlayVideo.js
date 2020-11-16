$(function () {
        var videoStr = sessionStorage.getItem("currentVideo") ;
        if(videoStr == '' || videoStr == null) {
                window.close() ;
                return ;
        }
        var video = JSON.parse(videoStr) ;
        sessionStorage.removeItem("currentVideo") ;
        console.log(video) ;
        var id=video.id;
        // var id=1;
        // "http://localhost:8090/video/play/1"
        var videoSrc = videoPlayPath + id;
        $("#showVideo").attr("src",videoSrc);
        // $("#showVideo").play();
        $(".showTitle").html(video.title) ;
        $(".showUName").text(video.uname);
        $(".showDate").text(video.pubdatetime) ;
        $(".showStatus").text(video.status);
        $(".showDescription").text(video.description) ;

        if(video.status=="通过"){
                $("#btn_pass").text("返回");
                $("#btn_noPass").text("发送反馈");
                $("#btn_pass").click(function () {
                        location.href = "VideoList.html" ;
                });
                $("#btn_noPass").click(function () {
                        bootbox.confirm('发送反馈' , function(rebackData){
                                if(rebackData) {
                                        // 使用Ajax提交表单并进行校验
                                        var msgObj = {
                                                title : "视频反馈",
                                                content : "Nice!!!再接再厉",
                                                sender : "admin",
                                                receiver : video.uname,
                                                // time : initDate(new Date())
                                        } ;
                                        var msgData = JSON.stringify(msgObj) ;
                                        $.ajax({
                                                url : videoAddMsg ,
                                                type : 'POST',
                                                data : msgData,
                                                contentType : 'application/json;charset=UTF-8',
                                                dataType : 'json' ,
                                                success : function(reqData){
                                                        console.log(reqData);
                                                        alert(reqData.msg) ;
                                                        location.href = "VideoList.html" ;
                                                }
                                        });
                                }
                        });
                });
        }else{
                $("#btn_pass").click(function () {
                        $.get(
                            videoUpStatus + id,
                            function (datas) {
                                    bootbox.confirm('发送审核通过结果' , function(confirmData) {
                                            if(confirmData) {
                                                    // 使用Ajax提交表单并进行校验
                                                    var msgObj = {
                                                            title : "审核结果",
                                                            content : "视频审核通过！",
                                                            sender : "admin",
                                                            receiver : video.uname,
                                                            // time : initDate(new Date())
                                                    } ;
                                                    var passData = JSON.stringify(msgObj);
                                                    $.ajax({
                                                            url : videoAddMsg ,
                                                            type : 'POST',
                                                            data : passData,
                                                            contentType : 'application/json;charset=UTF-8',
                                                            dataType : 'json' ,
                                                            success : function(reqData){
                                                                    console.log(reqData);
                                                                    alert(reqData.msg) ;
                                                                    location.href = "VideoList.html" ;
                                                            }
                                                    });
                                            }
                                    });
                            });
                });

                $("#btn_noPass").click(function () {
                        console.log(getDateStr(new Date()));
                        console.log(new Date());
                        bootbox.confirm('发送审核不通过结果' , function(yesData) {
                                if(yesData) {
                                        // 使用Ajax提交表单并进行校验
                                        var msgObj = {
                                                title : "审核结果",
                                                content : "视频审核不通过！含有敏感信息！",
                                                sender : "admin",
                                                receiver : video.uname,
                                                // time : initDate(new Date())
                                        } ;
                                        var noPassData = JSON.stringify(msgObj);
                                        $.ajax({
                                                url : videoAddMsg ,
                                                type : 'POST',
                                                data : noPassData,
                                                contentType : 'application/json;charset=UTF-8',
                                                dataType : 'json' ,
                                                success : function(reqData){
                                                        console.log(reqData);
                                                        alert(reqData.msg) ;
                                                        location.href = "VideoList.html" ;
                                                }
                                        });
                                }
                        });
                });
        }
});