if (Meteor.isClient) {
    Meteor.startup(function () {
        Audio.initializeSound_onFinishedLoading(function() {
            console.log("audio finished loading");
        });
        SimpleTestModuleRunner.run();
        console.log("LibraryPieceSpec_Test.pieceHolder.piece", LibraryPieceSpec_Test.pieceHolder.piece);
    });
}
