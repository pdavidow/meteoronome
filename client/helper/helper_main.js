Template.main.rendered = function() {
    UserPieceManager.setCurrentPieceFromUser();
};

Template.main.helpers({
    currentUserTEMPPPPPPPPPPPPPPPPPPPPPPP: function() { // todo
        return Temp_VirtualUser;
    },
    isPieceSelected: function() {
        return !(_.isNull(Helper.currentPiece()));
    },
    isStartButtonDisabled: function() {
        var piece = Helper.currentPiece();
        if (piece) return piece.metronome.isStarted;
        return true;
    },
    isStopButtonDisabled: function() {
        var piece = Helper.currentPiece();
        if (piece) return piece.metronome.isStopped;
        return true;
    }
});

Template.main.events({
    "click #start": function() {
        var piece = Helper.currentPiece();
        if (piece) piece.startMetronome();
    },
    "click #stop": function() {
        var piece = Helper.currentPiece();
        if (piece) piece.stopMetronome();
    }
});
