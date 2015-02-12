if (Meteor.isClient) {
    var selectedLibraryPiece = new ReactiveVar(null);

    var isMetronomeStarted = function() {
        var libraryPiece = selectedLibraryPiece.get();
        if (libraryPiece) return libraryPiece.metronome.isStarted;
        return false;
    };
    var isMetronomeStopped = function() {
        var libraryPiece = selectedLibraryPiece.get();
        if (libraryPiece) return libraryPiece.metronome.isStopped;
        return true;
    };
    var isLoop = function() {
        var libraryPiece = selectedLibraryPiece.get();
        if (libraryPiece) return libraryPiece.metronomeSetting.isLoop;
        return false;
    };
    var isLibraryPieceSelected = function() {
        return selectedLibraryPiece.get() ? true : false;
    };
    var isUseEntirePiece = function() {
        var libraryPiece = selectedLibraryPiece.get();
        if (libraryPiece) return libraryPiece.metronomeSetting.isUseEntirePiece;
        return true;
    };

    Template.registerHelper("isMetronomeStarted", isMetronomeStarted);
    Template.registerHelper("isMetronomeStopped", isMetronomeStopped);
    Template.registerHelper("isLoop", isLoop);
    Template.registerHelper("isLibraryPieceSelected", isLibraryPieceSelected);
    Template.registerHelper("isUseEntirePiece", isUseEntirePiece);

    Template.main.rendered = function() {
        var id = $('#libraryPieceList').val();
        if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
    };

    Template.main.helpers({
        isLibraryPieceListDisabled: function() {
            if (isLibraryPieceSelected()) return isMetronomeStarted();
            return false;
        },
        isStartButtonDisabled: function() {
            if (isLibraryPieceSelected()) return isMetronomeStarted();
            return true;
        },
        isStopButtonDisabled: function() {
            if (isLibraryPieceSelected()) return isMetronomeStopped();
            return true;
        },
        pieceName: function(){
            var libraryPiece = selectedLibraryPiece.get();
            if (libraryPiece) return libraryPiece.name;
            return "";
        },
        cursorOnLibraryPieces: function() {
            return LibraryPieceManager.cursorOnLibraryPieces();
        }
    });
    Template.main.events({
        "click #start": function() {
            var libraryPiece = selectedLibraryPiece.get();
            if (libraryPiece) libraryPiece.startMetronome();
        },
        "click #stop": function() {
            var libraryPiece = selectedLibraryPiece.get();
            if (libraryPiece) libraryPiece.stopMetronome();
        },
        "change #libraryPieceList": function() {
            // http://stackoverflow.com/questions/10659097/jquery-get-selected-option-from-dropdown
            var id = $('#libraryPieceList option:selected').val();
            if (id) selectedLibraryPiece.set(LibraryPieceManager.findLibraryPieceBy_Id(id));
        }
    });

    Template.status.helpers({
        currentBeat: function() {
            var libraryPiece = selectedLibraryPiece.get();
            libraryPiece.metronome.currentBeatDep.depend();
            return libraryPiece.metronome.currentBeat.displayLocationDescription;
        },
        loopCount: function() {
            var count = selectedLibraryPiece.get().metronome.loopCount;
            return count == 0 ? "---" : count.toString();
        }
    });

    Template.setting.helpers({
        classicTicksPerMinute: function() {
            return selectedLibraryPiece.get().metronomeSetting.classicTicksPerMinute;
        },
        classicTicksPerBeat: function() {
            return selectedLibraryPiece.get().metronomeSetting.classicTicksPerBeat;
        },
        measureAmount: function() {
            return selectedLibraryPiece.get().measures.length;
        },
        beginBeatIndex: function() {
            return IndexAdaptor.shiftUp(selectedLibraryPiece.get().metronomeSetting.beginBeatIndex);
        },
        endBeatIndex: function() {
            return IndexAdaptor.shiftUp(selectedLibraryPiece.get().metronomeSetting.endBeatIndex);
        },
        beginMeasureIndex: function() {
            return IndexAdaptor.shiftUp(selectedLibraryPiece.get().metronomeSetting.beginMeasureIndex);
        },
        endMeasureIndex: function() {
            return IndexAdaptor.shiftUp(selectedLibraryPiece.get().metronomeSetting.endMeasureIndex);
        },
        isDisableIndexField: function() {
            return isMetronomeStarted() || isUseEntirePiece();
        }
    });
    Template.setting.events({
        "change #classicTicksPerMinute": function () {
            var int = parseInt($('#classicTicksPerMinute').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.classicTicksPerMinute = int;
        },
        "change #classicTicksPerBeat": function () {
            var int = parseInt($('#classicTicksPerBeat').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.classicTicksPerBeat = int;
        },
        "click .check#isLoop": function () {
            selectedLibraryPiece.get().metronomeSetting.toggleIsLoop();
        },
        "click .check#isUseEntirePiece": function () {
            selectedLibraryPiece.get().metronomeSetting.toggleIsUseEntirePiece();
        },
        "change #beginBeatIndex": function () {
            var int = parseInt($('#beginBeatIndex').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.beginBeatIndex = IndexAdaptor.shiftDown(int);
        },
        "change #beginMeasureIndex": function () {
            var int = parseInt($('#beginMeasureIndex').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.beginMeasureIndex = IndexAdaptor.shiftDown(int);
        },
        "change #endBeatIndex": function () {
            var int = parseInt($('#endBeatIndex').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.endBeatIndex = IndexAdaptor.shiftDown(int);
        },
        "change #endMeasureIndex": function () {
            var int = parseInt($('#endMeasureIndex').val(), 10);
            selectedLibraryPiece.get().metronomeSetting.endMeasureIndex = IndexAdaptor.shiftDown(int);
        }
    });
}
