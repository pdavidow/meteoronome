LibraryPieceManager = (function() {
    // I exist because Meteor does not support EJSON custom types at the top level.
    // See https://github.com/meteor/meteor/issues/3310#issuecomment-68743074
    // I serve to encapsulate the workaround.

    Meteor.methods({
        libraryPieceHolderInsert: function(libraryPieceHolder) {
            console.log("libraryPieceHolderInsert isSimulation?", this.isSimulation);
            _checkHolder(libraryPieceHolder);
            return LibraryPieceHolders.insert(libraryPieceHolder);
        },
        libraryPieceHolderRemove: function(libraryPieceHolderId) {
            console.log("libraryPieceHolderRemove isSimulation?", this.isSimulation);
            check(libraryPieceHolderId, String);
            LibraryPieceHolders.remove(libraryPieceHolderId);
        },
        libraryPieceHolderRemoveAll: function() {
            console.log("libraryPieceHolderRemoveAll isSimulation?", this.isSimulation);
            LibraryPieceHolders.remove({});
        }
    });

    _checkHolder = function(libraryPieceHolder) {
        check(libraryPieceHolder, {piece: LibraryPiece});
    };
    _holdPiece = function(piece) {
        return {piece: piece};
    };
    _pieceFromHolder = function(holder) {
        if (holder) {
            var piece = holder.piece;
            piece.holderId = holder._id;
            return piece;
        } else {
            throw("missing holder");
        }
    },
    _insertLibraryPiece = function(piece) {
        // todo: need to guarantee uniqueness by first attempting to find existing that matches
        check(piece, LibraryPiece);
        var holder = _holdPiece(piece);
        Meteor.call('libraryPieceHolderInsert', holder, function(error, result){
            piece.holderId = result;
        });
    };
    _findHolderBy_Name_Composer = function(name, composer) {
        return LibraryPieceHolders.findOne({}, {piece: {name: name, composer: composer}});
    };
    _findLibraryPieceBy_Name_Composer = function(name, composer) {
        var holder = _findHolderBy_Name_Composer(name,  composer);
        return _pieceFromHolder(holder);
    };
    _findLibraryPieceBy_Id = function(id) {
        var holder = _findHolderBy_Id(id);
        return _pieceFromHolder(holder);
    };
    _findAllHolders = function() {
        //return LibraryPieceHolders.find();
        return LibraryPieceHolders.find({}, {sort: [["piece.composer","asc"],["piece.name","asc"],["piece.catalogReference","asc"]]});
    };
    _findAllLibraryPieces = function(name, composer) {
        var holders = _findAllHolders();
        return holders.map(function(each) {
            var piece = each.piece;
            piece.holderId = each._id;
            return piece;
        });
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
    _removeAll = function() {
        Meteor.call('libraryPieceHolderRemoveAll', function(error, result){});
    };

    return {
        insertLibraryPiece: _insertLibraryPiece,
        removeLibraryPiece: _removeLibraryPiece,
        removeAll: _removeAll,
        findLibraryPieceBy_Name_Composer: _findLibraryPieceBy_Name_Composer,
        //findLibraryPieceBy_Name_Composer_CatalogReference: _findLibraryPieceBy_Name_Composer_CatalogReference, todo
        findLibraryPieceBy_Id: _findLibraryPieceBy_Id,
        findAllLibraryPieces: _findAllLibraryPieces
    }
})()