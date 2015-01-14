if (Meteor.isServer) {
    Meteor.publish("myPieceHolders", function() {
        return PieceHolders.find({ownerId: this.userId});
    });
    Meteor.publish("allLibraryPieceHolders", function() {
        return LibraryPieceHolders.find();
    });
}
