MetronomeSetting = function(piece) {
    check(piece, LibraryPiece);
    this.piece = piece;
};

MetronomeSetting.prototype = {
    get reactiveDict() {
        return this._reactiveDict = this._reactiveDict || new ReactiveDict();
    },
    get classicTicksPerMinute() {
      return this._classicTicksPerMinute = this._classicTicksPerMinute || 30;
    },
    set classicTicksPerMinute(value) {
        check(value, Matcher.positiveInteger);
        this._classicTicksPerMinute = value;
    },
    get classicTicksPerBeat() {
        return this._classicTicksPerBeat = this._classicTicksPerBeat || 1;
    },
    set classicTicksPerBeat(value) {
        check(value, Matcher.positiveInteger);
        this._classicTicksPerBeat = value;
    },
    get isLoop() {
        var value = this.reactiveDict.get("isLoop");
        if (_.isNull(value) || _.isUndefined(value)) {
            this.reactiveDict.set("isLoop", false);
            return this.reactiveDict.get("isLoop");
        }
        return value;
    },
    set isLoop(value) {
        check(value, Boolean);
        this.reactiveDict.set("isLoop", value);
    },
    toggleIsLoop: function() {
        this.isLoop = !this.isLoop;
    },
    get beatsOfInterest() {
        var that = this;
        return this.piece.beats.filter(function(each) {
            return that.isInterestedInBeat(each);  // ES6 fat arrow
        });
    },
    isInterestedInBeat: function(beat) {
      return true; ///////////// todo: apply setting
    },
    startMetronome: function() {
        this.metronome.start();
    },
    stopMetronome: function() {
        this.metronome.stop();
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
};



