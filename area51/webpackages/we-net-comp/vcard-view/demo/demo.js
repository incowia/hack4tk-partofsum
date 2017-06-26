function triggerView() {
	var useridElement = document.querySelector('#userid');
	var configElement = document.querySelector('#config');
	var userid;
	try {
		userid = JSON.parse(useridElement.value);
	} catch (err) {
		alert('UserID does not contain valid json.');
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
	var view = document.querySelector('vcard-view');
	view.setConfig(config);
	view.setUserid(userid);
}

document.addEventListener('cifReady', function () {
	document.querySelector('button').disabled = false;
});
