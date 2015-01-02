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
    get tickStartTimeOffset() {
        return this._tickStartTimeOffset = this._tickStartTimeOffset || 0;
    },
    set tickStartTimeOffset(value) {
        this._tickStartTimeOffset = value;
    },
    _resetTickStartTimeOffset: function() {
        this.tickStartTimeOffset = null;
    },
    start: function() {
        this._resetBeats();
        this.recalcCaches(); // todo: only done to preset for efficiency -- only need to do once
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
    _resetBeats: function() {
        this._beats = null;
        this._resetTicks();
    },
    get ticks() {
        return this._ticks = this._ticks || this._makeTicks();
    },
    _resetTicks: function() {
        this._ticks = null;
    },
    _makeTicks: function() {
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
        this._resetTickStartTimeOffset();
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
    setCurrentBeatToFirst: function() {
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
    recalcCaches: function() {
        this.beats.forEach(function (each) {
            each.recalcCaches();
        });
    }
};