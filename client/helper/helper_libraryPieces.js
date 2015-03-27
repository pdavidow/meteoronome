var selectedLibraryPiece = new ReactiveVar(null);

Template.libraryPieces.rendered = function() {
    var id = $('#libraryPieceList').val();
    if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
};

Template.libraryPieces.helpers({
    isLibraryPieceListDisabled: function() {
        return false;
    },
    isImportButtonDisabled: function() {
        if (Meteor.user()) return false;
        return true;
    },
    cursorOnLibraryPieces: function() {
        return LibraryPieceManager.cursorOnLibraryPieces();
    }
});

Template.libraryPieces.events({
    "click #import": function() {
        var callback, libraryPiece;
        libraryPiece = selectedLibraryPiece.get();
        if (!libraryPiece) return;
        var piece = libraryPiece.asPieceForCurrentUser();
        callback = function (error, result) {
            if (error) {
                alert("Error: Could not import");
                return;
            }
            if (result) {
                UserPieceManager.updateCurrentPieceId(result);
                $("#pieceList").val(result);
            }
        };
        PieceManager.insertPiece(piece, callback);
    },
    "change #libraryPieceList": function() {
        // http://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
        var id = $('#libraryPieceList option:selected').val();
        if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
    }
});
