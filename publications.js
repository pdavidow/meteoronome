if (Meteor.isServer) {
    /*
    Meteor.publish("myPieces", function() {
        return Pieces.find({ownerId: this.userId});
    });
    */
    Meteor.publish("allLibraryPieces", function() {
        //return LibraryPieceManager.cursorOnLibraryPieces(); todo
        return LibraryPieces.find({});
    });
}

