LibraryPieceSpec_Sample = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_Sample, {
    "myName": {get: function () {
        return "Sample";
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

_.extend(LibraryPieceSpec_Sample, {
    applyMetronomeSetting: function(setting) {
        check(setting, MetronomeSetting);
        setting.classicTicksPerMinute = 30;
        setting.classicTicksPerBeat = 1;
        setting.isLoop = false;
    }
});