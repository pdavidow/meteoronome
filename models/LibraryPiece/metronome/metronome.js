Metronome = function(setting) {
    check(setting, MetronomeSetting);
    this.setting = setting;

    this.onEnded = this.onEnded.bind(this); // ES6 fat arrow
};

Metronome.prototype = {
    get timeAtStart() {
        return this._timeAtStart = this._timeAtStart || window.context.currentTime;
    },
    set timeAtStart(value) {
        this._timeAtStart = value;
    },
    resetTimeAtStart: function() {
        this.timeAtStart = null;
    },
    get tickStartTimeOffset() {
        return this._tickStartTimeOffset = this._tickStartTimeOffset || 0;
    },
    set tickStartTimeOffset(value) {
        this._tickStartTimeOffset = value;
    },
    resetTickStartTimeOffset: function() {
        this.tickStartTimeOffset = null;
    },
    start: function() {
        this.reset();
        this.validate();
        this.startTicks();
        this.isStarted = true;
    },
    startTicks: function() {
        var that = this;
        this.ticks.forEach(function (each) {
            that.startTick(each); // ES6 fat arrow
        })
    },
    startTick: function(tick) {
        tick.startAtTime(this.timeAtStart + this.tickStartTimeOffset);
        this.tickStartTimeOffset += tick.waitSeconds;
    },
    get beats() {
        return this._beats = this._beats || this.setting.beatsOfInterest;
    },
    resetBeats: function() {
        this._beats = null;
    },
    get ticks() {
        return this._ticks = this._ticks || this.makeTicks();
    },
    resetTicks: function() {
        this._ticks = null;
    },
    makeTicks: function() {
        var ticks = this.requestedTicks;
        ticks.push(this.silentEndTick);
        return ticks;
    },
    get requestedTicks() {
        return _.flatten(this.beats.map(function (each) {
            return each.ticks;
        }));
    },
    get silentEndTick() {
        return new NoWaitSilentTick(this.onEnded);
    },
    onEnded: function() {
        if (this.isLoop) {
            this.loop();
        } else {
            this.stopped();
        }
    },
    get isLoop() {
        return this.setting.isLoop;
    },
    loop: function() {
        this.incrementLoopCount();
        this.timeAtStart += this.tickStartTimeOffset;
        this.resetTickStartTimeOffset();
        this.startTicks();
        console.log("metronome looped");
    },
    stopped: function() {
        this.isStarted = false;
        this.setCurrentBeatToFirst();
        console.log("metronome stopped");
    },
    stop: function() {
        this.stopTicks();
        this.stopped();
    },
    stopTicks: function() {
        this.ticks.forEach(function (each) {
            each.stop();
        })
    },
    get currentBeat() {
        if (!this._currentBeat) this.setCurrentBeatToFirst();
        return this._currentBeat;
    },
    set currentBeat(beat) {
        check(beat, Beat);
        this._currentBeat = beat;
        this.currentBeatDep.changed();
    },
    resetCurrentBeat: function() {
        this._currentBeat = null;
    },
    setCurrentBeatToFirst: function() {
        this.currentBeat = _.first(this.beats);
    },
    isStartedQQQQQQQQQQ: function() {
        var value = this.reactiveDict.get("isStarted");
        if (_.isNull(value) || _.isUndefined(value)) {
            this.reactiveDict.set("isStarted", false);
            return this.reactiveDict.get("isStarted");
        }
        return value;
    },
    get isStarted() {
        var value = this.reactiveDict.get("isStarted");
        if (_.isNull(value) || _.isUndefined(value)) {
            this.reactiveDict.set("isStarted", false);
            return this.reactiveDict.get("isStarted");
        }
        return value;
    },
    set isStarted(boolean) {
        check(boolean, Boolean);
        this.reactiveDict.set("isStarted", boolean);
        if (this.reactiveDict.get("isStarted")) {
            this.incrementLoopCount();
        } else {
            this.resetLoopCount();
            this.resetCurrentBeat();
        }
    },
    get isStopped() {
        return !this.isStarted;
    },
    get loopCount() {
        var value = this.reactiveDict.get("loopCount");
        if (_.isNull(value) || _.isUndefined(value)) {
            this.reactiveDict.set("loopCount", 0);
            return this.reactiveDict.get("loopCount");
        }
        return value;
    },
    incrementLoopCount: function() {
        var count = this.reactiveDict.get("loopCount");
        count += 1;
        this.reactiveDict.set("loopCount", count);
    },
    resetLoopCount: function() {
        this.reactiveDict.set("loopCount", null);
    },
    get currentBeatDep() {
        return this._currentBeatDep = this._currentBeatDep || new Tracker.Dependency;
    },
    reset: function() {
        this.resetTimeAtStart();
        this.resetTickStartTimeOffset();
        this.resetBeats();
        this.resetTicks();
        this.resetLoopCount();
        this.resetCurrentBeat();
    },
    validate: function() {
        this.setting.validate();
        this.validateTicks();
    },
    validateTicks: function() {
        this.ticks;
    },
    get reactiveDict() {
        return this._reactiveDict = this._reactiveDict || new ReactiveDict();
    }
};