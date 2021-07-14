class TimerView {
    constructor(timerModel) {
        this.model = timerModel;
        this.dom;
    }

    initialize() {
        this.dom = new TimerDom();
    }

    addTimerContainer() {
        document.body.appendChild(this.dom.makeTimerContainerElement());
    }

    removeTimerContainer() {
        const element = this.dom.getTimerElement();
        if (element) element.remove();
    }

    getTimerElement() {
        return this.dom.getTimerElement();
    }

    addTimerSettingScreen(isDisplayed = true) {
        const timeSettingScreenElement = this.dom.makeTimeSettingScreenElement(this.model.selectedMinutes);
        isDisplayed ? this.show(timeSettingScreenElement) : this.hide(timeSettingScreenElement);
        this.dom.getTimerContainarElement().appendChild(timeSettingScreenElement);
    }

    addTimerScreen(isDisplayed = true) {
        const timerScreenElement = this.dom.makeTimerScreenElement();
        isDisplayed ? this.show(timerScreenElement) : this.hide(timerScreenElement);
        this.dom.getTimerContainarElement().appendChild(timerScreenElement);
        this.dom.readTimerTextElement();
        this.updateTimerScreen();
    }

    hideTimeSettingScreen() {
        const timeSettingScreenElement = document.getElementById(TimerModel.ID_NAME_TIME_SETTING_SCREEN);
        this.hide(timeSettingScreenElement);
    }

    showTimerScreen() {
        const element = document.getElementById(TimerModel.ID_NAME_TIMER_SCREEN);
        this.show(element);
    }

    hide(element) {
        element.style.display = "none";
    }

    show(element) {
        element.style.display = "inline-block";
    }

    updateTimerScreen() {
        const effect = this.model.isLittleTimeLeft() ? TimerModel.CLASS_NAME_ALERT_EFFECT_OF_TIMER_TEXT : TimerModel.CLASS_NAME_NORMAL_EFFECT_OF_TIMER_TEXT;
        this.dom.updateTimerText(effect, this.model.zeroPaddingRemainingMinutes(), this.model.zeroPaddingRemainingSeconds(), this.model.zeroPaddingRemainingMilliMinutes());
    }

    getSettingMinutesElement() {
        return this.dom.getSettingMinutesElement();
    }

    getStartButtonElement() {
        return this.dom.getStartButtonElement();
    }

    getSettingsButtonElement() {
        return this.dom.getSettingsButtonElement();
    }
}
