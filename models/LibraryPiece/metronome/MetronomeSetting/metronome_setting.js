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
    beginBeatIndex_getForUI: function() {
        return IndexAdaptor.shiftUp(this.beginBeatIndex);
    },
    endBeatIndex_getForUI: function() {
        return IndexAdaptor.shiftUp(this.endBeatIndex);
    },
    beginMeasureIndex_getForUI: function() {
        return IndexAdaptor.shiftUp(this.beginMeasureIndex);
    },
    endMeasureIndex_getForUI: function() {
        return IndexAdaptor.shiftUp(this.endMeasureIndex);
    },
    beginBeatIndex_setFromUI: function(value) {
        check(value, Matcher.positiveInteger);
        this.beginBeatIndex = IndexAdaptor.shiftDown(value);
    },
    endBeatIndex_setFromUI: function(value) {
        check(value, Matcher.positiveInteger);
        this.endBeatIndex = IndexAdaptor.shiftDown(value);
    },
    beginMeasureIndex_setFromUI: function(value) {
        check(value, Matcher.positiveInteger);
        this.beginMeasureIndex = IndexAdaptor.shiftDown(value);
    },
    endMeasureIndex_setFromUI: function(value) {
        check(value, Matcher.positiveInteger);
        this.endMeasureIndex = IndexAdaptor.shiftDown(value);
    },
    get beatsOfInterest() {
        var that = this;
        return this.piece.beats.filter(function(each) {
            return that.isInterestedInBeat(each);  // ES6 fat arrow
        });
    },
    isInterestedInBeat: function(beat) {
        if (this.isUseEntirePiece) return true;

        var measureIndex = beat.measure.index;
        if (!(this.beginMeasureIndex <= measureIndex)) return false;
        if (!(measureIndex <= this.endMeasureIndex)) return false;
        if (!((measureIndex == this.beginMeasureIndex) || (measureIndex == this.endMeasureIndex))) return true;

        var beatIndex = beat.index;
        if (measureIndex == this.beginMeasureIndex) {
            if (!(this.beginBeatIndex <= beatIndex)) return false;
        }
        if (measureIndex == this.endMeasureIndex) {
            if (!(beatIndex <= this.endBeatIndex)) return false;
        }

        return true;
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
        this.validateClassicTicksPerBeat(beat);
        var waitSeconds = this.classicTicksPerBeat / (beat.tickAmount * this.ticksPerSecond);
        return beat.ticksForWaitSeconds(waitSeconds);
    },
    validateClassicTicksPerBeat: function(beat) {
        if ((beat.tickAmount % this.classicTicksPerBeat) != 0) throw new MetronomeSetting_ClassicTicksPerBeat_Exception(this.classicTicksPerBeat, beat);
    },
    validate: function() {
        this.validateForPiece();
        this.validateCrossIndexIntegrity();
    },
    validateForPiece: function() {
        if (this.isUseEntirePiece) return;
        if (this.beginMeasureIndex >= this.piece.measures.length) throw new MetronomeSetting_Exception("Metronome-Setting begin-measure-index must not exceed number of measures for piece");
        if (this.beginBeatIndex >= this.piece.measures[this.beginMeasureIndex].beats.length) throw new MetronomeSetting_Exception("Metronome-Setting begin-beat-index must not exceed number of beats in begin-measure");
        if (this.endMeasureIndex >= this.piece.measures.length) throw new MetronomeSetting_Exception("Metronome-Setting end-measure-index must not exceed number of measures for piece");
        if (this.endBeatIndex >= this.piece.measures[this.endMeasureIndex].beats.length) throw new MetronomeSetting_Exception("Metronome-Setting end-beat-index must not exceed number of beats in end-measure");
    },
    validateCrossIndexIntegrity: function() {
        if (this.isUseEntirePiece) return;
        if (this.beginMeasureIndex > this.endMeasureIndex) throw new MetronomeSetting_Exception("Begin-measure-index must be <= to end-measure-index");
        if ((this.beginMeasureIndex == this.endMeasureIndex) && (this.beginBeatIndex > this.endBeatIndex)) throw new MetronomeSetting_Exception("Begin-beat-index must be <= end-beat-index in same measure");
    },
    get reactiveDict() {
        return this._reactiveDict = this._reactiveDict || new ReactiveDict();
    }
};