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
    get pieceHolder() {
        return this._pieceHolder = this._pieceHolder || this.makePieceHolder();
    },
    get factoryPiece() {
        var libraryPiece = new LibraryPiece(this.myName, this.composer, this.catalogReference);
        this.addMeasuresToPiece(libraryPiece);
        this.applyMetronomeSetting(libraryPiece.metronomeSetting);
        return libraryPiece;
    },
    makePieceHolder: function() {
        var piece = this.factoryPiece;
        console.log("make_piece piece", piece);
        Meteor.call('libraryPieceHolderInsert', {piece: piece}, function(error, result){
            console.log("make_piece libraryPieceInsert error", error);
            console.log("make_piece libraryPieceInsert result", result);
        });
        console.log("make_piece LibraryPieceHolders", LibraryPieceHolders.findOne({},{piece: {name: piece.name, composer: piece.composer}}));
        return LibraryPieceHolders.findOne({},{piece: {name: piece.name, composer: piece.composer}});
    }
};