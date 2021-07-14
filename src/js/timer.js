"use strict";

class Timer {
  initialize() {
    this.TimerController = new TimerController();
    this.TimerController.initialize();
  }

  reset() {
    this.TimerController.reset();
  }

  destroy() {
    this.TimerController.destroy();
  }
}
