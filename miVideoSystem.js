import VideoSystemApp from "./videoSystemApp.js";

const historyActions = {
    init: () => {
        VideoSystemApp.handleInit();
    },
    productionsCategoryList: (event) => VideoSystemApp.handleProductionsCategoryList(event.state.category)
}
window.addEventListener('popstate', function (event) {
    if (event.state) {
        historyActions[event.state.action](event);
    }
});

history.replaceState({action: 'init'}, null);