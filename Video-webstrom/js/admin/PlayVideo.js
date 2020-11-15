$(function () {
        var aStr = sessionStorage.getItem("currentVideo") ;
        if(aStr == '' || aStr == null) {
                window.close() ;
                return ;
        }
        var aObj = JSON.parse(aStr) ;
        sessionStorage.removeItem("currentVideo") ;
        console.log(aObj) ;
        var id=aObj.id;
        // var id=1;
        // "http://localhost:8090/video/play/1"
        var videoSrc = videoPlayPath + id;
        $("#showVideo").attr("src",videoSrc);
        // $("#showVideo").play();
        $(".showTitle").html(aObj.title) ;
        $(".showUName").text(aObj.uname);
        $(".showDate").text(aObj.pubdatetime) ;
        $(".showStatus").text(aObj.status);
        $(".showdescription").html(aObj.description) ;

        $("#btn_pass").click(function () {

        });

        $("#btn_noPass").click(function () {

        });

});