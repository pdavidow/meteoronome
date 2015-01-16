if (Meteor.isClient) {
    var testPiece = LibraryPieceSpec_Sample1.factoryPiece;

/* //////////// todo: uncomment when move to latest release
    Template.registerHelper("isMetronomeStarted", function() {
        return testPiece.metronome.isStarted;
    });
    Template.registerHelper("isMetronomeStopped", function() {
        return testPiece.metronome.isStopped;
    });
    Template.registerHelper("isLoop", function() {
        return testPiece.metronomeSetting.isLoop;
    });
*/

    Template.main.helpers({
        isMetronomeStarted: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStarted;
        },
        isMetronomeStopped: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStopped;
        },
        isLoop: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronomeSetting.isLoop;
        },

        pieceName: function(){
            return testPiece.name;
        },
        libraryPieceHolders: function(){
            return LibraryPieceManager.findAllLibraryPieceHolders();
        },
        defaultLibaryPieceHolderSelection: function() {
            // return _.first(Template.instance().libraryPieceHolders()); // todo
            return _.first(LibraryPieceManager.findAllLibraryPieceHolders());
        }
    });
    Template.main.events({
        "click #start": function() {
            testPiece.startMetronome();
        },
        "click #stop": function() {
            testPiece.stopMetronome();
        }
    });

    Template.status.helpers({
        isMetronomeStarted: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStarted;
        },
        isMetronomeStopped: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStopped;
        },
        isLoop: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronomeSetting.isLoop;
        },


        currentBeat: function() {
            testPiece.metronome.currentBeatDep.depend();
            return testPiece.metronome.currentBeat.displayLocationDescription;
        },
        loopCount: function() {
            var count = testPiece.metronome.loopCount;
            return count == 0 ? "---" : count.toString();
        }
    });

    Template.setting.helpers({
        isMetronomeStarted: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStarted;
        },
        isMetronomeStopped: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronome.isStopped;
        },
        isLoop: function() {  //////////// todo: remove when move to latest release
            return testPiece.metronomeSetting.isLoop;
        },

        classicTicksPerMinute: function() {
            return testPiece.metronomeSetting.classicTicksPerMinute;
        },
        classicTicksPerBeat: function() {
            return testPiece.metronomeSetting.classicTicksPerBeat;
        },
        isUseEntirePiece: function() {
            return testPiece.metronomeSetting.isUseEntirePiece;
        },
        measureAmount: function() {
            return testPiece.measures.length;
        },
        beginBeatIndex: function() {
            return IndexAdaptor.shiftUp(testPiece.metronomeSetting.beginBeatIndex);
        },
        endBeatIndex: function() {
            return IndexAdaptor.shiftUp(testPiece.metronomeSetting.endBeatIndex);
        },
        beginMeasureIndex: function() {
            return IndexAdaptor.shiftUp(testPiece.metronomeSetting.beginMeasureIndex);
        },
        endMeasureIndex: function() {
            return IndexAdaptor.shiftUp(testPiece.metronomeSetting.endMeasureIndex);
        },
        isDisableIndexField: function() {
            //return Template.instance().isMetronomeStarted() || Template.instance().isUseEntirePiece; // todo: once at latest release, see if this works
            return testPiece.metronome.isStarted || testPiece.metronomeSetting.isUseEntirePiece;
        }
    });
    Template.setting.events({
        "change #classicTicksPerMinute": function () {
            var int = parseInt($('#classicTicksPerMinute').val(), 10);
            testPiece.metronomeSetting.classicTicksPerMinute = int;
        },
        "change #classicTicksPerBeat": function () {
            var int = parseInt($('#classicTicksPerBeat').val(), 10);
            testPiece.metronomeSetting.classicTicksPerBeat = int;
        },
        "click .check#isLoop": function () {
            testPiece.metronomeSetting.toggleIsLoop();
        },
        "click .check#isUseEntirePiece": function () {
            testPiece.metronomeSetting.toggleIsUseEntirePiece();
        },
        "change #beginBeatIndex": function () {
            var int = parseInt($('#beginBeatIndex').val(), 10);
            testPiece.metronomeSetting.beginBeatIndex = IndexAdaptor.shiftDown(int);
        },
        "change #beginMeasureIndex": function () {
            var int = parseInt($('#beginMeasureIndex').val(), 10);
            testPiece.metronomeSetting.beginMeasureIndex = IndexAdaptor.shiftDown(int);
        },
        "change #endBeatIndex": function () {
            var int = parseInt($('#endBeatIndex').val(), 10);
            testPiece.metronomeSetting.endBeatIndex = IndexAdaptor.shiftDown(int);
        },
        "change #endMeasureIndex": function () {
            var int = parseInt($('#endMeasureIndex').val(), 10);
            testPiece.metronomeSetting.endMeasureIndex = IndexAdaptor.shiftDown(int);
        }
    });
}
