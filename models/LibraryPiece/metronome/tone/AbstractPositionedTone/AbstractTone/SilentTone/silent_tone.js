SilentTone = function() {
    AbstractTone.call(this);
};

SilentTone.prototype = Object.create(AbstractTone.prototype);
SilentTone.prototype.constructor = SilentTone;

Object.defineProperties(SilentTone.prototype, {
    "buffer": {get: function () {
        return Audio.tone_Silent_1ms;
    }},
    "duration": {get: function () {
        return 0.001; // seconds
    }}
});