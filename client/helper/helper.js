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
        var piece = _currentPiece();
        if (piece) return piece._id;
        return null;
    },
    _metronomeSetting = function() {
        return _currentPiece().metronomeSetting;
    };
    _isMetronomeStarted = function() {
        var piece = _currentPiece();
        if (piece) return piece.metronome.isStarted;  //todo https://github.com/meteor/meteor/issues/3901
        return false;
    };
    _setCurrentPieceToFirst = function() {
        var firstPiece = _.first(PieceManager.cursorOnPiecesForCurrentUser().fetch());
        var id = firstPiece ? firstPiece._id : null;
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
        setCurrentPieceToFirst: _setCurrentPieceToFirst
    }
})();

Template.registerHelper("isLoop", Helper.isLoop);
Template.registerHelper("isLibraryPieceSelected", Helper.isLibraryPieceSelected);
Template.registerHelper("isUseEntirePiece", Helper.isUseEntirePiece);
Template.registerHelper("metronomeSetting", Helper.metronomeSetting);
Template.registerHelper("currentPieceId", Helper.currentPieceId);
