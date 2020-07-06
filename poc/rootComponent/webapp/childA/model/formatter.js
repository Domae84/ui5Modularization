sap.ui.define(["smsHub/model/models"], function (models) {
	"use strict";

	return {

		formatRemainingAmountToFixed: function (fValue) {
			try {
				if (fValue == "") {
					return "-"
				} else {
					fValue = parseFloat(fValue).toFixed(2);
					return fValue.replace(".", ",");
					å
				}

			} catch (err) {
				return "";
			}
		},

		formatOffenceDetailViewEntries: function (sValue) {
			try {
				if (sValue === "") {
					return "-";
				} else {
					return sValue;
				}
			} catch (err) {
				return "";
			}
		},

		dateFormatter: function (UnixDate) {
			if (UnixDate) {
				let dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd.MM.yyyy HH:mm:ss"
				});
				let newDate = dateFormat.format(new Date(parseInt(UnixDate, 10) * 1000));
				return newDate;
			}
		}
	};
});