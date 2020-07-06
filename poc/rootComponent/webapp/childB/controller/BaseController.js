/*global history */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("parent.Parent.controller.BaseController", {
		/** 
		 * Attaches the route matched event for a given controller instance and route to the onHandleRouteMatched function
		 * @param {object} controller instance
		 * @param {string} route name
		 */
		initHandleRouteMatchedFor: function (oController, sRoute) {
			oController._oRouter = sap.ui.core.UIComponent.getRouterFor(oController);
			oController._oRouter.getRoute(sRoute).attachMatched(oController.onHandleRouteMatched, oController);
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/** 
		 * Sets the given controller instance as current active controller
		 * @param {object} controller instance
		 */
		setActiveController: function (oController) {
			this._oActiveController = oController;
		},

		/** 
		 * Returns the current active controller instance
		 * @returns {object} controller instance
		 */
		getActiveController: function () {
			return this._oActiveController;
		}
	});

});