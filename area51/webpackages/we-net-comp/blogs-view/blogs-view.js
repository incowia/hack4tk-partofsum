(function () {

	'use strict';

	CubxPolymer({
		is: 'blogs-view',
		properties: {
			isReady: {
				type: Boolean,
				value: false
			},
			printData: {
				type: Array,
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
		
		_formatDate: function (data) {
			if (!this.isReady) {
				return '';
			}
			return new Date(data).toLocaleString();
		},
		
		_showEntries: function (evt) {
			if (!this.isReady) {
				return;
			}
			var elem = evt.target.parentElement.getElementsByTagName('div')[0];
			if (elem.style.display === 'none') {
				elem.style.display = 'block';
			} else {
				elem.style.display = 'none';
			}
		},

		modelConfigChanged: function (newValue) {},

		modelBlogsChanged: function (newValue) {
			if (!this.isReady) {
				return;
			}
			if (!this._isDataAvailable(newValue)) {
				return;
			}
			var limitBlogs = newValue.length;
			var limitEntries = -1;
			var target = '_self';
			if (this.getConfig()) {
				limitBlogs = this.getConfig().showEntries ? this.getConfig().showEntries : newValue.length;
				limitEntries = this.getConfig().showBlogEntries ? this.getConfig().showBlogEntries : -1;
				target = this.getConfig().linkTarget ? this.getConfig().linkTarget : '_self';
			}
			if (limitBlogs > newValue.length) {
				limitBlogs = newValue.length;
			}
			var promises = [];
			for (var i = 0; i < limitBlogs; i++) {
				promises.push($.get('http://localhost:8080/we_connect/blog/' + newValue[i]).then(function (res) {
					return res;
				}));
			}
			$.when.apply(null, promises).then(function () {
				var responses = [].slice.apply(arguments);
				if (limitEntries < 0) {
					this.printData = responses.map(function (e) {
						e.target = target;
						return e;
					});
					return;
				}
				var blogs = [];
				responses.forEach(function (e) {
					var blog = {
						name: e.name,
						link: e.link,
						target: target
					};
					if (e.entries.length > limitEntries) {
						blog.entries = [];
						for (var j = 0; j < limitEntries; j++) {
							blog.entries.push(e.entries[j]);
						}
					} else {
						blog.entries = e.entries;
					}
					blogs.push(blog);
				});
				this.printData = blogs;
			}.bind(this));
		}
	});
}
	());
