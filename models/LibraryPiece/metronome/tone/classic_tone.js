ClassicTone = function() {
    AbstractTone.call(this);
};

ClassicTone.prototype = Object.create(AbstractTone.prototype);
ClassicTone.prototype.constructor = ClassicTone;

Object.defineProperties(ClassicTone.prototype, {
    "buffer": {get: function () {
        return Audio.tone_800hz;
    }}
});

_.extend(ClassicTone.prototype, {
});
