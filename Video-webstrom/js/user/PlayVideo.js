$(function () {
        var videoStr = sessionStorage.getItem("thisVideo") ;
        if(videoStr == '' || videoStr == null) {
                window.close() ;
                return ;
        }
        var video = JSON.parse(videoStr) ;
        sessionStorage.removeItem("thisVideo") ;
        console.log(video) ;
        //打印最后一个保存的thisVideo（错误，修改）
        // description: "coffe"
        // id: 2
        // pubdatetime: "2020年10月08日 00:42:10"
        // status: "未审核"
        // title: "startPark"
        // typeid: 2
        // uname: "liu"
        // videopath: "tweetsip.mp4"

        var id=video.id;
});

