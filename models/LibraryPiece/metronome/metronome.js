Metronome = function(setting) {
    check(setting, MetronomeSetting);
    this.setting = setting;
};

Metronome.prototype = {
    get classicTicksPerMinute() {
        return this._classicTicksPerMinute = this._classicTicksPerMinute || this.setting.classicTicksPerMinute;
    },
    get classicTicksPerBeat() {
        return this._classicTicksPerBeat = this._classicTicksPerBeat || this.setting.classicTicksPerBeat;
    },
    get ticksPerSecond() {
        return this._ticksPerSecond = this._ticksPerSecond || this.classicTicksPerMinute / 60;
    },
    ticksForBeat: function(beat) {
        check(beat, Beat);
        var waitSeconds = this.classicTicksPerBeat / (beat.tick_amount * this.ticksPerSecond);
        return beat.ticksForWaitSeconds(waitSeconds);
    },
    startOnTicks: function(ticks) {
        this.ticks = ticks;
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
    }
};