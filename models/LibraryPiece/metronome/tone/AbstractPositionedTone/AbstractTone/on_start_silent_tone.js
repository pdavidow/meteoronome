// Workaround for lack of AudioBufferSourceNode 'onstarted' callback in Web Audio API

OnStartSilentTone = function(onPerceivedStarted) {
    SilentTone.call(this);
    this.onPerceivedStarted = onPerceivedStarted;
};

OnStartSilentTone.prototype = Object.create(SilentTone.prototype);
OnStartSilentTone.prototype.constructor = OnStartSilentTone;

_.extend(OnStartSilentTone.prototype, {
    startAtTime: function(time) {
        SilentTone.prototype.startAtTime.call(this, time - this.duration); // ES6 super
    },
    onEnded: function() {
        this.onPerceivedStarted();
    }
})
