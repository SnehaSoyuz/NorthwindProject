sap.ui.define([
  "com/excnorthwindproject/excnorthwindproject/controller/BaseController",
  "com/excnorthwindproject/excnorthwindproject/attributes/variable"
], function (oController, variable) {
  "use strict";

  return oController.extend("com.excnorthwindproject.excnorthwindproject.controller.App", {
    onInit: function () {
      this.oDefaultModel = this.getOwnerComponent().getModel();
      this.oRouter = this.getOwnerComponent().getRouter();
      let oResourceBundle = this.getOwnerComponent().getModel("i18n");
      debugger;
      variable.oResourceBundle = oResourceBundle.getResourceBundle();
    }
  });
});