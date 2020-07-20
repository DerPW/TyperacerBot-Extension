const delay = document.getElementById('delayInput');
const start = document.getElementById('start');
document.getElementById('start').addEventListener('click', () => {
	if (document.location.href.includes('play.typeracer.com')) {
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

const version = document.getElementById('version');

window.onload = async () => {
	const res = await fetch(
		'https://api.github.com/repos/DerPW/TyperacerBot-Extension/releases'
	).then((res) => {
		return res.json();
	});
	res[0].created_at > res[1].created_at
		? (version.innerHTML = `<span class="mdl-chip__text">v${res[0].tag_name}</span>`)
		: (version.innerHTML = `<a class="mdl-chip__text" target="_blank" href='${res[0].html_url}'>Update now (${res[1].tag_name} -> ${res[0].tag_name})</a>`);
};
