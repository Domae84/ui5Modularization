sap.ui.define([
	"parent/Parent/util/BaseComponent",
	"sap/ui/Device",
	"parent/Parent/model/models"
], function (BaseComponent, Device, models) {
	"use strict";

	return BaseComponent.extend("parent.Parent.Component", {

		metadata: {
			manifest: "json"
		},

		eventMappings: {
			childA: [{
				name: "toChildA",
				route: "ChildA",
				componentTargetInfo: {
					ChildA: {
						route: "ChildA",
						parameters: {
							id: "ObjectNr"
						}
					}
				}
			}],
			childB: [{
				name: "toChildB",
				route: "ChildB",
				componentTargetInfo: {
					ChildB: {
						route: "ChildB",
						parameters: {
							id: "ObjectNr"
						}
					}
				}
			}]
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the init function of the parent
			BaseComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});