if (Meteor.isClient) {
    Meteor.startup(function () {
        Audio.initializeSound_onFinishedLoading(function() {
            console.log("finishedLoading");
        });
        var piece = LibraryPieceSpec_SplashScreen.factoryPiece;
        Session.set("piece", piece);
    });
}
