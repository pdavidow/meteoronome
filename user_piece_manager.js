UserPieceManager = (function() {
    Meteor.methods({
        updateCurrentPieceId: function(id) {
            var currentUserId;
            console.log("updateCurrentPieceId isSimulation?", this.isSimulation);
            check(id, String);
            currentUserId = Meteor.userId();
            if (!currentUserId) return null;
            return Meteor.users.update(currentUserId, {$set: {'currentPieceId': id}});
        }
    });

    _getCurrentPieceIdFromUser = function() {
        var currentUser, id;
        currentUser = Meteor.user();
        if (!currentUser) return null;
        id = currentUser.currentPieceId;
        return id ? id : null;
    };
    _updateCurrentPieceId = function(id) {
        var callback = function (error, result) {
            if (result) _broadcastCurrentPieceId(id);
        };
        Meteor.call("updateCurrentPieceId", id, callback);
    };
    _broadcastCurrentPieceId = function(id) {
        check(id, Match.OneOf(String, null));
        Session.set("currentPieceId", id);
    };
    _broadcastCurrentPieceIdFromUser = function() {
        _broadcastCurrentPieceId(_getCurrentPieceIdFromUser());
    };

    return {
        getCurrentPieceIdFromUser: _getCurrentPieceIdFromUser,
        updateCurrentPieceId: _updateCurrentPieceId,
        broadcastCurrentPieceIdFromUser: _broadcastCurrentPieceIdFromUser
    }
})()
