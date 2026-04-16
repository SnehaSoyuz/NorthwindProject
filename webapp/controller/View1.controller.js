sap.ui.define([
    "com/excnorthwindproject/excnorthwindproject/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (BaseController, Filter, FilterOperator) => {
    "use strict";

    return BaseController.extend("com.excnorthwindproject.excnorthwindproject.controller.View1", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
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
            // var oModel = new sap.ui.model.resource.ResourceModel({
            //     bundleName: "com.excnorthwindproject.excnorthwindproject.i18n.i18n",
            //     bundleLocale: sLang
            // });

            // this.getView().setModel(oModel, "i18n");
        },

        onItemSelect: function (oEvent) {
            debugger;
            this.oRouter.navTo("SupplierDetail")
        },
        onFilter : function(oEvent){
            let oFilter1,
                oFilter2;
            debugger;
            let aFilterControl = oEvent.getParameter("selectionSet");
            let aControlObjects = aFilterControl.map((oControl)=> {
                debugger;
                let sPath = oControl.getName();
                let aValue = oControl.getSelectedKeys();
                let sValue = aValue[0];
                if(sPath=== "ProductName" && sValue){
                    oFilter1 = new Filter(sPath, FilterOperator.Contains, sValue);
                    return oFilter1;
                }else if(sPath==="CategoryID" && sValue)
                {
                    oFilter2 = new Filter(sPath, FilterOperator.EQ, Number(sValue));
                    return oFilter2;
                }else{
                   return null;
                }

            }).filter(Boolean);
            console.log(aControlObjects);
            let aFilters = new Filter({
                filters: aControlObjects,
                and : false
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

        }
    });
});