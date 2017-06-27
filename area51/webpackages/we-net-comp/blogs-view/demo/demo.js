function triggerView() {
	var blogsElement = document.querySelector('#blogs');
	var configElement = document.querySelector('#config');
	var blogs;
	try {
		blogs = JSON.parse(blogsElement.value);
	} catch (err) {
		alert('Blogs does not contain valid json.');
		return;
	}
	var config;
	try {
		config = JSON.parse(configElement.value);
	} catch (err) {
		alert('Config does not contain valid json.');
		return;
	}
	// transfer data to component
	var view = document.querySelector('blogs-view');
	view.setConfig(config);
	view.setBlogs(blogs);
}

document.addEventListener('cifReady', function () {
	document.querySelector('button').disabled = false;
});
