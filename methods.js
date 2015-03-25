Meteor.methods({
    pieceInsert: function(piece) {
        console.log('stub? pieceInsert', this.isSimulation);
        check(Temp_Meteor.userId(), String);
        // check(Meteor.userId(), String); todo
        check(piece, Piece);

        var redundancy = PieceCollection.findOne({name:piece.name, composer:piece.composer, ownerId:Temp_Meteor.userId()});
        //var redundancy = PieceCollection.findOne({name:piece.name, composer:piece.composer, ownerId:Meteor.userId()}); // todo
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
    }
});

