LibraryPieceManager = (function() {
    _checkHolder = function(libraryPieceHolder) {
        check(libraryPieceHolder, {piece: LibraryPiece});
    };
    _holdPiece = function(piece) {
        return {piece: piece};
    };
    _insertLibraryPiece = function(piece) {
        check(piece, LibraryPiece);
        var holder = _holdPiece(piece);
        Meteor.call('libraryPieceHolderInsert', holder, function(error, result){
            piece.holderId = result;
        });
    };
    _findHolderForNameComposer = function(name, composer) {
        return LibraryPieceHolders.findOne({}, {piece: {name: name, composer: composer}});
    };
    _findLibraryPieceForNameComposer = function(name, composer) {
        var holder = _findHolderForNameComposer(name,  composer);
        var piece = holder.piece;
        piece.holderId = holder._id;
        return piece;
    };
    _removeLibraryPiece = function(libraryPiece) {
        var holderId = libraryPiece.holderId;
        if (holderId) {
            return _removeHolderOfId(holderId);
        } else {
            throw("missing holderId");
        }
    };
    _removeHolderOfId = function(holderId) {
        Meteor.call('libraryPieceHolderRemove', holderId, function(error, result){});
    };
    return {
        checkHolder: _checkHolder,
        insertLibraryPiece: _insertLibraryPiece,
        findLibraryPieceForNameComposer: _findLibraryPieceForNameComposer,
        removeLibraryPiece: _removeLibraryPiece
    }
})()
