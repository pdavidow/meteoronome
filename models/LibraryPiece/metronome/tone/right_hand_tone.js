RightHandTone = function(isStereo) {
    AbstractPositionedTone.call(this, isStereo);
};

RightHandTone.prototype = Object.create(AbstractPositionedTone.prototype);
RightHandTone.prototype.constructor = RightHandTone;

Object.defineProperties(RightHandTone.prototype, {
    "buffer": {get: function () {
        return Audio.tone_1000hz;
    }},
    "position": {get: function () {
        return this.positionRight;
    }}
});

_.extend(RightHandTone.prototype, {
});
