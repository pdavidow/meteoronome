AbstractTone = function() {
    this.onEnded = this.onEnded.bind(this);  // ES6 fat arrow
};

AbstractTone.prototype = {
    startAtTime: function (time) {
        this.source = this.startBufferAtTime(time);
        this.source.onended = this.onEnded;
    },
    startBufferAtTime: function(time) {
        return Audio.startBufferAtTime(this.buffer, time);
    },
    stop: function() {
        if (this.source) {
            this.source.disconnect()
        }
    },
    get buffer() {
        Intent.subtypeMustImplement();
    },
    onEnded: function() {
    }
};
