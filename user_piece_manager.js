////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
Temp_Meteor = (function() {  //todo workaround for lack of package
    _userId = function() {
        return Temp_VirtualUser.userId();
    };
    _user = function() {
        return Temp_VirtualUser;
    };

    return {
        userId: _userId,
        user: _user
    }
})();

Temp_VirtualUser = (function() {  //todo workaround for lack of user package
    var _currentPieceId = null;

    _userId = function() {
        return 'vt45t5u8otrhjio';
    };
    _getCurrentPieceId = function() {
        return _currentPieceId;
    };
    _setCurrentPieceId = function(id) {
        check(id, Match.OneOf(String, null));
        _currentPieceId = id;
    };

    return {
        userId: _userId,
        getCurrentPieceId: _getCurrentPieceId,
        setCurrentPieceId: _setCurrentPieceId
    }
})();
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

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
        return Temp_VirtualUser.getCurrentPieceId(); // todo temp

        var currentUser, id;
        currentUser = Temp_Meteor.user(); // Meteor.user(); todo
        if (!currentUser) return null;
        id = currentUser.currentPieceId;
        return id ? id : null;
    };
    _updateCurrentPieceId = function(id) {
        Temp_VirtualUser.setCurrentPieceId(id); // todo temp
        _setCurrentPieceFromId(id);             // todo temp
        return;                                 // todo temp

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
