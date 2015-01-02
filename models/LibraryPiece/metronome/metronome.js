Metronome = function(setting) {
    check(setting, MetronomeSetting);
    this.setting = setting;

    this.onEnded = this.onEnded.bind(this); // ES6 fat arrow
};

Metronome.prototype = {
    get state() {
        return this._state = this._state || new MetronomeState(this);
    },
    start: function() {
        this._reset();
        this.recalcCaches(); // todo: only done to preset for efficiency -- only need to do once
        this.startAtTime(window.context.currentTime);
        this.state.isStarted = true;
    },
    startAtTime: function(timeAtStart) {
        this.timeAtStart = timeAtStart; // todo: turn into getter/setter w/ lazy init
        this.tickStartTimeOffset = 0; // todo: turn into getter/setter w/ lazy init
        this.startTicks();
    },
    startTicks: function() {
        var that = this;
        this.ticks.forEach(function(each) {
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
    _reset: function() {
        this._resetBeats();
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
        return _.flatten(this.beats.map(function(each) {
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
        this.state.incrementLoopCount();
        this.startAtTime(this.timeAtStart + this.tickStartTimeOffset);
        console.log("metronome looped");
    },
    stopped: function() {
        this.state.isStarted = false;
        this.setCurrentBeatToFirst();
        console.log("metronome stopped");
    },
    stop: function() {
        this.stopTicks();
        this.stopped();
    },
    stopTicks: function() {
        this.ticks.forEach(function(each) {
            each.stop();
        })
    },
    recalcCaches: function() {
        this.beats.forEach(function(each) {
            each.recalcCaches();
        });
    },
    set currentBeat(beat) {
        this.state.currentBeat = beat;
    },
    setCurrentBeatToFirst: function() {
        this.currentBeat = _.first(this.beats);
    }
};