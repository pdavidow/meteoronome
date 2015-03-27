LibraryImportTestModule = Object.create(AbstractSimpleTestModule);

_.extend(LibraryImportTestModule, {
    test_0: function () {
        Meteor.insecureUserLogin("user1");

        var userId1 = Meteor.userId();
        var libraryPiece1 = LibraryPieceSpec_Sample1.factoryPiece;
        var libraryPiece2 = LibraryPieceSpec_Sample2.factoryPiece;
        var piece1 = libraryPiece1.asPieceForOwnerId(userId1);
        var piece2 = libraryPiece2.asPieceForCurrentUser();
        var cursor = PieceManager.cursorOnPiecesForCurrentUser();

        console.log("ASSERT: LibraryImportTestModule.test_0.aa", piece1.measures.length == libraryPiece1.measures.length);
        console.log("ASSERT: LibraryImportTestModule.test_0.a", cursor.fetch().length == 0);

        PieceManager.insertPiece(piece1);
        console.log("ASSERT: LibraryImportTestModule.test_0.b", cursor.fetch().length == 1);

        var function1 = function() {
            PieceManager.removeAllForOwnerId(userId1);
            console.log("ASSERT: LibraryImportTestModule.test_0.c", cursor.fetch().length == 0);
        };
        Meteor.setTimeout(function1, 10000);

        var function2 = function() {
            PieceManager.insertPiece(piece1);
        };
        Meteor.setTimeout(function2, 20000);

        var function3 = function() {
            var pieces = cursor.fetch();
            console.log("ASSERT: LibraryImportTestModule.test_0.d", pieces.length == 1);
            console.log("ASSERT: LibraryImportTestModule.test_0.e", Session.get("insertPiece_error") == null);
            console.log("ASSERT: LibraryImportTestModule.test_0.f", Session.get("insertPiece_result") == _.first(pieces)._id);

            PieceManager.removeAllForCurrentUser();
        };
        Meteor.setTimeout(function3, 30000);

        var function4 = function() {
            console.log("ASSERT: LibraryImportTestModule.test_0.g", Session.get("removeAllPiecesForOwnerId_error") == null);
            console.log("ASSERT: LibraryImportTestModule.test_0.h", Session.get("removeAllPiecesForOwnerId_result") == 1);
            console.log("ASSERT: LibraryImportTestModule.test_0.i", cursor.fetch().length == 0);

            PieceManager.insertPiece(piece1);
        };
        Meteor.setTimeout(function4, 40000);

        var function5 = function() {
            var pieces = cursor.fetch();
            console.log("ASSERT: LibraryImportTestModule.test_0.j", pieces.length == 1);
            console.log("ASSERT: LibraryImportTestModule.test_0.k", Session.get("insertPiece_error") == null);
            console.log("ASSERT: LibraryImportTestModule.test_0.l", Session.get("insertPiece_result") == _.first(pieces)._id);

            PieceManager.insertPiece(piece1); // duplicate
        };
        Meteor.setTimeout(function5, 50000);

        var function6 = function() {
            var pieces = cursor.fetch();
            console.log("ASSERT: LibraryImportTestModule.test_0.m", pieces.length == 1);
            var error = Session.get("insertPiece_error");
            console.log("ASSERT: LibraryImportTestModule.test_0.n", error.errorType == "Meteor.Error");
            console.log("ASSERT: LibraryImportTestModule.test_0.o", error.message == "duplicate found [insertPieceAsJSON failed]");
            console.log("ASSERT: LibraryImportTestModule.test_0.p", Session.get("insertPiece_result") == null);

            PieceManager.insertPiece(piece2);
        };
        Meteor.setTimeout(function6, 60000);

        var function7 = function() {
            var pieces = cursor.fetch();
            console.log("ASSERT: LibraryImportTestModule.test_0.q", pieces.length == 2);
            console.log("ASSERT: LibraryImportTestModule.test_0.r", Session.get("insertPiece_error") == null);
            var id = Session.get("insertPiece_result");
            var found = _.find(pieces, function(each) {return each._id == id});
            console.log("ASSERT: LibraryImportTestModule.test_0.s", found != null);
        };
        Meteor.setTimeout(function7, 70000);

        //Meteor.setTimeout(Meteor.logout, n*1000); todo
    }
});



