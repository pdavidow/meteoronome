Librarian = {
    get specSubtypes() {
        return ([
            LibraryPieceSpec_Sample1,
            LibraryPieceSpec_Sample2,
            LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous
        ]);
    },
    reset: function() {
        Meteor.call('libraryPieceHolderRemoveAll', function(error, result){});
        this._repopulateDatabase();
    },
    _repopulateDatabase: function() {
        this.specSubtypes.forEach(function(each) {
            LibraryPieceManager.insertLibraryPiece(each.factoryPiece);
        });
    }
}