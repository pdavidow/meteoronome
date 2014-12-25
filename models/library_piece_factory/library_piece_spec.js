LibraryPieceFactorySpec = {
    get reset() {
        if (this._piece) {
            Meteor.call('libraryPieceRemove', this._piece._id, function (error, result) {});
            this._piece = null;
        }
    },
    get myName() { // Cannot redefine property: name
        Intent.subtypeMustImplement();
    },
    get composer() {
        Intent.subtypeMustImplement();
    },
    get catalogReference() {
        return "";
    },
    get measures() {
        Intent.subtypeMustImplement();
    },
    get piece() {
        return this._piece = this._piece || this.make_piece();
    },
    get factoryPiece() {
        var libraryPiece = new LibraryPiece(this.myName, this.composer, this.catalogReference);
        libraryPiece.addMeasures(this.measures);
        return libraryPiece;
    },
    make_piece: function() {
        var piece = this.factoryPiece;
        console.log("make_piece piece", piece);
        Meteor.call('libraryPieceInsert', piece, function(error, result){
            console.log("make_piece libraryPieceInsert error", error);
            console.log("make_piece libraryPieceInsert result", result);
        });
        console.log("make_piece", LibraryPieceCollection.findOne({name: piece.name, composer: piece.composer}));
        return LibraryPieceCollection.findOne({name: piece.name, composer: piece.composer});
    }
};