if (Meteor.isClient) {
    var testPiece = LibraryPieceSpec_Test.factoryPiece;

    Template.test.helpers({
        pieceName: function(){
            return testPiece.name;
        },
        isMetronomeStarted: function() {
            return testPiece.metronomeState.isStarted;
        },
        isMetronomeStopped: function() {
            return testPiece.metronomeState.isStopped;
        },
        currentBeat: function() {
            testPiece.metronome.currentBeatDep.depend();
            return testPiece.metronome.currentBeat.displayLocationDescription;
        },
        isLoop: function() {
            return testPiece.metronomeSetting.isLoop;
        },
        loopCount: function() {
            var count = testPiece.metronomeState.loopCount;
            return count == 0 ? "---" : count.toString();
        }
    });

    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            testPiece.startMetronome();
        },
        "click .check#isLoop": function () {
            testPiece.metronomeSetting.toggleIsLoop();
        },
        "click #stop": function() {
            testPiece.stopMetronome();
        }
    });
}
