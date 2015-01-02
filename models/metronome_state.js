MetronomeState = function(metronome) {
    check(metronome, Metronome);
    this.metronome = metronome;
};

MetronomeState.prototype = {
    get _reactiveDict() {
        return this.__reactiveDict = this.__reactiveDict || new ReactiveDict();
    },
    get isStarted() {
        var value = this._reactiveDict.get("isStarted");
        if (_.isNull(value) || _.isUndefined(value)) {
            this._reactiveDict.set("isStarted", false);
            return this._reactiveDict.get("isStarted");
        }
        return value;
    },
    set isStarted(boolean) {
        check(boolean, Boolean);
        this._reactiveDict.set("isStarted", boolean);
        if (this._reactiveDict.get("isStarted")) {
            this.incrementLoopCount();
        } else {
            this.resetLoopCount();
            this._resetCurrentBeat();
        }
    },
    get isStopped() {
        return !this.isStarted;
    },
    get currentBeat_displayLocationDescription() {
        this.currentBeat;
        return this._reactiveDict.get("displayLocationDescription");
    },
    get currentBeat() {
        if (!this._currentBeat) {
            this.metronome.setCurrentBeatToFirst()
        } // todo: should be moved into Metronome proper
        return this._currentBeat;
    },
    set currentBeat(beat) {
        check(beat, Beat);
        this._currentBeat = beat;
        this._reactiveDict.set("displayLocationDescription", beat.displayLocationDescription); // efficiency is important
    },
    _resetCurrentBeat: function() {
        this._currentBeat = null;
    },
    get loopCount() {
        var value = this._reactiveDict.get("loopCount");
        if (_.isNull(value) || _.isUndefined(value)) {
            this._reactiveDict.set("loopCount", 0);
            return this._reactiveDict.get("loopCount");
        }
        return value;
    },
    incrementLoopCount: function() {
        var count = this._reactiveDict.get("loopCount");
        count += 1;
        this._reactiveDict.set("loopCount", count);
    },
    resetLoopCount: function() {
        this._reactiveDict.set("loopCount", null);
    }
};