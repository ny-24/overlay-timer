class TimerController {
    constructor() {
        this.model;
        this.view;
        this.eventListeners = {};
    }

    initialize() {
        this.model = new TimerModel();
        this.model.initialize();
        this.view = new TimerView(this.model);
        this.view.initialize();
        this.eventListeners[TimerModel.EVENT_NAME_CLICK_TIMER_START_BUTTON] = this.startTimer.bind(this);
        this.eventListeners[TimerModel.EVENT_NAME_CLICK_SETTINGS_BUTTON] = this.displaySettings.bind(this);
        this.eventListeners[TimerModel.EVENT_NAME_CLICK_CLOSE_BUTTON] = this.destroy.bind(this);
        this.eventListeners[TimerModel.EVENT_NAME_SELECTED_TIME_REMAINING] = this.updateTimeRemaining.bind(this);
        this.eventListeners[TimerModel.EVENT_NAME_UPDATED_REMAINING_TIME] = this.updateTimer.bind(this);
        this.eventListeners[TimerModel.EVENT_NAME_FINISH_COUNTDOWN] = this.finishTimer.bind(this);
    }

    reset() {
        this.model.clearTimerInterval();
        this.removeEventListeners();
        this.view.removeTimerContainer();

        this.view.addTimerContainer();
        this.view.addTimerScreen(false);
        this.view.addTimerSettingScreen();
        this.addEventListeners();
    }

    destroy() {
        this.model.clearTimerInterval();
        this.removeEventListeners();
        this.view.removeTimerContainer();
    }

    addEventListeners() {
        this.view.getStartButtonElement().addEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_TIMER_START_BUTTON]);
        this.view.getSettingsButtonElement().addEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_SETTINGS_BUTTON]);
        this.view.getSettingMinutesElement().addEventListener("change", this.eventListeners[TimerModel.EVENT_NAME_SELECTED_TIME_REMAINING]);

        const closeButtonElements = document.getElementsByClassName(TimerModel.CLASS_NAME_CLOSE_BUTTON);
        const elements = Array.from(closeButtonElements);
        elements.forEach(x => x.addEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_CLOSE_BUTTON]));

        this.addEventListener(TimerModel.EVENT_NAME_INTERVAL_COUNTDOWN);
        this.addEventListener(TimerModel.EVENT_NAME_UPDATED_REMAINING_TIME);
        this.addEventListener(TimerModel.EVENT_NAME_FINISH_COUNTDOWN);
    }

    addEventListener(eventName) {
        this.view.getTimerElement().addEventListener(eventName, this.eventListeners[eventName]);
    }

    removeEventListeners() {
        if (this.view.getStartButtonElement()) this.view.getStartButtonElement().removeEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_TIMER_START_BUTTON]);
        if (this.view.getSettingsButtonElement()) this.view.getSettingsButtonElement().removeEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_SETTINGS_BUTTON]);
        if (this.view.getSettingMinutesElement()) this.view.getSettingMinutesElement().removeEventListener("change", this.eventListeners[TimerModel.EVENT_NAME_SELECTED_TIME_REMAINING]);

        const closeButtonElements = document.getElementsByClassName(TimerModel.CLASS_NAME_CLOSE_BUTTON);
        const elements = Array.from(closeButtonElements);
        elements.forEach(x => x.removeEventListener("click", this.eventListeners[TimerModel.EVENT_NAME_CLICK_CLOSE_BUTTON]));

        this.removeEventListener(TimerModel.EVENT_NAME_UPDATED_REMAINING_TIME);
        this.removeEventListener(TimerModel.EVENT_NAME_FINISH_COUNTDOWN);
    }

    removeEventListener(eventName) {
        if (this.view.getTimerElement()) this.view.getTimerElement().removeEventListener(eventName, this.eventListeners[eventName]);
    }

    startTimer() {
        this.view.hideTimeSettingScreen();
        this.view.showTimerScreen();
        this.model.setTimerInterval(this.view.getSettingMinutesElement().value);
    }

    updateTimer() {
        this.view.updateTimerScreen();
    }

    finishTimer() {
        this.model.clearTimerInterval();
        this.model.setRemainingTime();
    }

    displaySettings() {
        this.reset();
    }

    updateTimeRemaining() {
        const selectedMinutes = this.view.getSettingMinutesElement().value;
        this.model.selectedMinutes = selectedMinutes;
        this.model.setRemainingTime(selectedMinutes);
    }
}
