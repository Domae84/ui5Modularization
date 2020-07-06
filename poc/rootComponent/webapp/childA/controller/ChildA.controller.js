sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("parent.Parent.childA.controller.ChildA", {
		onInit: function () {
			console.log("childA");
		}
	});
});