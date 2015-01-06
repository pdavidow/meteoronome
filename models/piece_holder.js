LibraryPieceHolderManager = {
    checkHolder: function(libraryPieceHolder) {
        check(libraryPieceHolder, {piece: LibraryPiece});
    },
    holderForPiece: function(piece) {
        return {piece: piece};
    },
    pieceFromHolder: function(holder) {
        return holder.piece;
    },
    insertLibraryPiece: function(libraryPiece) {
        check(libraryPiece, LibraryPiece);
        var holder = this.holderForPiece(libraryPiece);
        Meteor.call('libraryPieceHolderInsert', holder, function(error, result){
            console.log("insertLibraryPiece error", error);
            console.log("insertLibraryPiece result", result);
        });
    },
    findHolderForNameComposer: function(name, composer) {
        return LibraryPieceHolders.findOne({}, {piece: {name: name, composer: composer}});
    },
    findLibraryPieceForNameComposer: function(name, composer) {
        var holder = this.findHolderForNameComposer(name,  composer);
        return holder.piece;
    },
    removeHolderOfId: function(id) {
        Meteor.call('libraryPieceHolderRemove', id, function(error, result){
            console.log("removeHolderOfId error", error);
            console.log("removeHolderOfId result", result);
        });
    }
}
