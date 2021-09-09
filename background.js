chrome.runtime.onInstalled.addListener(function() {
    chrome.browserAction.setBadgeText({
        text: "uc"
    });
});``