LeftHandTone = function(isStereo) {
    AbstractPositionedTone.call(this, isStereo);
};

LeftHandTone.prototype = Object.create(AbstractPositionedTone.prototype);
LeftHandTone.prototype.constructor = LeftHandTone;

Object.defineProperties(LeftHandTone.prototype, {
    "buffer": {get: function () {
        return Audio.tone_900hz;
    }},
    "position": {get: function () {
        return this.positionLeft;
    }}
});

_.extend(LeftHandTone.prototype, {
})
