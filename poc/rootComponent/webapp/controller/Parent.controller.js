sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("parent.Parent.controller.Parent", {
		onInit: function () {

		},

		toChildA: function () {
			this.getOwnerComponent().getRouter().navTo("ChildA");
		},

		toChildB: function () {
			this.getOwnerComponent().getRouter().navTo("ChildB");
		}
	});
});