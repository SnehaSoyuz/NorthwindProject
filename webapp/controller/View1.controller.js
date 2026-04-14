sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.excnorthwindproject.excnorthwindproject.controller.View1", {
        onInit() {
        },
        onSearch: function (oEvent) {
            var sVal = oEvent.getParameter("newValue");
            var oFilter = new Filter("ProductName", FilterOperator.Contains, sVal);
            this.getView().byId("idTable").getBinding("items").filter(oFilter)
        },
        onChangeLanguage: function (oEvent) {
            var sLang = oEvent.getSource().getSelectedKey(); // "en" or "es"

            // Change language globally
            sap.ui.getCore().getConfiguration().setLanguage(sLang);

            // Refresh model (important)
            var oModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "com.excnorthwindproject.excnorthwindproject.i18n.i18n",
                bundleLocale: sLang
            });

            this.getView().setModel(oModel, "i18n");
        }
    });
});