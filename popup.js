const delay = document.getElementById('delayInput');
const start = document.getElementById('start');
document.getElementById('start').addEventListener('click', () => {
	if (document.location.href != 'https://play.typeracer.com') {
		return;
	}
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var tab = tabs[0];
		console.log(tab.url, tab.title);
		chrome.tabs.getSelected(null, function (tab) {
			chrome.tabs.sendMessage(tab.id, { delay: delay.value }, function (msg) {
				start.innerText = 'Running';
				start.disabled = true;
			});
		});
	});
});

chrome.runtime.onMessage.addListener((msg, sender) => {
	start.innerText = 'Start';
	start.disabled = false;
});
