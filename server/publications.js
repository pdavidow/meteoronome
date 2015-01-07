if (Meteor.isServer) {
    Meteor.publish("pieces", function() {
        PieceHolders.find({ownerId: this.userId})
    });
    Meteor.publish("libraryPieces", function() {
        LibraryPieceHolders.find()
    });
}
