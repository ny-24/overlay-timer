class TimerDom {
    constructor() {
        this.timerTextElement;
    }

    makeMinutesHtml(selectedMinutes) {
        let minutesElement = `<div id="setting_timer_text"><select id=${TimerModel.ID_NAME_SETTING_MINUTES}>`;
        for (const value of TimerModel.SETTABLE_MINUTES) {
            const selectedAttribute = (value == selectedMinutes) ? "selected" : "";
            minutesElement += `<option ${selectedAttribute}>${value}</option>`;
        }
        minutesElement += "</select><span>分</span></div>";

        return minutesElement;
    }

    makeStartButtonHtml() {
        return `<button id="${TimerModel.ID_NAME_START_TIMER_BUTTON}">開始</button>`;
    }

    getStartButtonElement() {
        return document.getElementById(TimerModel.ID_NAME_START_TIMER_BUTTON);
    }

    getTimerElement() {
        return document.getElementById(TimerModel.ID_NAME_TIMER);
    }

    getTimerContainarElement() {
        return document.getElementById(TimerModel.ID_NAME_TIMER_CONTAINAR);
    }

    makeCloseButtonHtml() {
        return `<button class="${TimerModel.CLASS_NAME_CLOSE_BUTTON}">終了</button>`;
    }

    makeSettingsButtonHtml() {
        return `<button id="${TimerModel.ID_NAME_SETTINGS_BUTTON}">設定</button>`;
    }

    getSettingsButtonElement() {
        return document.getElementById(TimerModel.ID_NAME_SETTINGS_BUTTON);
    }

    makeTimerContainerElement() {
        const element = document.createElement("div");
        element.id = TimerModel.ID_NAME_TIMER;
        element.innerHTML = `<div id="${TimerModel.ID_NAME_TIMER_CONTAINAR}"></div>`;
        return element;
    }

    makeTimeSettingScreenElement(selectedMinutes) {
        const element = document.createElement("div");
        element.id = TimerModel.ID_NAME_TIME_SETTING_SCREEN;
        element.innerHTML = `${this.makeMinutesHtml(selectedMinutes)}<div>${this.makeStartButtonHtml()}${this.makeCloseButtonHtml()}</div>`;
        return element;
    }

    makeTimerScreenElement() {
        const element = document.createElement("div");
        element.id = TimerModel.ID_NAME_TIMER_SCREEN;
        const html = `<div id="${TimerModel.ID_NAME_TIMER_TEXT}"></div>`
            +`<div>${this.makeSettingsButtonHtml()}${this.makeCloseButtonHtml()}</div>`;
        element.innerHTML = html;

        return element;
    }

    getTimerTextElement() {
        return document.getElementById(TimerModel.ID_NAME_TIMER_TEXT);
    }

    updateTimerText(className, remainingMinutes, remainingSeconds, remainingMilliMinutes) {
        const element = this.timerTextElement;
        element.className = className;
        element.innerHTML = `<span class=${TimerModel.CLASS_NAME_MINUTES_AND_SECONDS}>${remainingMinutes}</span>`
            +`<span id=${TimerModel.ID_NAME_DELIMITER_OF_MINUTES_AND_SECONDS}>:</span>`
            +`<span class=${TimerModel.CLASS_NAME_MINUTES_AND_SECONDS}>${remainingSeconds}</span>`
            +`<span id=${TimerModel.ID_NAME_DELIMITER_OF_MILLISECONDS}>:</span>`
            +`<span id=${TimerModel.ID_NAME_MILLISECONDS}>${remainingMilliMinutes}</span>`;
    }

    getSettingMinutesElement() {
        return document.getElementById(TimerModel.ID_NAME_SETTING_MINUTES);
    }

    readTimerTextElement() {
        this.timerTextElement = this.getTimerTextElement();
    }
}
