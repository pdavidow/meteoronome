Metronome = function(setting) {
    check(setting, MetronomeSetting);
    this.setting = setting;

    this.onEnded = this.onEnded.bind(this); // ES6 fat arrow
};

Metronome.prototype = {
    start: function () {
        this._reset();
        this.recalcCaches(); // todo: only done to preset for efficiency -- only need to do once
        this.startAtTime(window.context.currentTime);
        this.isStarted = true;
    },
    startAtTime: function (timeAtStart) {
        this.timeAtStart = timeAtStart; // todo: turn into getter/setter w/ lazy init
        this.tickStartTimeOffset = 0; // todo: turn into getter/setter w/ lazy init
        this.startTicks();
    },
    startTicks: function () {
        var that = this;
        this.ticks.forEach(function (each) {
            that.startTick(each); // ES6 fat arrow
        })
    },
    startTick: function (tick) {
        tick.startAtTime(this.timeAtStart + this.tickStartTimeOffset);
        this.tickStartTimeOffset += tick.waitSeconds;
    },
    get beats() {
        return this._beats = this._beats || this.setting.beatsOfInterest;
    },
    _resetBeats: function () {
        this._beats = null;
        this._resetTicks();
    },
    _reset: function () {
        this._resetBeats();
    },
    get ticks() {
        return this._ticks = this._ticks || this._makeTicks();
    },
    _resetTicks: function () {
        this._ticks = null;
    },
    _makeTicks: function () {
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
    onEnded: function () {
        if (this.isLoop) {
            this.loop();
        } else {
            this.stopped();
        }
    },
    get isLoop() {
        return this.setting.isLoop;
    },
    loop: function () {
        this.incrementLoopCount();
        this.startAtTime(this.timeAtStart + this.tickStartTimeOffset);
        console.log("metronome looped");
    },
    stopped: function () {
        this.isStarted = false;
        this.setCurrentBeatToFirst();
        console.log("metronome stopped");
    },
    stop: function () {
        this.stopTicks();
        this.stopped();
    },
    stopTicks: function () {
        this.ticks.forEach(function (each) {
            each.stop();
        })
    },
    get currentBeat() {
        if (!this._currentBeat) {
            this.setCurrentBeatToFirst();
        }
        return this._currentBeat;
    },
    set currentBeat(beat) {
        check(beat, Beat);
        this._currentBeat = beat;
        this.currentBeatDep.changed();
    },
    _resetCurrentBeat: function() {
        this._currentBeat = null;
    },
    setCurrentBeatToFirst: function () {
        this.currentBeat = _.first(this.beats);
    },
    get isStarted() {
        var value = this._reactiveDict.get("isStarted");
        if (_.isNull(value) || _.isUndefined(value)) {
            this._reactiveDict.set("isStarted", false);
            return this._reactiveDict.get("isStarted");
        }
        return value;
    },
    set isStarted(boolean) {
        check(boolean, Boolean);
        this._reactiveDict.set("isStarted", boolean);
        if (this._reactiveDict.get("isStarted")) {
            this.incrementLoopCount();
        } else {
            this.resetLoopCount();
            this._resetCurrentBeat();
        }
    },
    get isStopped() {
        return !this.isStarted;
    },
    get loopCount() {
        var value = this._reactiveDict.get("loopCount");
        if (_.isNull(value) || _.isUndefined(value)) {
            this._reactiveDict.set("loopCount", 0);
            return this._reactiveDict.get("loopCount");
        }
        return value;
    },
    incrementLoopCount: function() {
        var count = this._reactiveDict.get("loopCount");
        count += 1;
        this._reactiveDict.set("loopCount", count);
    },
    resetLoopCount: function() {
        this._reactiveDict.set("loopCount", null);
    },
    get currentBeatDep() {
        return this._currentBeatDep = this._currentBeatDep || new Deps.Dependency;
    },
    get _reactiveDict() {
        return this.__reactiveDict = this.__reactiveDict || new ReactiveDict();
    },
    recalcCaches: function () {
        this.beats.forEach(function (each) {
            each.recalcCaches();
        });
    }
};