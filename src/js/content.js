"use strict";

(function () {
  const timer = new Timer();
  timer.initialize();

  chrome.runtime.onMessage.addListener((message, sender, callback) => {
    if (message.event === Event.SHOW_TIMER) timer.reset();
  });
}());
