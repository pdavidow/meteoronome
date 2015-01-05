if (Meteor.isClient) {
    var testPiece = LibraryPieceSpec_Test.factoryPiece;
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
            return testPiece.metronomeSetting.beginBeatIndex;
        },
        endBeatIndex: function() {
            return testPiece.metronomeSetting.endBeatIndex;
        },
        beginMeasureIndex: function() {
            return testPiece.metronomeSetting.beginMeasureIndex;
        },
        endMeasureIndex: function() {
            return testPiece.metronomeSetting.endMeasureIndex;
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
        }
    });
}
