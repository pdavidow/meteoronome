MetronomeState = function(metronome) {
    check(metronome, Metronome);
    this.metronome = metronome;
};

MetronomeState.prototype = {
    get _reactiveDict() {
      return this.__reactiveDict = this.__reactiveDict || new ReactiveDict();
    },
    get isMetronomeOn() {
        var value = this._reactiveDict.get("isMetronomeOn");
        if (_.isUndefined(value)) {this._reactiveDict.set("isMetronomeOn", false)};
        return this._reactiveDict.get("isMetronomeOn");
    },
    set isMetronomeOn(boolean) {
        check(boolean, Boolean);
        this._reactiveDict.set("isMetronomeOn", boolean);
        if (!this._reactiveDict.get("isMetronomeOn")) {this._reactiveDict.set("currentBeat", null)};
    },
    get currentBeat() {
        return this._reactiveDict.get("currentBeat");
    },
    set currentBeat(beat) {
        check(beat, Match.OneOf(null, Beat));
        this._reactiveDict.set("currentBeat", beat);
    }
}