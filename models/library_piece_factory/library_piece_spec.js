LibraryPieceFactorySpec = {
    get myName() { // Cannot redefine property "name"
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
    get factoryPiece() {
        var libraryPiece = new LibraryPiece(this.myName, this.composer, this.catalogReference);
        this.addMeasuresToPiece(libraryPiece);
        this.applyMetronomeSetting(libraryPiece.metronomeSetting);
        return libraryPiece;
    }
};