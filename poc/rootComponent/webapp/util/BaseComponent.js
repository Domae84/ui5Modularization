sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/base/util/deepClone"
], function (UIComponent, deepClone) {
	"use strict";

	return UIComponent.extend("parent.Parent.util.BaseComponent", {
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			let oRouter = this.getRouter();
			oRouter.getViews().attachCreated(this._processEventMappingOnTargetCreated, this);
			oRouter.initialize();
		},
		/**
		 * This function is attached to the 'created' event from the target cache of a router.
		 *
		 * Once a component target is created, this function is called. Within this function,
		 * the 'eventMappings' property which is defined in the subclass component is processed.
		 * To each of the events defined within a target under 'eventMappings', a handler is
		 * attached. The handler calls the 'navTo' method on the current router by providing
		 * the route information and the information for the component targets within this route.
		 *
		 * With this mechanism, a nested component can fire specific events to inform the parent
		 * component that:
		 * <ul>
		 * <li>A navigation needs to be done with the router in the parent component.</li>
		 * <li>The event needs to be forwarded along the parent chain with the same parameter</li>
		 * </ul>
		 *
		 * @private
		 * @param {object} oEvent The event object which is provided by the 'created' event from
		 *   router's target cache
		 */
		_processEventMappingOnTargetCreated: function (oEvent) {
			if (!this.eventMappings) {
				return;
			}

			let sType = oEvent.getParameter("type");
			let oObject = oEvent.getParameter("object");
			let oOptions = oEvent.getParameter("options");
			let aEvents;

			function processComponentTargetInfo(oComponentTargetInfo, oEvent) {
				Object.keys(oComponentTargetInfo).forEach(function (sTargetName) {
					let oInfo = oComponentTargetInfo[sTargetName];

					if (oInfo.parameters) {
						Object.keys(oInfo.parameters).forEach(function (sName) {
							let sParamName = oInfo.parameters[sName];
							let sEventValue = oEvent.getParameter(sParamName);

							// expand the parameter mapping with the parameter value from
							// the event
							oInfo.parameters[sName] = sEventValue;
						});
					}

					if (oInfo.componentTargetInfo) {
						processComponentTargetInfo(oInfo.componentTargetInfo, oEvent);
					}
				});
			}

			if (sType === "Component") {
				aEvents = this.eventMappings[oOptions.usage];
				if (Array.isArray(aEvents)) {
					aEvents.forEach(function (oEventMapping) {
						oObject.attachEvent(oEventMapping.name, function (oEvent) {
							let oComponentTargetInfo;
							if (oEventMapping.route) { // route information defined, call 'navTo'
								if (oEventMapping.componentTargetInfo) {
									// if there's information for component target defined, replace the
									// event parameter mapping with the value from the event object
									oComponentTargetInfo = deepClone(oEventMapping.componentTargetInfo);
									processComponentTargetInfo(oComponentTargetInfo, oEvent);
								}

								this.getRouter().navTo(oEventMapping.route, {}, oComponentTargetInfo);
							} else if (oEventMapping.forward) { // event should be forwarded with the same parameters
								this.fireEvent(oEventMapping.forward, oEvent.getParameters());
							}
						}.bind(this));
					});
				}
			}
		}
	});
});