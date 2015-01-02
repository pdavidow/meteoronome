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
    addMeasuresToPiece: function(libraryPiece) {
        libraryPiece.addMeasures(this.measures);
    },
    get measures() {
        Intent.subtypeMustImplement();
    },
    applyMetronomeSetting: function(setting) {
    },
    get piece() {
        return this._piece = this._piece || this._makePiece();
    },
    get factoryPiece() {
        var libraryPiece = new LibraryPiece(this.myName, this.composer, this.catalogReference);
        this.addMeasuresToPiece(libraryPiece);
        this.applyMetronomeSetting(libraryPiece.metronomeSetting);
        return libraryPiece;
    },
    _makePiece: function() {
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