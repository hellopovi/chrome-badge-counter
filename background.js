function updateCounter(increase) {
  chrome.storage.sync.get(['counter'], function (data) {
    const counter = Number(data.counter) || 0;
    const updatedCounter = increase === '+' ? counter + 1 : counter - 1;
    chrome.storage.sync.set({ counter: updatedCounter }, function () {
      const badgeText = updatedCounter.toString();
      chrome.browserAction.setBadgeText({ text: badgeText });
    });
  });
}

const MENU_ITEMS = ['Increase counter (+)', 'Decrease counter (-)'];

chrome.contextMenus.onClicked.addListener(function (menuItemData) {
  if (menuItemData.menuItemId === MENU_ITEMS[0]) {
    updateCounter('+');
  }
  if (menuItemData.menuItemId === MENU_ITEMS[1]) {
    updateCounter('-');
  }
});

function createContextMenus() {
  MENU_ITEMS.forEach(function (commandName) {
    chrome.contextMenus.create({
      title: commandName,
      type: 'normal',
      id: commandName,
      contexts: ['all']
    });
  });
}

function createBadgeText() {
  chrome.storage.sync.get(['counter'], function (data) {
    const { counter } = data;
    const badgeText = counter.toString() || '0';
    chrome.browserAction.setBadgeText({ text: badgeText });
  });
}

chrome.runtime.onInstalled.addListener(function () {
  createContextMenus();
  createBadgeText();
});
