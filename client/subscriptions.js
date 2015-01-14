if (Meteor.isClient) {
    Meteor.subscribe("myPieceHolders");
    Meteor.subscribe("allLibraryPieceHolders");
}