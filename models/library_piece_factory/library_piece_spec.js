LibraryPieceFactorySpec = {
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
    get persistedPiece() {
        return this._persistedPiece = this._persistedPiece || this.makePersistedPiece();
    },
    makePersistedPiece: function() {
        var piece = this.factoryPiece;
        LibraryPieceManager.insertLibraryPiece(piece);
        return LibraryPieceManager.findLibraryPieceForNameComposer(piece.name, piece.composer);
    },
    resetPersistedPiece: function() {
        if (this._persistedPiece) {LibraryPieceManager.removeLibraryPiece(this._persistedPiece)};
        this._persistedPiece = null;
    },
    get factoryPiece() {
        return this._factoryPiece = this._factoryPiece || this.makeFactoryPiece();
    },
    makeFactoryPiece: function() {
        var libraryPiece = new LibraryPiece(this.myName, this.composer, this.catalogReference);
        this.addMeasuresToPiece(libraryPiece);
        this.applyMetronomeSetting(libraryPiece.metronomeSetting);
        return libraryPiece;
    },
    resetFactoryPiece: function() {
        this._factoryPiece = null;
    },
    reset: function() {
        this.resetPersistedPiece();
        this.resetFactoryPiece();
    }
};