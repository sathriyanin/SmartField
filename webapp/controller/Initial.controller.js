sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("project1module.controller.Initial", {
			onInit: function () {
                this.getView().bindElement("/Products('4711')");
			}
		});
	});
