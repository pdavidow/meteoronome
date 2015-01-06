var className = "MetronomeSetting";

MetronomeSetting = function(piece) {
    check(piece, Match.OneOf(undefined, LibraryPiece));
    this.piece = piece;
};

MetronomeSetting.fromJSONValue = function(value) {
    var setting = new MetronomeSetting();

    setting.classicTicksPerMinute = value.classicTicksPerMinute;
    setting.classicTicksPerBeat = value.classicTicksPerBeat;
    setting.isLoop = value.isLoop;
    setting.isUseEntirePiece = value.isUseEntirePiece;
    setting.beginMeasureIndex = value.beginMeasureIndex;
    setting.endMeasureIndex = value.endMeasureIndex;
    setting.beginBeatIndex = value.beginBeatIndex;
    setting.endBeatIndex = value.endBeatIndex;

    return setting;
};

MetronomeSetting.prototype = {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        return {
            classicTicksPerMinute: this.classicTicksPerMinute,
            classicTicksPerBeat: this.classicTicksPerBeat,
            isLoop: this.isLoop,
            isUseEntirePiece: this.isUseEntirePiece,
            beginMeasureIndex: this.beginMeasureIndex,
            endMeasureIndex: this.endMeasureIndex,
            beginBeatIndex: this.beginBeatIndex,
            endBeatIndex: this.endBeatIndex
        };
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
    get isUseEntirePiece() {
        var value = this.reactiveDict.get("isUseEntirePiece");
        if (_.isNull(value) || _.isUndefined(value)) {
            this.reactiveDict.set("isUseEntirePiece", true);
            return this.reactiveDict.get("isUseEntirePiece");
        }
        return value;
    },
    set isUseEntirePiece(value) {
        check(value, Boolean);
        this.reactiveDict.set("isUseEntirePiece", value);
    },
    toggleIsUseEntirePiece: function() {
        this.isUseEntirePiece = !this.isUseEntirePiece;
    },
    get beginMeasureIndex() {
        return this._beginMeasureIndex = this._beginMeasureIndex || 0;
    },
    set beginMeasureIndex(value) {
        check(value, Matcher.nonNegativeNumber);
        this._beginMeasureIndex = value;
    },
    get endMeasureIndex() {
        return this._endMeasureIndex = this._endMeasureIndex || 0;
    },
    set endMeasureIndex(value) {
        check(value, Matcher.nonNegativeNumber);
        this._endMeasureIndex = value;
    },
    get beginBeatIndex() {
        return this._beginBeatIndex = this._beginBeatIndex || 0;
    },
    set beginBeatIndex(value) {
        check(value, Matcher.nonNegativeNumber);
        this._beginBeatIndex = value;
    },
    get endBeatIndex() {
        return this._endBeatIndex = this._endBeatIndex || 0;
    },
    set endBeatIndex(value) {
        check(value, Matcher.nonNegativeNumber);
        this._endBeatIndex = value;
    },
    get beatsOfInterest() {
        var that = this;
        return this.piece.beats.filter(function(each) {
            return that.isInterestedInBeat(each);  // ES6 fat arrow
        });
    },
    isInterestedInBeat: function(beat) {
        return true; // todo
        if (this.isUseEntirePiece) {return true};

        //var measureIndex = beat.measureIndex;
    },
    startMetronome: function() {
        this.piece.reset();
        this.piece.loadDisplayCaches(); // for efficiency. todo: investigate if need to do only once
        this.metronome.start();
    },
    stopMetronome: function() {
        this.metronome.stop();
    },
    get metronome() {
        return this._metronome = this._metronome || new Metronome(this);
    },
    get ticksPerSecond() {
        return this.classicTicksPerMinute / 60;
    },
    ticksForBeat: function(beat) {
        check(beat, Beat);
        var waitSeconds = this.classicTicksPerBeat / (beat.tickAmount * this.ticksPerSecond);
        return beat.ticksForWaitSeconds(waitSeconds);
    },
    get reactiveDict() {
        return this._reactiveDict = this._reactiveDict || new ReactiveDict();
    }
};

EJSON.addType(className, MetronomeSetting.fromJSONValue);