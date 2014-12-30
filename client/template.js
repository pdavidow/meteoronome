if (Meteor.isClient) {
    var testPiece = LibraryPieceSpec_Test.factoryPiece;

    Template.test.helpers({
        pieceName: function(){
            return testPiece.name;
        },
        isMetronomeStopped: function() {
            return testPiece.metronomeState.isStopped;
        }
    });
    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            testPiece.startMetronome();
        },
        "click #stop": function() {
            testPiece.stopMetronome();
        }
    });

    Template.status.helpers({
        currentBeat: function() {
            beat = testPiece.metronomeState.currentBeat;
            return beat ? beat.displayString : "---";
        }
    });
}

