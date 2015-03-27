UserPieceManager = (function() {
    var _currentPiece = null;
    var _currentPieceDep = new Tracker.Dependency;

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
            if (result) _setCurrentPieceFromId(id);
        };
        Meteor.call("updateCurrentPieceId", id, callback);
    };
    _setCurrentPieceFromId = function(id) {
        check(id, Match.OneOf(String, null));
        _currentPiece = PieceManager.findPieceBy_Id(id);
        _currentPieceDep.changed();
    };
    _setCurrentPieceFromUser = function() {
        _setCurrentPieceFromId(_getCurrentPieceIdFromUser());
    };
    _getCurrentPiece = function() {
        _currentPieceDep.depend();
        return _currentPiece;
    };
    _getCurrentPieceDep = function() {
        return _currentPieceDep;
    };

    return {
        getCurrentPieceIdFromUser: _getCurrentPieceIdFromUser,
        updateCurrentPieceId: _updateCurrentPieceId,
        setCurrentPieceFromUser: _setCurrentPieceFromUser,
        getCurrentPiece: _getCurrentPiece,
        getCurrentPieceDep: _getCurrentPieceDep // todo used?
    }
})()
