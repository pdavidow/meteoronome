LibraryPieceManager = (function() {
    // I exist because Meteor does not support EJSON custom types at the top level.
    // See https://github.com/meteor/meteor/issues/3310#issuecomment-68743074
    // I serve to encapsulate the workaround.

    Meteor.methods({
        libraryPieceHolderInsert: function(libraryPieceHolder) {
            _checkHolder(libraryPieceHolder);
            return LibraryPieceHolders.insert(libraryPieceHolder);
        },
        libraryPieceHolderRemove: function(libraryPieceHolderId) {
            check(libraryPieceHolderId, String);
            LibraryPieceHolders.remove(libraryPieceHolderId);
        }
    });

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
        insertLibraryPiece: _insertLibraryPiece,
        removeLibraryPiece: _removeLibraryPiece,
        findLibraryPieceForNameComposer: _findLibraryPieceForNameComposer
    }
})()