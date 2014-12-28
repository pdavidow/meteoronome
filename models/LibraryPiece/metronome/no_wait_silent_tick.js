NoWaitSilentTick = function(onEnded) {
    var waitSeconds = 0;
    Tick.call(this, waitSeconds);

    this.onEnded = onEnded;
};

NoWaitSilentTick.prototype = Object.create(Tick.prototype);
NoWaitSilentTick.prototype.constructor = NoWaitSilentTick;

_.extend(NoWaitSilentTick.prototype, {
    _makeTones: function() {
        return [new OnStartSilentTone(this.onEnded)];
    }
})
