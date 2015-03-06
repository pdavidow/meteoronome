if (Meteor.isServer) {
    Meteor.publish("myPieces", function() {
        return Pieces.find({ownerId: this.userId});
    });
    Meteor.publish("allLibraryPieces", function() {
        return LibraryPieces.find({});
    });
    Meteor.publish("userData", function () {
        var defaultInclusionFields = {
                emails:1,
                profile:1,
                username:1,
                currentPieceId:1
        };
        if (this.userId) {
            return Meteor.users.find({_id: this.userId}, {fields: defaultInclusionFields});
        } else {
            this.ready();
        }
    });
}

