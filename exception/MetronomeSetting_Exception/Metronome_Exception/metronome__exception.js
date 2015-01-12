Metronome_Exception = function(message) {
    check(message, String);
    this.message = message;
};

Object.defineProperties(Metronome_Exception.prototype, {
    "displayMessage": {get: function () {
        return this.message;
    }}
});