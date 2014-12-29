MetronomeSetting = function(piece, classicTicksPerMinute, classicTicksPerBeat) {
    check(piece, LibraryPiece);
    check(classicTicksPerMinute, Matcher.positiveInteger);
    check(classicTicksPerBeat, Matcher.positiveInteger);

    this.piece = piece;
    this.classicTicksPerMinute = classicTicksPerMinute;
    this.classicTicksPerBeat = classicTicksPerBeat;
};

MetronomeSetting.prototype = {
    get beatsOfInterest() {
        var that = this;
        return this.piece.beats.filter(function(each) {
            return that.isInterestedInBeat(each);  // ES6 fat arrow
        });
    },
    isInterestedInBeat: function(beat) {
      return true; ///////////// apply setting
    },
    startMetronome: function() {
        this.metronome.startOnBeats(this.beatsOfInterest);
    },
    get metronomeState() {
        return this.metronome.state;
    },
    get metronome() {
        return this._metronome = this._metronome || new Metronome(this);
    },
    get ticksPerSecond() {
        return this._ticksPerSecond = this._ticksPerSecond || this.classicTicksPerMinute / 60;
    },
    ticksForBeat: function(beat) {
        check(beat, Beat);
        var waitSeconds = this.classicTicksPerBeat / (beat.tick_amount * this.ticksPerSecond);
        return beat.ticksForWaitSeconds(waitSeconds);
    }
}



