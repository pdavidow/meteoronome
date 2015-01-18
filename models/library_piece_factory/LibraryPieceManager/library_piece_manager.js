LibraryPieceManager = (function() {
    // I exist because Meteor does not support EJSON custom types at the top level.
    // See https://github.com/meteor/meteor/issues/3310#issuecomment-68743074
    // I serve to encapsulate the workaround.

    Meteor.methods({
        libraryPieceHoldersInsert: function(holder) {
            console.log("libraryPieceHolderInsert isSimulation?", this.isSimulation);
            _checkHolder(holder);
            var contents = _basicContentsFromHolder(holder);
            var dup = _findHolderBy_Name_Composer(contents.name, contents.composer);
            if (dup) throw new Meteor.Error("libraryPieceHolderInsert failed", "duplicate found");
            return LibraryPieceHolders.insert(holder);
        },
        libraryPieceHoldersRemove: function(id) {
            console.log("libraryPieceHolderRemove isSimulation?", this.isSimulation);
            _checkHolderId(id);
            return LibraryPieceHolders.remove(id);
        },
        libraryPieceHoldersRemoveAll: function() {
            console.log("libraryPieceHolderRemoveAll isSimulation?", this.isSimulation);
            return LibraryPieceHolders.remove({});
        }
    });

    _checkContents = function(contents) {
        check(contents, LibraryPiece);
    };
    _checkHolder = function(holder) {
        Match.test(holder, {piece: LibraryPiece});
    };
    _checkHolderId = function(id) {
        check(id, String);
    };
    _holderForContents = function(contents) {
        _checkContents(contents);
        return {piece: contents};
    };
    _basicContentsFromHolder = function(holder) {
        _checkHolder(holder);
        return holder.piece;
    };
    _contentsFromHolder = function(holder) {
        _checkHolder(holder);
        var contents = _basicContentsFromHolder(holder);
        contents.holderId = holder._id;
        return contents;
    };
    _insertContents = function(contents) {
        _checkContents(contents);
        var holder = _holderForContents(contents);
        Meteor.call('libraryPieceHoldersInsert', holder, function(error, result){
            if (error) return error;
            if (result) contents.holderId = result;
        });
    };
    _findHolderBy_Id = function(id){
        _checkHolderId(id);
        return LibraryPieceHolders.findOne({_id: id});
    };
    _findHolderBy_Name_Composer = function(name, composer) {
        check(name, String);
        check(composer, String);
        return LibraryPieceHolders.findOne({"piece.name": name, "piece.composer": composer});
    };
    _findContentsBy_Name_Composer = function(name, composer) {
        var holder = _findHolderBy_Name_Composer(name,  composer);
        if (holder) {
            return _contentsFromHolder(holder);
        } else {
            return null;
        }
    };
    _findContentsBy_Id = function(id) {
        var holder = _findHolderBy_Id(id);
        if (holder) {
            return _contentsFromHolder(holder);
        } else {
            return null;
        }
    };
    _findAllHolders = function() {
        //return LibraryPieceHolders.find();
        return LibraryPieceHolders.find({}, {sort: [["piece.composer","asc"],["piece.name","asc"],["piece.catalogReference","asc"]]});
    };
    _removeContents = function(contents) {
        _checkContents(contents);
        _removeHolderById(contents.holderId);
    };
    _removeHolder = function(holder) {
        _checkHolder(holder);
        _removeHolderById(holder._id);
    };
    _removeHolderById = function(id) {
        _checkHolderId(id);
        Meteor.call('libraryPieceHoldersRemove', id, function(error, result){
            console.log("libraryPieceHoldersRemove result", result);
        });
    };
    _removeAll = function() {
        Meteor.call('libraryPieceHoldersRemoveAll', function(error, result){
            console.log("libraryPieceHoldersRemoveAll result", result);
        });
    };

    return {
        insertLibraryPiece: _insertContents,
        removeLibraryPiece: _removeContents,
        removeLibraryPieceHolder: _removeHolder,
        removeAll: _removeAll,
        findLibraryPieceBy_Name_Composer: _findContentsBy_Name_Composer,
        findLibraryPieceBy_Id: _findContentsBy_Id,
        findLibraryPieceHolderBy_Name_Composer: _findHolderBy_Name_Composer,
        //findLibraryPieceBy_Name_Composer_CatalogReference: _findContentsBy_Name_Composer_CatalogReference // todo
        findAllLibraryPieceHolders: _findAllHolders
        // findAllLibraryPieces: DO NOT IMPLEMENT (need cursor for reactivity)
    }
})()