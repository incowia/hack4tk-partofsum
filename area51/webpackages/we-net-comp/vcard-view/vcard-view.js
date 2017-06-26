(function () {

	'use strict';

	CubxPolymer({
		is: 'vcard-view',
		properties: {
			isReady: {
				type: Boolean,
				value: false
			},
			printData: {
				type: Object,
				value: {}
			}
		},

		created: function () {},

		ready: function () {
			this.isReady = true;
		},

		attached: function () {},

		cubxReady: function () {},

		_isDataAvailable: function (data) {
			return data !== undefined && data !== null && (Array.isArray(data) ? data.length > 0 : true);
		},
		
		_getImageUrl: function (data) {
			return 'http://localhost:8080/user/' + data;
		},

		modelConfigChanged: function (newValue) {},

		modelUseridChanged: function (newValue) {
			if (!this.isReady) {
				return;
			}
			// get new data
			$.get('http://localhost:8080/we_connect/vcard/' + newValue)
			.then(function (res) {
				this.printData = res;
			}
				.bind(this));
		}
	});
}
	());
