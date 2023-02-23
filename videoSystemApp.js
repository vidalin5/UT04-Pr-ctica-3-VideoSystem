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

const historyActions = {
    init: () => {
        VideoSystemApp.handleInit();
    },
    productionsCategoryList: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.category),
    productionsActorList: (event) => VideoSystemApp.handleProductionsActorList(event.state.actor),
    productionsDirectorList: (event) => VideoSystemApp.handleProductionsDirectorList(event.state.director),
    productionInfo: (event) => VideoSystemApp.handleProductionInfo(event.state.production),
    //ActorOutsideMenu: (event) => VideoSystemApp.handleProductionInfo(event.state.actor, event.state.production),
}
window.addEventListener('popstate', function (event) {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({action: 'init'}, null);

export default VideoSystemApp;