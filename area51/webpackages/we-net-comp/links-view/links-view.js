(function () {

	'use strict';

	CubxPolymer({
		is: 'links-view',
		properties: {
			isReady: {
				type: Boolean,
				value: false
			},
			printData: {
				type: Object,
				value: null
			}
		},

		created: function () {},

		ready: function () {
			this.isReady = true;
		},

		attached: function () {},

		cubxReady: function () {},

		_isDataAvailable: function (data) {
			if (!this.isReady) {
				return false;
			}
			return data !== undefined && data !== null && (Array.isArray(data) ? data.length > 0 : true);
		},

		modelConfigChanged: function (newValue) {},

		modelLinksChanged: function (newValue) {
			if (!this.isReady) {
				return;
			}
			var target = (this.getConfig() && this.getConfig().linkTarget) ? this.getConfig().linkTarget : '_self';
			this.printData = newValue.map(function (e) {
					return {
						name: e.name,
						link: e.link,
						target: target
					};
				});
		}
	});
}
	());
