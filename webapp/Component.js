sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "project1module/model/models",
     "sap/ui/core/util/MockServer",
     "sap/ui/model/odata/v2/ODataModel",
     "sap/ui/model/BindingMode"
], function (UIComponent, Device, models, MockServer, ODataModel, BindingMode) {
	"use strict";

	return UIComponent.extend("project1module.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            
   //initialize a mockserver
            this.oMockServer = new MockServer({
                rootUri: "Northwind.Northwind.svc/"
            });

            //simulate the test data
			var sMockdataUrl = jQuery.sap.getModulePath("project1module.localService");
			var sMetadataUrl = sMockdataUrl + "/metadata.xml";
			this.oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sMockdataUrl,
				aEntitySetsNames: [
					"Products","Currency"
				]
			});
            this.oMockServer.start();

            //define the model for the data, using the mockserver
            this.oModel = new ODataModel("Northwind.Northwind.svc");

            //default Binding Mode set to TwoWay as condition to use TextInEditModeSource
            this.oModel.setDefaultBindingMode(BindingMode.TwoWay);
            this.setModel(this.oModel);
		}
	});
});
