$(function () {
    var videoId = sessionStorage.getItem("videoId");
    var userObj = new Object() ;
    var str = sessionStorage.getItem("loginuser") ;
    if (str != null || str != "" || str != undefined) {
        userObj = JSON.parse(str);
    }
    var url = videoServerPath + "/" + userObj.name + "/" + 0
    var video = $('<video id="video" controls="controls" src="'+url+'" ' +
        'style="float: left ;margin-left: 10px ; padding-top: 0 ; width: 294px;height: 170px;">' +
        '</video>')    //创建一个video
    video.appendTo('body')

    $.ajax({
        url : videoServerPath + "/" + userObj.name + 0  ,
        type : 'GET',
        contentType : 'application/json;charset=UTF-8',
        dataType : 'json' ,
        success : function(reqData){
            console.log(reqData)
        }
    })
})