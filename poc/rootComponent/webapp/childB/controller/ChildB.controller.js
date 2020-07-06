sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("parent.Parent.childB.controller.ChildB", {
		onInit: function () {
			console.log("childB");
		}
	});
});