if (Meteor.isClient) {
    Template.metronome.pieces = function() {
        Collections.Pieces.find({ownerId: Meteor.userId()});
    };
    Template.library_import.libraryPieces = function() {
        Collections.Library.pieces;
    };
    Template.library_piece.thisPiece = function() {
        this._id;
    };

    Template.library_import.events({
        "click .import": function() {},
        "change .library-piece": function() {}
    });

    Template.beat.events({
        "submit .beat": function(event) {
            event.preventDefault();
            var rh = $(event.target).find('[name=rh]').val();
            var lh = $(event.target).find('[name=lh]').val();
            console.log("rh", _.isString(rh), _.isNumber(rh)); // ??????????????????? bug
        }
    });

    Template.test.events({
        "submit .test": function(event) {
            event.preventDefault();
            var piece = LibraryPieceSpec_SplashScreen.factoryPiece;
            console.log("factoryPiece", piece);
            piece.startMetronome();
        }
    });

    Template.metronome.events({
        "submit .new-piece": function(event) {
            event.preventDefault();
            var name = $(event.target).find('[name=name]').val();
            var composer = $(event.target).find('[name=composer]').val();
            var catalogReference = $(event.target).find('[name=catalogReference]').val();
            var piece = new Piece(name, composer, catalogReference, null, Meteor.userId());
            Meteor.call('pieceInsert', piece, function(error, result) {
                if (error) return alert(error.reason);
                if (result.isRedundant) return alert('Piece already in use');
            });
        }
    });

    Template.piece.events({
        "click .delete": function () {
            Meteor.call('pieceRemove', this._id, function (error, result) {
            });
        }
    });
}

