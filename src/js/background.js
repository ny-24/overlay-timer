"use strict";

class Background {
  initialize() {
    this.addEventListeners();
  }

  addEventListeners() {
    chrome.browserAction.onClicked.addListener(() => { this.manageBrowserAction(); });
  }

  manageBrowserAction() {
    this.sendToContents(Event.SHOW_TIMER);
  }

  sendToContents(event) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { event: event }, null);
    });
  }
}

(function () {
  const background = new Background();
  background.initialize();
}());
