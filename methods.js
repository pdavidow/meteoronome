Meteor.methods({
    pieceInsert: function(piece) {
        console.log('stub? pieceInsert', this.isSimulation);
        check(Meteor.userId(), String);
        check(piece, Piece);

        var redundancy = PieceCollection.findOne({name: piece.name, composer: piece.composer});
        if (redundancy) {
            return {
                isRedundant: true,
                pieceId: redundancy._id
            }
        }
        var pieceId = PieceCollection.insert(piece.toJSONValue());
        return {
            isRedundant: false,
            pieceId: pieceId
        }
    },
    pieceRemove: function(pieceId) {
        check(pieceId, String);
        PieceCollection.remove(pieceId);
    },
    libraryPieceHolderInsert: function(libraryPieceHolder) {
        check(libraryPieceHolder, {piece: LibraryPiece});
        return LibraryPieceHolders.insert(libraryPieceHolder);
    },
    libraryPieceHolderRemove: function(libraryPieceHolderId) {
        check(libraryPieceHolderId, String);
        LibraryPieceHolders.remove(libraryPieceHolderId);
    }
});

