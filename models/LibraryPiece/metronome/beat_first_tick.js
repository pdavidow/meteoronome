BeatFirstTick = function(beat, waitSeconds) {
    Tick.call(this, waitSeconds);
    this.beat = beat;

    this.enableOnStarted();
};

BeatFirstTick.prototype = Object.create(Tick.prototype);
BeatFirstTick.prototype.constructor = BeatFirstTick;

_.extend(BeatFirstTick.prototype, {
    onStarted: function() {
        this.beat.onStarted();
    }
});
