Metronome = function(setting) {
    check(setting, MetronomeSetting);
    this.setting = setting;

    this.onEnded = this.onEnded.bind(this); // ES6 fat arrow
};

Metronome.prototype = {
    startOnBeats: function(beats) {
        this.beats = beats;
        this.start();
    },
    start: function() {
        this.startAtTime(window.context.currentTime);
    },
    startAtTime: function(timeAtStart) {
        this.timeAtStart = timeAtStart;
        this.tickStartTimeOffset = 0;
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
      return this._beats;
    },
    set beats(beats) {
        this._beats = beats;
        this._resetTicks;
    },
    get ticks() {
        return this._ticks = this._ticks || this._makeTicks();
    },
    _resetTicks: function() {
        this._ticks = null;
    },
    _makeTicks: function() {
        var ticks = this._rawTicks;
        ticks.push(this.silentEndTick);
        return ticks;
    },
    get _rawTicks() {
        return _.flatten(this.beats.map(function(each) {
            return each.ticks;
        }));
    },
    get silentEndTick() {
        return new NoWaitSilentTick(this.onEnded);
    },
    onEnded: function() {
        console.log("metronome onEnded");
    }
};