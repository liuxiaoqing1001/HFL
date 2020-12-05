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
            for (var i = 0 ; i < reqData.data.length ; i++) {
                createDiv(userObj.name  , reqData.data[i].description ,  videoPlayPath + reqData.data[i].vid);
                console.log(reqData.data[i].id);
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
        var childdiv=$('<div></div>');        //创建一个子div
        childdiv.attr('id','videoDiv');            //给子div设置id
        childdiv.css("float" , "left");         //添加css样式
        childdiv.appendTo(parentdiv);        //将子div添加到父div中

        var video = $('<video id="video" controls="controls" src="'+url+'" ' +
            'style="float: left ;margin-left: 10px ; padding-top: 0 ; width: 294px;height: 170px;">' +
            '</video>')    //创建一个video
        video.appendTo(childdiv)


        var infoDiv = $('<div></div>')  //div
        infoDiv.text('简介：' + description)
        infoDiv.css("margin-left" , "10px");

        infoDiv.appendTo(childdiv)

        parentdiv.appendTo('form');
    }
})

