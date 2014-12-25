if (Meteor.isServer) {
    Meteor.publish("pieces", function() {
        PieceCollection.find({ownerId: this.userId})
    });
    Meteor.publish("libraryPieces", function() {
        LibraryPieceCollection.find()
    });
}
