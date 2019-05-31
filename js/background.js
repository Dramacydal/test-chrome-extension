var pendingTabId = null;
var data = [];

function DoSomething(info, tab) {
	chrome.tabs.query({}, function (tabs) {
		data = [];
		for (var i = 0; i < tabs.length; ++i) {
			data.push([tabs[i].title, tabs[i].url]);
		}

		chrome.tabs.create({}, function (tab) {
			console.log("New tab:" + tab.id);
			pendingTabId = tab.id;
		});
	});
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete' && tabId === pendingTabId) {
		chrome.tabs.sendMessage(tab.id, {"action": "do_something", "data": data});
		pendingTabId = null;
	}
});

chrome.contextMenus.create({
	"title": "Do something",
	"contexts": [ "page" ],
	"onclick": DoSomething
});
