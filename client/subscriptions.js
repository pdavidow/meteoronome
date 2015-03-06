if (Meteor.isClient) {
    Meteor.subscribe("userData");
    Meteor.subscribe("myPieces");
    Meteor.subscribe("allLibraryPieces");
}
