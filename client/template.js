if (Meteor.isClient) {
    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            Session.get("piece").startMetronome();
        }
    });

    Template.status.helpers({
        isMetronomeOn: function() {
            return Session.get("piece").metronomeState.isMetronomeOn.toString();
        },
        currentBeat: function() {
            beat = Session.get("piece").metronomeState.currentBeat;
            return beat ? beat.displayString : "---";
        }
    });
}

