PieceManager = (function() {
    Pieces = new Mongo.Collection('pieces', {
        transform: function (doc) {
            return Piece.fromJSONValue(doc);
        }
    });

    Meteor.methods({
        insertPieceAsJSON: function(object) {
            check(object, Match.ObjectIncluding({name: String, composer: String, ownerId: String}));
            var duplicate = _findPieceBy_Name_Composer_OwnerId(object.name, object.composer, object.ownerId);
            if (duplicate) throw new Meteor.Error("insertPieceAsJSON failed", "duplicate found");
            console.log("insertPieceAsJSON isSimulation?", this.isSimulation);
            return Pieces.insert(object);
        },
        removePieceById: function(id) {
            console.log("removePieceById isSimulation?", this.isSimulation);
            check(id, String);
            return Pieces.remove(id);
        },
        removeAllPiecesForOwnerId: function(ownerId) {
            console.log("removeAllPiecesForOwnerId isSimulation?", this.isSimulation);
            check(ownerId, String);
            return Pieces.remove({ownerId: ownerId});
        }
    });

    _findPieceBy_Id = function(id) {
        check(id, Match.OneOf(String, null));
        if (_.isNull(id)) return null;
        return Pieces.findOne({"_id": id});
    };
    _findPieceBy_Name_Composer_OwnerId = function(name, composer, ownerId) {
        check(name, String);
        check(composer, String);
        check(ownerId, String);
        return Pieces.findOne({"name": name, "composer": composer, "ownerId": ownerId});
    };
    _cursorOnAllPieces = function() {
        return Pieces.find({}, {sort: [["composer", "asc"], ["name", "asc"], ["catalogReference", "asc"], ["publicationDate", "asc"]]});
    };
    _cursorOnPiecesForOwnerId = function(id) {
        check(id, String);
        return Pieces.find({ownerId: id}, {sort: [["composer", "asc"], ["name", "asc"], ["catalogReference", "asc"], ["publicationDate", "asc"]]});
    };
    _cursorOnPiecesForCurrentUser = function() {
        var id = Temp_Meteor.userId(); // Meteor.userId(); todo
        check(id, String);
        return _cursorOnPiecesForOwnerId(id);
    };

    if (Meteor.isClient) {
        _insertPiece = function(piece, callback) {
            check(piece, Piece);
            var object = piece.toJSONValue();
            if (!callback) {
                Session.set("insertPiece_error", null);
                Session.set("insertPiece_result", null);
                callback = function (error, result) {
                    if (error) Session.set("insertPiece_error", error);
                    if (result) Session.set("insertPiece_result", result);
                };
            }
            Meteor.call('insertPieceAsJSON', object, callback);
        };
        _removePiece = function(piece) {
            check(piece, Piece);
            _removePieceById(piece._id);
        };
        _removePieceById = function(id) {
            check(id, String);
            Session.set("removePieceById_error", null);
            Session.set("removePieceById_result", null);
            Meteor.call('removePieceById', id, function (error, result) {
                if (error) Session.set("removePieceById_error", error);
                if (result) Session.set("removePieceById_result", result);
            });
        };
        _removeAllForOwnerId = function(ownerId) {
            Session.set("removeAllPiecesForOwnerId_error", null);
            Session.set("removeAllPiecesForOwnerId_result", null);
            Meteor.call('removeAllPiecesForOwnerId', ownerId, function (error, result) {
                if (error) Session.set("removeAllPiecesForOwnerId_error", error);
                if (result) Session.set("removeAllPiecesForOwnerId_result", result);
            });
        };
        _removeAllForCurrentUser = function() {
            var id = Temp_Meteor.userId(); // Meteor.userId(); todo
            check(id, String);
            _removeAllForOwnerId(id);
        };
    };

    serverAPI = {
        findPieceBy_Id: _findPieceBy_Id,
        findPieceBy_Name_Composer_OwnerId: _findPieceBy_Name_Composer_OwnerId,
        cursorOnAllPieces: _cursorOnAllPieces, // pub/sub nonwithstanding
        cursorOnPiecesForOwnerId: _cursorOnPiecesForOwnerId,
        cursorOnPiecesForCurrentUser: _cursorOnPiecesForCurrentUser
    };
    if (Meteor.isServer) return serverAPI;

    if (Meteor.isClient) {
        clientAPI = _.extend(serverAPI, {
            insertPiece: _insertPiece,
            removePiece: _removePiece,
            removePieceById: _removePieceById,
            removeAllForOwnerId: _removeAllForOwnerId,
            removeAllForCurrentUser: _removeAllForCurrentUser
        });
        return clientAPI;
    };
})()