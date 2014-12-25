// Workaround for lack of AudioBufferSourceNode 'onstarted' callback in Web Audio API

StartTriggerSilentTone = function(trigger) {
    SilentTone.call(this);
    this.trigger = trigger;
};

StartTriggerSilentTone.prototype = Object.create(SilentTone.prototype);
StartTriggerSilentTone.prototype.constructor = StartTriggerSilentTone;

_.extend(StartTriggerSilentTone.prototype, {
    startAtTime: function(time) {
        SilentTone.prototype.startAtTime.call(this, time - this.duration); // ES6 super
    },
    onEnded: function() {
        this.trigger();
    }
})
