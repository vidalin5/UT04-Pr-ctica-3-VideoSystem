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

//Para el historial de la aplicación
const historyActions = {
    init: () => {
        VideoSystemApp.handleInit();
    },
    productionsCategoryList: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.category),
    productionsActorList: (event) => VideoSystemApp.handleProductionsActorList(event.state.actor),
    productionsDirectorList: (event) => VideoSystemApp.handleProductionsDirectorList(event.state.director),
    productionInfo: (event) => VideoSystemApp.handleProductionInfo(event.state.production),
    newCategory: () =>	VideoSystemApp.handleNewCategoryForm(),
	removeCategory: () =>	VideoSystemApp.handleRemoveCategoryForm(),
    newPerson: () =>	VideoSystemApp.handleNewPersonForm(),
	removePerson: () =>	VideoSystemApp.handleRemovePersonForm(),
    newProduction: () =>	VideoSystemApp.handleNewProductionForm(),
    removeProduction: () =>	VideoSystemApp.handleRemoveProductionForm(),
    assignActorsDirectors: () =>	VideoSystemApp.handleNewAssignDeassignForm(),
    //ActorOutsideMenu: (event) => VideoSystemApp.handleProductionInfo(event.state.actor, event.state.production),
}
window.addEventListener('popstate', function (event) {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({action: 'init'}, null);

export default VideoSystemApp;