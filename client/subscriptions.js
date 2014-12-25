if (Meteor.isClient) {
    Meteor.subscribe("PieceCollection");
    Meteor.subscribe("LibraryPieceCollection");
}