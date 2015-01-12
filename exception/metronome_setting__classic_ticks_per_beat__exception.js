MetronomeSetting_ClassicTicksPerBeat_Exception = function(classicTicksPerBeat, beat) {
    this.classicTicksPerBeat = classicTicksPerBeat;
    this.beat = beat;
};

MetronomeSetting_ClassicTicksPerBeat_Exception.prototype = Object.create(MetronomeSetting_Exception.prototype);
MetronomeSetting_ClassicTicksPerBeat_Exception.prototype.constructor = MetronomeSetting_ClassicTicksPerBeat_Exception;

Object.defineProperties(MetronomeSetting_ClassicTicksPerBeat_Exception.prototype, {
    "displayMessage": {get: function () {
        return this._errorStringForLocationDescription(this.beat.displayLocationDescription);
    }}
});

_.extend(MetronomeSetting_ClassicTicksPerBeat_Exception.prototype, {
    _errorStringForLocationDescription: function(description) {
        return (
            "Invalid classic-ticks-per-beat: Beat (" +
            description +
            ") has " +
            this.beat.tickAmount.toString() +
            " ticks, which is not cleanly divisible by classic-ticks-per-beat of " +
            this.classicTicksPerBeat.toString()
        );
    }
});