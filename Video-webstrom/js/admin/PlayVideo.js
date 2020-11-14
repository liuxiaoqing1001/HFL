$(function () {
        var id="/1/";
        // // "http://localhost:8090/video/play/1"
        var videoSrc= videoPlayPath + id;

        $("#showVideo").attr("src",videoSrc);
        $("#showVideo").play();

});