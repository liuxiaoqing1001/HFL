$(function () {
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    var parentdiv=$('<div id="parentDiv"></div>');        //创建一个父div
    parentdiv.attr('class','container-fluid');        //给父div设置class


    //通过 ajax 根据当前登录者的名字获取他的视频
    $.ajax({
        async : false,
        url : videoPath + userObj.name  ,
        type : 'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        success : function(reqData){
            console.log(reqData);
            for (var i = 0 ; i < reqData.length ; i++) {
                createDiv(userObj.name  , reqData[i].description , reqData[i].status , videoServerPath + "/" + userObj.name + "/" + i , i , reqData[i].id);
                console.log(reqData[i].id)
            }
        }
    })

    /**
     * 动态在页面上添加登录者的视频
     * @param uname 传递登录者姓名
     * @param description   传递视频描述
     * @param status    传递视频状态
     * @param url   传递视频 url
     * @param i     传递循环次数，用来给按钮 id 动态赋值 ， 对应视频对应 id
     * @param videoId   传递视频id
     */
    function createDiv(uname  , description , status , url , i , videoId) {
        var childdiv=$('<div></div>');        //创建一个子div
        childdiv.attr('id','videoDiv');            //给子div设置id
        childdiv.css("float" , "left");         //添加css样式
        childdiv.appendTo(parentdiv);        //将子div添加到父div中

        var video = $('<video id="video" controls="controls" src="'+url+'" ' +
            'style="float: left ;margin-left: 10px ; padding-top: 0 ; width: 294px;height: 170px;">' +
            '</video>') ;   //创建一个video
        video.appendTo(childdiv);


        var infoDiv = $('<div></div>') ; //div
        infoDiv.text('简介：' + description);
        infoDiv.css("margin-left" , "10px");

        infoDiv.appendTo(childdiv);

        var statusDiv = $('<div id="videoStatus"></div>');  //div
        statusDiv.text("状态：" + status);
        statusDiv.css("margin-left" , "10px");
        var button = $('<button type="button" style="float:right; padding-bottom: 2px" class="btn btn-sm btn-info btnOption">操作</button>');
        button.appendTo(statusDiv);
        statusDiv.appendTo(childdiv);

        parentdiv.appendTo('form');

        $(".btnOption").eq(i).attr("id" , videoId);
    }

    //点击操作按钮
    $(".btnOption").click(function () {
        var id =  $(this).attr("id");
        alert(id);
        sessionStorage.setItem("videoId" , id);
        //更改数据库中视频状态为 审核中
        $.ajax({
            url : videoPath + "未审核/" + id  ,
            type : 'PUT',
            contentType : 'application/json;charset=UTF-8',
            dataType : 'json' ,
            success : function(reqData){
                console.log(reqData);
                $("#videoStatus").text("状态：" + reqData.data)
            }
        })
        
    })

    // function playVideo(count) {
    //     $.ajax({
    //         url : videoServerPath + "/" + userObj.name + count  ,
    //         type : 'GET',
    //         contentType : 'application/json;charset=UTF-8',
    //         dataType : 'json' ,
    //         success : function(reqData){
    //             console.log(reqData)
    //         }
    //     })
    //
    // }

})

