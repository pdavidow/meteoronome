MetronomeState = function(metronome) {
    check(metronome, Metronome);
    this.metronome = metronome;
};

// todo: Session usage is TEMP ONLY, needs to be instance-based

MetronomeState.prototype = {
    get isMetronomeOn() {
        var value = Session.get("isMetronomeOn");
        if (_.isUndefined(value)) {Session.set("isMetronomeOn", false)};
        return Session.get("isMetronomeOn");
    },
    set isMetronomeOn(boolean) {
        check(boolean, Boolean);
        Session.set("isMetronomeOn", boolean);
        if (!Session.get("isMetronomeOn")) {Session.set("currentBeat", null)};
    },
    get currentBeat() {
        return Session.get("currentBeat");
    },
    set currentBeat(beat) {
        check(beat, Match.OneOf(null, Beat));
        Session.set("currentBeat", beat);
    }
}