LibraryPieceSpec_Test = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_Test, {
    "myName": {get: function () {
        return "Test";
    }},
    "composer": {get: function () {
        return "PJD";
    }},
    "measures": {get: function () {
        var measure, measures = [];

        measure = new Measure();
        measure.addBeats([
            new Beat(2,3),
            new Beat(4,3),
            new Beat(2,3)
        ]);
        measures.push(measure);

        measure = new Measure();
        measure.addBeats([
            new Beat(4,3),
            new Beat(7,3)
        ]);
        measures.push(measure);

        return measures;
    }}
});