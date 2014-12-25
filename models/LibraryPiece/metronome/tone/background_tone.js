BackgroundTone = function() {
    AbstractTone.call(this);
};

BackgroundTone.prototype = Object.create(AbstractTone.prototype);
BackgroundTone.prototype.constructor = BackgroundTone;

Object.defineProperties(BackgroundTone.prototype, {
    "buffer": {get: function () {
        return Audio.tone_4000hz;
    }}
});

_.extend(BackgroundTone.prototype, {
})
