(function () {

	'use strict';

	CubxPolymer({
		is: 'blogentry-view',
		properties: {
			isReady: {
				type: Boolean,
				value: false
			}
		},

		created: function () {},

		ready: function () {
			this.isReady = true;
		},

		attached: function () {},

		cubxReady: function () {},

		modelConfigChanged: function (newValue) {
			if (!this.isReady) {
				return;
			}
			// TODO
		},

		modelUseridChanged: function (newValue) {
			if (!this.isReady) {
				return;
			}
			// TODO
		}
	});
}
	());
