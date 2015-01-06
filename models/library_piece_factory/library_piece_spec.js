LibraryPieceFactorySpec = {
    get reset() {
        if (this._pieceHolder) {
            Meteor.call('libraryPieceHolderRemove', this._pieceHolder._id, function (error, result) {});
            this._pieceHolder = null;
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
        LibraryPieceHolderManager.insertLibraryPiece(piece);
        return LibraryPieceHolderManager.findHolderForNameComposer(piece.name, piece.composer);
     }
};