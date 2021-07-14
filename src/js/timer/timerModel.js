class TimerModel {
    static get ID_NAME_TIMER() { return "overlay_timer"; }
    static get ID_NAME_TIME_SETTING_SCREEN() { return "time_setting_screen"; }
    static get ID_NAME_TIMER_SCREEN() { return "timer_screen"; }
    static get ID_NAME_TIMER_TEXT() { return "timer_text"; }
    static get ID_NAME_SETTING_HOUR() { return "setting_hour"; }
    static get ID_NAME_SETTING_MINUTES() { return "setting_minutes"; }
    static get ID_NAME_START_TIMER_BUTTON() { return "start_timer_button"; }
    static get ID_NAME_SETTINGS_BUTTON() { return "settings_button"; }
    static get CLASS_NAME_CLOSE_BUTTON() { return "close_button"; }
    static get ID_NAME_TIMER_CONTAINAR() { return "timer_containar"; }
    static get CLASS_NAME_MINUTES_AND_SECONDS() { return "minutes_and_seconds"; }
    static get CLASS_NAME_ALERT_EFFECT_OF_TIMER_TEXT() { return "alert_effect_of_timer_text"; }
    static get CLASS_NAME_NORMAL_EFFECT_OF_TIMER_TEXT() { return "normal_effect_of_timer_text"; }
    static get ID_NAME_DELIMITER_OF_MINUTES_AND_SECONDS() { return "delimiter_of_minutes_and_seconds"; }
    static get ID_NAME_DELIMITER_OF_MILLISECONDS() { return "delimiter_of_milliseconds"; }
    static get ID_NAME_MILLISECONDS() { return "milliseconds"; }
    static get EVENT_NAME_CLICK_TIMER_START_BUTTON() { return "event_name_click_timer_start_button"; }
    static get EVENT_NAME_CLICK_SETTINGS_BUTTON() { return "event_name_click_settings_button"; }
    static get EVENT_NAME_FINISH_COUNTDOWN() { return "event_name_finish_coountdown"; }
    static get EVENT_NAME_CLICK_CLOSE_BUTTON() { return "event_name_click_close_button"; }
    static get EVENT_NAME_SELECTED_TIME_REMAINING() { return "event_name_selected_time_remaining"; }
    static get EVENT_NAME_UPDATED_REMAINING_TIME() { return "event_name_updated_remaining_time"; }
    static get ONE_DAY() { return 24 * 60 * 60 * 1000; }
    static get SETTABLE_MINUTES() { return [1, 3, 5, 15, 30, 45, 60]; }

    constructor() {
        this.timerId;
        this.finishTime;
        this.remainingMinutes;
        this.remainingSeconds;
        this.remainingMilliSeconds;
        this.selectedMinutes;
    }

    initialize() {
        this.remainingMinutes = 30;
        this.remainingSeconds = 0;
        this.remainingMilliSeconds = 0;
        this.selectedMinutes = 30;
    }

    setRemainingTime(remainingMinutes = 0, remainingSeconds = 0, remainingMilliSeconds = 0) {
        this.remainingMinutes = remainingMinutes;
        this.remainingSeconds = remainingSeconds;
        this.remainingMilliSeconds = remainingMilliSeconds;
        this.dispatchEvent(TimerModel.EVENT_NAME_UPDATED_REMAINING_TIME);
    }

    getTimerElement() {
        return document.getElementById(TimerModel.ID_NAME_TIMER);
    }

    eventFinishCountdown() {
        this.dispatchEvent(TimerModel.EVENT_NAME_FINISH_COUNTDOWN);
    }

    dispatchEvent(eventName) {
        this.getTimerElement().dispatchEvent(new CustomEvent(eventName));
    }

    setTimerInterval(settingMinutes) {
        this.finishTime = new Date(+new Date() + (settingMinutes * 60 * 1000) + (1 * 1000));
        this.timerId = setInterval(this.countdown.bind(this), 10);
    }

    clearTimerInterval() {
        if (this.timerId) clearInterval(this.timerId);
    }

    countdown() {
        const untilFinishTime = this.finishTime - new Date();
        const oneDay = TimerModel.ONE_DAY;
        const h = Math.floor((untilFinishTime % oneDay) / (60 * 60 * 1000));
        const m = Math.floor((untilFinishTime % oneDay) / (60 * 1000)) % 60;
        const s = Math.floor((untilFinishTime % oneDay) / 1000) % 60 % 60;
        const ms = Math.floor((untilFinishTime) % 1000);

        this.setRemainingTime((h < 1) ? m : 60, s, ms);

        if (this.isCounddownFinish(h, m, s)) this.eventFinishCountdown();
    }

    isLittleTimeLeft() {
        return this.remainingMinutes <= 4;
    }

    isCounddownFinish(hours, minutes, seconds) {
        return (hours <= 0 && minutes <= 0 && seconds <= 0);
    }

    zeroPaddingRemainingSeconds() {
        return (`00${this.remainingSeconds}`.slice(-2));
    }

    zeroPaddingRemainingMinutes() {
        return (`00${this.remainingMinutes}`.slice(-2));
    }

    zeroPaddingRemainingMilliMinutes() {
        return (`000${this.remainingMilliSeconds}`.slice(-3).slice(0,2));
    }
}
