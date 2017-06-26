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
			},
			activityId: {
				type: String,
				readOnly: true,
				value: function () {
					return 'vcard-view-activity-' + Math.random();
				}
			},
			blogsId: {
				type: String,
				readOnly: true,
				value: function () {
					return 'vcard-view-blogs-' + Math.random();
				}
			},
			forenId: {
				type: String,
				readOnly: true,
				value: function () {
					return 'vcard-view-foren-' + Math.random();
				}
			},
			wikisId: {
				type: String,
				readOnly: true,
				value: function () {
					return 'vcard-view-wikis-' + Math.random();
				}
			},
			communitesId: {
				type: String,
				readOnly: true,
				value: function () {
					return 'vcard-view-communites-' + Math.random();
				}
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

		_getLang: function (data) {
			switch (data) {
			case 'de':
				return 'Deutsch';
			case 'en':
				return 'Englisch';
			}
		},

		_getCurrentTimeInZone: function (data) {
			var dt = new timezoneJS.Date(Date.now());
			return dt.toString('HH:mm Z', data);
		},

		_showActivities: function () {
			this._showDiv(this.activityId, [this.blogsId, this.forenId, this.wikisId, this.communitesId]);
		},

		_showBlogs: function () {
			this._showDiv(this.blogsId, [this.activityId, this.forenId, this.wikisId, this.communitesId]);
		},

		_showForen: function () {
			this._showDiv(this.forenId, [this.activityId, this.blogsId, this.wikisId, this.communitesId]);
		},

		_showWikis: function () {
			this._showDiv(this.wikisId, [this.activityId, this.forenId, this.blogsId, this.communitesId]);
		},

		_showCommunities: function () {
			this._showDiv(this.communitesId, [this.activityId, this.forenId, this.wikisId, this.blogsId]);
		},

		_showDiv: function (show, hide) {
			document.getElementById(show).style.display = 'block';
			hide.forEach(function (e) {
				document.getElementById(e).style.display = 'none';
			});
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
