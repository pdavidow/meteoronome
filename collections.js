/*
LibraryPieceCollection = new Meteor.Collection("LibraryPieceCollection", {
    transform: function(doc) {return LibraryPiece.fromJSONValue(doc)}});

PieceCollection = new Meteor.Collection("PieceCollection", {
    transform: function(doc) {return Piece.fromJSONValue(doc)}});
    */

LibraryPieceHolders = new Meteor.Collection("LibraryPieceHolders");
PieceHolders = new Meteor.Collection("PieceHolders");
