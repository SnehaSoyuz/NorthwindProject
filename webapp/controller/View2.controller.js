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
            var suppId = oEvent.getParameter("arguments").SupplierID;
            var sPath = '/' + suppId;
            this.getView().bindElement({
                path: sPath + "/Supplier"
            });
        }
    });
});