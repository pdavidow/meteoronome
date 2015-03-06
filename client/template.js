var selectedLibraryPiece;

selectedLibraryPiece = new ReactiveVar(null);

var currentPiece = function() {
    var id = Session.get("currentPieceId");
    if (!id) return null;
    return PieceManager.findPieceBy_Id(id);
};
var isLoop = function() {
    var piece = currentPiece();
    if (piece) return piece.metronomeSetting.isLoop;
    return false;
};
var isLibraryPieceSelected = function() {
    return selectedLibraryPiece.get() ? true : false;
};
var isUseEntirePiece = function() {
    var piece = currentPiece();
    if (piece) return piece.metronomeSetting.isUseEntirePiece;
    return true;
};

Template.registerHelper("isLoop", isLoop);
Template.registerHelper("isLibraryPieceSelected", isLibraryPieceSelected);
Template.registerHelper("isUseEntirePiece", isUseEntirePiece);

Template.main.rendered = function() {
    UserPieceManager.broadcastCurrentPieceIdFromUser();
};
Template.main.helpers({
    isStartButtonDisabled: function() {
        var piece = currentPiece();
        if (piece) return piece.metronome.isStarted;
        return true;
    },
    isStopButtonDisabled: function() {
        var piece = currentPiece();
        if (piece) return piece.metronome.isStopped;
        return true;
    }
});
Template.main.events({
    "click #start": function() {
        var piece = currentPiece();
        if (piece) piece.startMetronome();
    },
    "click #stop": function() {
        var piece = currentPiece();
        if (piece) piece.stopMetronome();
    }
});

Template.libraryPieces.rendered = function() {
    var id = $('#libraryPieceList').val();
    if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
};
Template.libraryPieces.helpers({
    isLibraryPieceListDisabled: function() {
        return false;
    },
    isImportButtonDisabled: function() {
        if (Meteor.user()) return false;
        return true;
    },
    cursorOnLibraryPieces: function() {
        return LibraryPieceManager.cursorOnLibraryPieces();
    }
});
Template.libraryPieces.events({
    "click #import": function() {
        var callback, libraryPiece;
        libraryPiece = selectedLibraryPiece.get();
        if (!libraryPiece) return;
        var piece = libraryPiece.asPieceForCurrentUser();
        callback = function (error, result) {
            if (result) UserPieceManager.updateCurrentPieceId(result);
        };
        PieceManager.insertPiece(piece, callback);
    },
    "change #libraryPieceList": function() {
        // http://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
        var id = $('#libraryPieceList option:selected').val();
        if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
    }
});

Template.pieces.rendered  = function() {
    $('#pieceList option:selected').val(UserPieceManager.getCurrentPieceIdFromUser());
};
Template.pieces.helpers({
    isPieceListDisabled: function() {
        var piece = currentPiece();
        if (piece) return piece.metronome.isStarted;
        return false;
    },
    cursorOnPiecesForCurrentUser: function() {
        return PieceManager.cursorOnPiecesForCurrentUser();
    }
});
Template.pieces.events({
    "change #pieceList": function() {
        // http://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
        var id = $('#pieceList option:selected').val();
        if (id) UserPieceManager.updateCurrentPieceId(id);
    }
});

Template.status.helpers({
    currentBeat: function() {
        var piece = currentPiece();
        if (!piece) return;
        piece.metronome.currentBeatDep.depend();
        return piece.metronome.currentBeat.displayLocationDescription;
    },
    loopCount: function() {
        var count;
        var piece = currentPiece();
        if (!piece) return;
        count = piece.metronome.loopCount;
        return count == 0 ? "---" : count.toString();
    }
});

Template.setting.helpers({
    classicTicksPerMinute: function() {
        var piece = currentPiece();
        if (!piece) return;
        return piece.metronomeSetting.classicTicksPerMinute;
    },
    classicTicksPerBeat: function() {
        var piece = currentPiece();
        if (!piece) return;
        return piece.metronomeSetting.classicTicksPerBeat;
    },
    measureAmount: function() {
        var piece = currentPiece();
        if (!piece) return;
        return piece.measures.length;
    },
    beginBeatIndex: function() {
        var piece = currentPiece();
        if (!piece) return;
        return IndexAdaptor.shiftUp(piece.metronomeSetting.beginBeatIndex);
    },
    endBeatIndex: function() {
        var piece = currentPiece();
        if (!piece) return;
        return IndexAdaptor.shiftUp(piece.metronomeSetting.endBeatIndex);
    },
    beginMeasureIndex: function() {
        var piece = currentPiece();
        if (!piece) return;
        return IndexAdaptor.shiftUp(piece.metronomeSetting.beginMeasureIndex);
    },
    endMeasureIndex: function() {
        var piece = currentPiece();
        if (!piece) return;
        return IndexAdaptor.shiftUp(piece.metronomeSetting.endMeasureIndex);
    },
    isDisableIndexField: function() {
        return isMetronomeStarted() || isUseEntirePiece();
    }
});
Template.setting.events({
    "change #classicTicksPerMinute": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#classicTicksPerMinute').val(), 10);
        piece.metronomeSetting.classicTicksPerMinute = int;
    },
    "change #classicTicksPerBeat": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#classicTicksPerBeat').val(), 10);
        piece.metronomeSetting.classicTicksPerBeat = int;
    },
    "click .check#isLoop": function () {
        var piece = currentPiece();
        if (!piece) return;
        piece.metronomeSetting.toggleIsLoop();
    },
    "click .check#isUseEntirePiece": function () {
        var piece = currentPiece();
        if (!piece) return;
        piece.metronomeSetting.toggleIsUseEntirePiece();
    },
    "change #beginBeatIndex": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#beginBeatIndex').val(), 10);
        piece.metronomeSetting.beginBeatIndex = IndexAdaptor.shiftDown(int);
    },
    "change #beginMeasureIndex": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#beginMeasureIndex').val(), 10);
        piece.metronomeSetting.beginMeasureIndex = IndexAdaptor.shiftDown(int);
    },
    "change #endBeatIndex": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#endBeatIndex').val(), 10);
        piece.metronomeSetting.endBeatIndex = IndexAdaptor.shiftDown(int);
    },
    "change #endMeasureIndex": function () {
        var int;
        var piece = currentPiece();
        if (!piece) return;
        int = parseInt($('#endMeasureIndex').val(), 10);
        piece.metronomeSetting.endMeasureIndex = IndexAdaptor.shiftDown(int);
    }
});

