sap.ui.define(["com/excnorthwindproject/excnorthwindproject/attributes/variable"
], function (variable) {

    return {
        getStatusText: function (value) {
            variable.oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            debugger;
            return value ? variable.oResourceBundle.getText("DISCONT_TXT") : variable.oResourceBundle.getText("CONTINUE_TXT");
        },

        getStatusState: function (value) {
            return value ? "Error" : "Success";
        }
    }
});