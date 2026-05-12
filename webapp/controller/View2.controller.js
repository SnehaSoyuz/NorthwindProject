sap.ui.define([
    "com/excnorthwindproject/excnorthwindproject/controller/BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("com.excnorthwindproject.excnorthwindproject.controller.View2", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("SupplierDetail").attachMatched(this.herculis, this);


        },
        herculis: function (oEvent) {
            var supplierId = oEvent.getParameter("arguments").SupplierID;

            var sPath = "/Products(" + supplierId + ")/Supplier";

            this.getView().bindElement({
                path: sPath
            });
            this.getView().getModel("layout").setProperty("/Layout", "TwoColumnsMidExpanded")
        },
        onBack: function () {
            this.oRouter.navTo("Home");
        },
        onFullScreen: function (oEvent) {
            /*get the source of action*/
            var oSource = oEvent.getSource();
            /*fetch the layout model*/
            var oLayoutModel = this.getView().getModel("layout");
            /*get current layout*/
            var sLayout = oLayoutModel.getProperty("/Layout");
            /*toggle the layout of application*/
            switch (sLayout) {
                case "TwoColumnsMidExpanded":

                    oSource.setIcon("sap-icon://exit-full-screen");
                    oLayoutModel.setProperty("/Layout", "MidColumnFullScreen");
                    break;

                default:

                    oSource.setIcon("sap-icon://full-screen");
                    oLayoutModel.setProperty("/Layout", "TwoColumnsMidExpanded");
                    break;
            }
        }

    });
});