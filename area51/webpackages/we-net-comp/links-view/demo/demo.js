function triggerView() {
	var linksElement = document.querySelector('#links');
	var configElement = document.querySelector('#config');
	var links;
	try {
		links = JSON.parse(linksElement.value);
	} catch (err) {
		alert('Links does not contain valid json.');
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
	var view = document.querySelector('links-view');
	view.setConfig(config);
	view.setLinks(links);
}

document.addEventListener('cifReady', function () {
	document.querySelector('button').disabled = false;
});
