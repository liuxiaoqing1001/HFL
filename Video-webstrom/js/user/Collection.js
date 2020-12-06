$(function () {
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }

    var parentdiv=$('<div id="parentDiv"></div>');        //创建一个父div
    parentdiv.attr('class','container-fluid');        //给父div设置class

    /**
     * 根据当前登录者获取收藏视频
     */
    $.ajax({
        async : false,
        url : collectAll + userObj.name  ,
        type : 'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        success : function(reqData){
            console.log(reqData);
            if (reqData.length==0){
                str='<p style="color: #3e8f3e;text-indent:2em">您还没有收藏视频，去首页看看吧<p>';
                $("#formUpVideo").append(str) ;
            }else {
                for (var i = 0 ; i < reqData.length ; i++) {
                    createDiv(userObj.name  , reqData[i].description ,  videoPlayPath + reqData[i].vid);
                    console.log(reqData[i].id);
                }
            }
        }
    });

    /**
     * 动态在页面上添加登录者的视频
     * @param uname 传递登录者姓名
     * @param description   传递视频描述
     * @param url   传递视频 url
     */
    function createDiv(uname  , description  , url) {
        //创建一个子div
        var childdiv=$('<div></div>');
        //给子div设置id
        childdiv.attr('id','videoDiv');
        //添加css样式
        childdiv.css("float" , "left");
        //将子div添加到父div中
        childdiv.appendTo(parentdiv);

        var video = $('<video id="video" controls="controls" src="'+url+'" ' +
            'style="float: left ;margin-left: 10px ; padding-top: 0 ; width: 294px;height: 170px;">' +
            '</video>');    //创建一个video
        video.appendTo(childdiv);


        var infoDiv = $('<div></div>');  //div
        infoDiv.text('简介：' + description);
        infoDiv.css("margin-left" , "10px");

        infoDiv.appendTo(childdiv);

        parentdiv.appendTo('form');
    }
});

