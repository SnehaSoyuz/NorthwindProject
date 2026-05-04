sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/excnorthwindproject/excnorthwindproject/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("com.excnorthwindproject.excnorthwindproject.Component", {
        metadata: {
            manifest: "json",
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
            this.getRouter().navTo("Home");
        }
    });
});