sap.ui.define([
	"parent/Parent/util/BaseComponent",
	"sap/ui/core/Component"
], function (BaseComponent, Component) {
	"use strict";

	return BaseComponent.extend("parent.Parent.childB.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the FLP and device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {
			BaseComponent.prototype.init.apply(this, arguments);

			const oParentComponent = Component.getOwnerComponentFor(this);
			if (!oParentComponent) {
				this.attachEvent("toChildB", function (oEvent) {
					let sHandyTicketNr = oEvent.getParameter("ObjectNr");
					this.getRouter().navTo("ChildB");
				}, this);
			}
		}

	});

});