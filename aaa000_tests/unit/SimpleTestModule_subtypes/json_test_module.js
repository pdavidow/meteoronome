JSONTestModule = Object.create(AbstractSimpleTestModule);

_.extend(JSONTestModule, {
    test_0: function () {
        var lp;
        lp = LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous.factoryPiece;
        console.log("ASSERT: a", lp == JSON.parse(JSON.stringify(lp)));
    },
    test_1: function () {
        var p;
        Meteor.insecureUserLogin("user1");
        p = LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous.factoryPiece.asPieceForCurrentUser();
        console.log("ASSERT: a", p == JSON.parse(JSON.stringify(p)));
    }
});



