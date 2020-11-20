$(function () {
        var req=GetRequest();
        var a=req["id"];
        console.log(a);
    // var i=0;
    //     var videoStr = sessionStorage.getItem("thisVideo") ;
    //     if(videoStr == '' || videoStr == null) {
    //             window.close() ;
    //             return ;
    //     }
    //     var video = JSON.parse(videoStr) ;
    //     sessionStorage.removeItem("thisVideo") ;
    //     console.log(video) ;
        //打印最后一个保存的thisVideo（错误，修改）
        // description: "coffe"
        // id: 2
        // pubdatetime: "2020年10月08日 00:42:10"
        // status: "未审核"
        // title: "startPark"
        // typeid: 2
        // uname: "liu"
        // videopath: "tweetsip.mp4"

        // var id=video.id;
});

function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
        }
        return theRequest;
}

function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return (r[2]); return null;
}

