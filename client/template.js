if (Meteor.isClient) {
    var testPiece = LibraryPieceSpec_Test.factoryPiece;

    Template.test.helpers({
        pieceName: function(){
            return testPiece.name;
        }
    });
    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            testPiece.startMetronome();
        },
        "click #stop": function() {
            testPiece.metronome.stop();
        }
    });

    Template.status.helpers({
        isMetronomeOn: function() {
            return testPiece.metronomeState.isMetronomeOn.toString();
        },
        currentBeat: function() {
            beat = testPiece.metronomeState.currentBeat;
            return beat ? beat.displayString : "---";
        }
    });
}

