sap.ui.define([
    "com/excnorthwindproject/excnorthwindproject/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/excnorthwindproject/excnorthwindproject/attributes/variable"

], (BaseController, Filter, FilterOperator, variable) => {
    "use strict";

    return BaseController.extend("com.excnorthwindproject.excnorthwindproject.controller.View1", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            var oTable = this.byId("idTable");
            oTable.attachUpdateFinished(this.calculateTotal, this);
        },

        onSearch: function (oEvent) {
            var sVal = oEvent.getParameter("newValue");
            var oFilter1 = new Filter("ProductName", FilterOperator.Contains, sVal);
            var oFilter2 = new Filter("QuantityPerUnit", FilterOperator.Contains, sVal);
            var oFilter3 = new Filter("CategoryID", FilterOperator.EQ, Number(sVal));
            var aFilter = [oFilter1, oFilter2, oFilter3];
            var aFilters = new Filter({
                filters: aFilter,
                and: false
            })

            this.getView().byId("idTable").getBinding("items").filter(aFilters);
        },

        onChangeLanguage: function (oEvent) {
            var sLang = oEvent.getSource().getSelectedKey(); // "en" or "es"a


            // Change language globally
            sap.ui.getCore().getConfiguration().setLanguage(sLang);



            // // Refresh model (important)
            var oModel = new sap.ui.model.resource.ResourceModel({
                bundleName: "com.excnorthwindproject.excnorthwindproject.i18n.i18n",
                bundleLocale: sLang
            });

            this.getView().setModel(oModel, "i18n");
            variable.oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            let oDefaultModel = this.getView().getModel();
            oDefaultModel.refresh(true);
        },

        onItemSelect: function (oEvent) {
            debugger;

            var oItem = oEvent.getParameter("listItem"); // correct for sap.m.Table
            var oContext = oItem.getBindingContext();

            var sSupplierID = oContext.getProperty("SupplierID");

            this.oRouter.navTo("SupplierDetail", {
                SupplierID: encodeURIComponent(sSupplierID)
            });
        },
        onFilter: function (oEvent) {
            let oFilter1,
                oFilter2;
            debugger;
            let aFilterControl = oEvent.getParameter("selectionSet");
            let aControlObjects = aFilterControl.map((oControl) => {
                debugger;
                let sPath = oControl.getName();
                let aValue = oControl.getSelectedKeys();
                let sValue = aValue[0];
                if (sPath === "ProductName" && sValue) {
                    oFilter1 = new Filter(sPath, FilterOperator.Contains, sValue);
                    return oFilter1;
                } else if (sPath === "CategoryID" && sValue) {
                    oFilter2 = new Filter(sPath, FilterOperator.EQ, Number(sValue));
                    return oFilter2;
                } else {
                    return null;
                }

            }).filter(Boolean);
            console.log(aControlObjects);
            let aFilters = new Filter({
                filters: aControlObjects,
                and: false
            })
            this.getView().byId("idTable").getBinding("items").filter(aFilters);
            // 	var aTableFilters = this.byId("myFilterBar").getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
            // 	var oControl = oFilterGroupItem.getControl(),
            // 		aSelectedKeys = oControl.getSelectedKeys(),
            // 		aFilters = aSelectedKeys.map(function (sSelectedKey) {
            //             debugger;
            //             if(oFilterGroupItem.getName()==="ProductName"){
            //                 return new Filter({
            // 				path: oFilterGroupItem.getName(),
            // 				operator: FilterOperator.Contains,
            // 				value1: sSelectedKey
            // 			});
            //             }else{
            //                 return new Filter({
            // 				path: oFilterGroupItem.getName(),
            // 				operator: FilterOperator.Contains,
            // 				value1: Number(sSelectedKey)
            // 			});
            //             }

            // 		});

            // 	if (aSelectedKeys.length > 0) {
            // 		aResult.push(new Filter({
            // 			filters: aFilters,
            // 			and: false
            // 		}));
            // 	}

            // 	return aResult;
            // }, []);

            // this.byId("idTable").getBinding("items").filter(aTableFilters);
            // this.byId("idTable").setShowOverlay(false);

        },
        calculateTotal: function () {
            var oTable = this.byId("idTable");
            var oBinding = oTable.getBinding("items");

            if (!oBinding) {
                return;
            }

            var aContexts = oBinding.getCurrentContexts();

            var priceTotal = 0;
            var stockTotal = 0;
            var orderTotal = 0;

            aContexts.forEach(function (oContext) {
                var oData = oContext.getObject();

                priceTotal += Number(oData.UnitPrice || 0);
                stockTotal += Number(oData.UnitsInStock || 0);
                orderTotal += Number(oData.UnitsOnOrder || 0);
            });

            this.byId("priceTotal").setText("Price: " + priceTotal.toFixed(2));
            this.byId("stockTotal").setText("In Stock: " + stockTotal);
            this.byId("orderTotal").setText("On Order: " + orderTotal);
        }
    });
});