Template.status.helpers({
    currentBeat: function() {
        var piece = Helper.currentPiece();
        if (!piece) return;
        piece.metronome.currentBeatDep.depend();
        return piece.metronome.currentBeat.displayLocationDescription;
    },
    loopCount: function() {
        var count;
        var piece = Helper.currentPiece();
        if (!piece) return;
        count = piece.metronome.loopCount;
        return count == 0 ? "---" : count.toString();
    }
});