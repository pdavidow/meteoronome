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
        if (_.isUndefined(value)) {this._reactiveDict.set("isStarted", false)};
        return this._reactiveDict.get("isStarted");
    },
    set isStarted(boolean) {
        check(boolean, Boolean);
        this._reactiveDict.set("isStarted", boolean);
        if (!this._reactiveDict.get("isStarted")) {this._reactiveDict.set("currentBeat", null)};
    },
    get isStopped() {
        return !this.isStarted;
    },
    get currentBeat() { // todo: uhoh -- returns clone
        return this._reactiveDict.get("currentBeat");
    },
    set currentBeat(beat) {
        check(beat, Match.OneOf(null, Beat));
        this._reactiveDict.set("currentBeat", beat);
        this._reactiveDict.set("currentBeat_DisplayLocationDescription", beat.displayLocationDescription);
    },
    get currentBeat_DisplayLocationDescription() { // todo: is this best that can be done (taking speed efficiency into account)???
        var value = this._reactiveDict.get("currentBeat_DisplayLocationDescription");
        if (_.isUndefined(value)) {this._reactiveDict.set("currentBeat_DisplayLocationDescription", "---")};
        return this._reactiveDict.get("currentBeat_DisplayLocationDescription");
    }
}