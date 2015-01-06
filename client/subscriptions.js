if (Meteor.isClient) {
    Meteor.subscribe("PieceHolders");
    Meteor.subscribe("LibraryPieceHolders");
}