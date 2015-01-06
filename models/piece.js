var className = "Piece";

Piece = function (name, composer, catalogReference, ownerId) {
    LibraryPiece.call(this, name, composer, catalogReference);

    check(ownerId, String);
    this.ownerId = ownerId;
};

Piece.prototype = Object.create(LibraryPiece.prototype);
Piece.prototype.constructor = Piece;

_.extend(Piece, {
    fromJSONValue: function(value) {
        var measures = EJSON.fromJSONValue(value.measures);

        var piece =  new Piece(
            EJSON.fromJSONValue(value.name),
            EJSON.fromJSONValue(value.composer),
            EJSON.fromJSONValue(value.catalogReference),
            EJSON.fromJSONValue(value.ownerId)
        );
        piece.addMeasures(measures);
        piece.metronomeSetting = EJSON.fromJSONValue(value.metronomeSetting);

        return piece;
    }
});

_.extend(Piece.prototype, {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        var value = LibraryPiece.prototype.toJSONValue.call(this); // super ES6
        return _.extend(value, {
            ownerId: EJSON.toJSONValue(this.ownerId)
        });
    }/*,
    displayString: function () {
        var result = LibraryPiece.prototype.displayString.call(this); // super ES6
        result += ', ' + this.ownerId;
        return result;
    }*/
});

EJSON.addType(className, Piece.fromJSONValue);

