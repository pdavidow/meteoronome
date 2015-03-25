Template.pieces.rendered  = function() {
    $("#pieceList").val(Helper.currentPieceId());
};

Template.pieces.helpers({
    isDeletePieceButtonDisabled: function() {
        return Helper.currentPiece() ? false : true;
    },
    isPieceListDisabled: function() { 
        var piece = Helper.currentPiece();
        if (piece) return piece.metronome.isStarted;
        return false;
    },
    cursorOnPiecesForCurrentUser: function() {
        return PieceManager.cursorOnPiecesForCurrentUser();
    },
    isPieceOptionSelected: function(id) {
        return id == Helper.currentPieceId();
    }
});

Template.pieces.events({
    "change #pieceList": function() {
        // http://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
        var id = $('#pieceList option:selected').val();
        if (id) UserPieceManager.updateCurrentPieceId(id);
    },
    "click #deleteCurrentPiece": function() {
        if (confirm("Confirm delete?")) {
            PieceManager.removePieceById(Helper.currentPieceId());
            Helper.setCurrentPieceToFirst();
        }
    }
});
