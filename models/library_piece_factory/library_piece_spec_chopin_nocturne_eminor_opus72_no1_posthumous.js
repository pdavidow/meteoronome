LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_ChopinNocturneEminorOpus72No1Posthumous, {
    "myName": {get: function () {
        return "Nocturne in E Minor";
    }},
    "composer": {get: function () {
        return "Chopin";
    }},
    "catalogReference": {get: function () {
        return "Op. 72, No. 1";
    }},
    "measures": {get: function () {
        var measure, measures = [];

        measure = new Measure(); // 1
        measure.addBeats([
            new Beat(1,3),
            new Beat(1,3),
            new Beat(1,3),
            new Beat(1,3)
        ]);
        measures.push(measure);

        measure = new Measure(); // 2
        measure.addBeats([
            new Beat(1,3),
            new Beat(1,3),
            new Beat(1,3),
            new Beat(2,3)
        ]);
        measures.push(measure);

        measure = new Measure();  // 3
        measure.addBeats([
            new Beat(1,3),
            new Beat(1,3),
            new Beat(1,3),
            new Beat(4,3)
        ]);
        measures.push(measure);

        measure = new Measure(); // 4
        measure.addBeats([
            new Beat(1,3),
            new Beat(2,3),
            new Beat(2,3),
            new Beat(2,3)
        ]);
        measures.push(measure);

                                // 5 .. 57

        return measures;
    }}
});