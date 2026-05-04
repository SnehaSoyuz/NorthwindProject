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
            this.getView().getModel("layout").setProperty("/Layout",  "TwoColumnsMidExpanded")
        }

    });
});