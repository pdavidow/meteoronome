BeatFirstTick = function(beat, waitSeconds) {
    Tick.call(this, beat, waitSeconds);
    this.trigger = this.trigger.bind(this); // ES6 fat arrow
};

BeatFirstTick.prototype = Object.create(Tick.prototype);
BeatFirstTick.prototype.constructor = BeatFirstTick;

_.extend(BeatFirstTick.prototype, {
    makeTones: function() {
        var tones = Tick.prototype.makeTones.call(this); // ES6 super
        tones.push(new StartTriggerSilentTone(this.trigger));
        return tones;
    },
    trigger: function() {
        this.beat.onStarted()
    }
})
