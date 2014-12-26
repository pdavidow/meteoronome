Tick = function(beat, waitSeconds) {
    check(beat, Beat);
    check(waitSeconds, Matcher.nonNegativeNumber);

    this.beat = beat;
    this.waitSeconds = waitSeconds;

    this.onStarted = this.onStarted.bind(this); // ES6 fat arrow
};

Tick.prototype = {
    get isClassic() {
        return this._isClassic = this._isClassic || false;
    },
    set isClassic(value) {
        check(value, Boolean);
        this._isClassic = value;
    },
    get isRightHand() {
        return this._isRightHand = this._isRightHand || false;
    },
    set isRightHand(value) {
        check(value, Boolean);
        this._isRightHand = value;
    },
    get isLeftHand() {
        return this._isLeftHand = this._isLeftHand || false;
    },
    set isLeftHand(value) {
        check(value, Boolean);
        this._isLeftHand = value;
    },
    get isBackground() {
        if (this.isClassic) {return false};
        if (this.isRightHand) {return false};
        if (this.isLeftHand) {return false};
        return true;
    },
    get tones() {
        return this._tones = this._tones || this.makeTones();
    },
    makeTones: function() {
        var tones = [];
        if (this.isBackground) {tones.push(new BackgroundTone())};
        if (this.isClassic) {tones.push(new ClassicTone())};
        if (this.isRightHand) {tones.push(new RightHandTone(true))};
        if (this.isLeftHand) {tones.push(new LeftHandTone(true))};
        return tones;
    },
    startAtTime: function(time) {
        this.tones.forEach(function(each) {
            each.startAtTime(time);
        })
    },
    get isEnabledOnStarted() {
        return this._isEnabledOnStarted = this._isEnabledOnStarted || false;
    },
    get silentOnStartTone() {
      return new StartTriggerSilentTone(this.onStarted);
    },
    enableOnStarted: function() {
        if (this.isEnabledOnStarted) {return};
        this.tones.push(this.silentOnStartTone);
        this._isEnabledOnStarted = true;
    },
    onStarted: function() {
        // must first be enabled via this.enableOnStarted()
    }
};
