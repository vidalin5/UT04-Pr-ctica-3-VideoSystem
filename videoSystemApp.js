import VideoSystem from "./videoSystemModel.js";
import VideoSystemController from "./videoSystemController.js";
import VideoSystemView from "./videoSystemView.js";

//MVC - APP
let VideoSystemApp;
$(function () {
    VideoSystemApp = new VideoSystemController(
        VideoSystem.getInstance("VideoSystem"), new VideoSystemView()
    );
});

export default VideoSystemApp;