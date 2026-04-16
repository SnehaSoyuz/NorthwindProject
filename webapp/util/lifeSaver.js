sap.ui.define([

], function(){

    return {
getStatusText: function (value) {
    return value ? "Discontinued" : "Available";
},        

getStatusState: function (value) {
    return value ? "Error" : "Success";
}
}
});