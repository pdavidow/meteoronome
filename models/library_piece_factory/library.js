Library = {
    get specSubtypes() {
        return ([
            LibraryPieceSpec_Test,
            LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous
        ]);
    },
    get pieces() {
        return this.specSubtypes.map(function(each) {each.piece});
    },
    reset: function() {
        this.specSubtypes.forEach(function(each) {each.reset()});
    }
}