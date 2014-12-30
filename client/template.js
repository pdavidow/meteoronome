var notApplicableString = "---";

if (Meteor.isClient) {
    Template.test.helpers({
        pieceName: function(){
            var piece = Session.get("piece");
            return piece ? piece.name : notApplicableString;
        }
    });
    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            var piece = Session.get("piece");
            if (piece) {piece.startMetronome()};
        }
    });

    Template.status.helpers({
        isMetronomeOn: function() {
            var piece = Session.get("piece");
            return piece ? piece.metronomeState.isMetronomeOn.toString() : notApplicableString;
        },
        currentBeat: function() {
            var piece = Session.get("piece");
            if (!piece) {return notApplicableString};
            beat = piece.metronomeState.currentBeat;
            return beat ? beat.displayString : notApplicableString;
        }
    });
}

