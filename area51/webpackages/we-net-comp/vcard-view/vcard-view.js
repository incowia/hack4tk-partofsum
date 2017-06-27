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
				value: null
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
			if (!this.isReady) {
				return false;
			}
			return data !== undefined && data !== null && (Array.isArray(data) ? data.length > 0 : true);
		},

		_getImageUrl: function (data) {
			if (!this.isReady) {
				return '';
			}
			return 'http://localhost:8080/user/' + data;
		},

		_getLang: function (data) {
			if (!this.isReady) {
				return '';
			}
			switch (data) {
			case 'de':
				return 'Deutsch';
			case 'en':
				return 'Englisch';
			}
		},

		_getCurrentTimeInZone: function (data) {
			if (!this.isReady) {
				return '';
			}
			var dt = new timezoneJS.Date(Date.now());
			return dt.toString('HH:mm Z', data);
		},

		_showBlogs: function () {
			if (!this.isReady) {
				return;
			}
			var view = document.getElementById(this.blogsId).getElementsByTagName('blogs-view')[0];
			view.setBlogs(this.printData.socialMedia.blogs);
			this._showDiv(this.blogsId, [this.forenId, this.wikisId, this.communitesId]);
		},

		_showForen: function () {
			if (!this.isReady) {
				return;
			}
			var view = document.getElementById(this.forenId).getElementsByTagName('links-view')[0];
			view.setLinks(this.printData.socialMedia.foren);
			this._showDiv(this.forenId, [this.blogsId, this.wikisId, this.communitesId]);
		},

		_showWikis: function () {
			if (!this.isReady) {
				return;
			}
			var view = document.getElementById(this.wikisId).getElementsByTagName('links-view')[0];
			view.setLinks(this.printData.socialMedia.wikis);
			this._showDiv(this.wikisId, [this.forenId, this.blogsId, this.communitesId]);
		},

		_showCommunities: function () {
			if (!this.isReady) {
				return;
			}
			var view = document.getElementById(this.communitesId).getElementsByTagName('links-view')[0];
			view.setLinks(this.printData.socialMedia.communities);
			this._showDiv(this.communitesId, [this.forenId, this.wikisId, this.blogsId]);
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
