chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({ url: 'https://sebastian-gomez.com' });
});