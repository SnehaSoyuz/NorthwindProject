sap.ui.define([
    'sap/ui/core/mvc/Controller',
    "com/excnorthwindproject/excnorthwindproject/util/lifeSaver",
    'sap/ui/core/UIComponent'
], function (Controller, lifeSaver, UIComponent) {
    return Controller.extend("com.soyuz.sneha.controller.BaseController", {
        formatter: lifeSaver,
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },
    });
});