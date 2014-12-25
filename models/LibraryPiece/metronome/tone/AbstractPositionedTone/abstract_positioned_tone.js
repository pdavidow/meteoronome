AbstractPositionedTone = function(isStereo) {
    check(isStereo, Boolean);
    this.isStereo = isStereo;

    AbstractTone.call(this);
};

AbstractPositionedTone.prototype = Object.create(AbstractTone.prototype);
AbstractPositionedTone.prototype.constructor = AbstractPositionedTone;

Object.defineProperties(AbstractPositionedTone.prototype, {
    "position": {get: function () {
        Intent.subtypeMustImplement();
    }},
    "positionRight": {get: function () {
        return [+1,0,0];
    }},
    "positionCenter": {get: function () {
        return [ 0,0,0];
    }},
    "positionLeft": {get: function () {
        return [-1,0,0];
    }}
});

_.extend(AbstractPositionedTone.prototype, {
    startBufferAtTime: function(time) {
        if (!this.isStereo) {return AbstractTone.prototype.startBufferAtTime.call(this, time)}; // ES6 super
        return Audio.startBufferAtTimeAtPosition(this.buffer, time, this.position);
    }
})

