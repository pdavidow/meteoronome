Helper = (function() {
    _isLoop = function() {
        var piece = _currentPiece();
        if (piece) return piece.metronomeSetting.isLoop;
        return false;
    };
    _isLibraryPieceSelected = function() {
        return selectedLibraryPiece.get() ? true : false;
    };
    _isUseEntirePiece = function() {
        var piece = _currentPiece();
        if (piece) return piece.metronomeSetting.isUseEntirePiece;
        return true;
    };
    _currentPiece = function() {
        return UserPieceManager.getCurrentPiece();
    };
    _currentPieceId = function() {
        return UserPieceManager.getCurrentPieceIdFromUser();
    },
    _metronomeSetting = function() {
        return _currentPiece().metronomeSetting;
    };
    _isMetronomeStarted = function() {
        var piece = _currentPiece();
        //if (piece) return piece.metronome.isStarted;  // https://github.com/meteor/meteor/issues/3901
        if (piece) return piece.metronome.isStartedQQQQQQQQQQ();
        return false;
    };
    _setCurrentPieceToFirstOrNull = function() {
        var firstPiece = _.first(PieceManager.cursorOnPiecesForCurrentUser().fetch());
        var id = (firstPiece ? firstPiece._id : null);
        UserPieceManager.updateCurrentPieceId(id);
    };

    return {
        isLoop: _isLoop,
        isLibraryPieceSelected: _isLibraryPieceSelected,
        isUseEntirePiece: _isUseEntirePiece,
        currentPiece: _currentPiece,
        currentPieceId: _currentPieceId,
        metronomeSetting: _metronomeSetting,
        isMetronomeStarted: _isMetronomeStarted,
        setCurrentPieceToFirst: _setCurrentPieceToFirstOrNull
    }
})();

Template.registerHelper("isLoop", Helper.isLoop);
Template.registerHelper("isLibraryPieceSelected", Helper.isLibraryPieceSelected);
Template.registerHelper("isUseEntirePiece", Helper.isUseEntirePiece);
Template.registerHelper("isMetronomeStarted", Helper.isMetronomeStarted);
Template.registerHelper("metronomeSetting", Helper.metronomeSetting);
Template.registerHelper("currentPieceId", Helper.currentPieceId);
