LibraryPieceManager = (function() {
    LibraryPieces = new Mongo.Collection('library_pieces', {
        transform: function (doc) {
            return LibraryPiece.fromJSONValue(doc);
        }
    });

    Meteor.methods({
        insertLibraryPieceAsJSON: function(object) {
            check(object, Match.ObjectIncluding({name: String, composer: String}));
            var dup = _findLibraryPieceBy_Name_Composer(object.name, object.composer);
            if (dup) throw new Meteor.Error("insertLibraryPieceAsJSON failed", "duplicate found");
            console.log("insertLibraryPieceAsJSON isSimulation?", this.isSimulation);
            return LibraryPieces.insert(object);
        },
        removeLibraryPieceById: function(id) {
            console.log("removeLibraryPieceById isSimulation?", this.isSimulation);
            check(id, String);
            return LibraryPieces.remove(id);
        },
        removeAllLibraryPieces: function() {
            console.log("removeAllLibraryPieces isSimulation?", this.isSimulation);
            return LibraryPieces.remove({});
        }
    });

    _findLibraryPieceBy_Id = function(id) {
        check(id, String);
        return LibraryPieces.findOne({"_id": id});
    };
    _findLibraryPieceBy_Name_Composer = function(name, composer) {
        check(name, String);
        check(composer, String);
        return LibraryPieces.findOne({"name": name, "composer": composer});
    };
    _cursorOnLibraryPieces = function() {
        return LibraryPieces.find({}, {sort: [["composer", "asc"], ["name", "asc"], ["catalogReference", "asc"], ["publicationDate", "asc"]]});
    };

    if (Meteor.isClient) {
        _insertLibraryPiece = function(libraryPiece) {
            check(libraryPiece, LibraryPiece);
            var object = libraryPiece.toJSONValue();
            Session.set("insertLibraryPiece_error", null);
            Session.set("insertLibraryPiece_result", null);
            Meteor.call('insertLibraryPieceAsJSON', object, function (error, result) {
                if (error) Session.set("insertLibraryPiece_error", error);
                if (result) Session.set("insertLibraryPiece_result", result);
            });
        };
        _removeLibraryPiece = function(libraryPiece) {
            check(libraryPiece, LibraryPiece);
            _removeLibraryPieceById(libraryPiece._id);
        };
        _removeLibraryPieceById = function(id) {
            check(id, String);
            Session.set("removeLibraryPieceById_error", null);
            Session.set("removeLibraryPieceById_result", null);
            Meteor.call('removeLibraryPieceById', id, function (error, result) {
                if (error) Session.set("removeLibraryPieceById_error", error);
                if (result) Session.set("removeLibraryPieceById_result", result);
            });
        };
        _removeAll = function() {
            Session.set("removeAllLibraryPieces_error", null);
            Session.set("removeAllLibraryPieces_result", null);
            Meteor.call('removeAllLibraryPieces', function (error, result) {
                if (error) Session.set("removeAllLibraryPieces_error", error);
                if (result) Session.set("removeAllLibraryPieces_result", result);
            });
        };

        return {
            insertLibraryPiece: _insertLibraryPiece,
            removeLibraryPiece: _removeLibraryPiece,
            removeLibraryPieceById: _removeLibraryPieceById,
            removeAll: _removeAll,
            findLibraryPieceBy_Id: _findLibraryPieceBy_Id,
            findLibraryPieceBy_Name_Composer: _findLibraryPieceBy_Name_Composer,
            cursorOnLibraryPieces: _cursorOnLibraryPieces
        }
    }
})()