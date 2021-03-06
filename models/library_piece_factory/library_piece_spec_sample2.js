LibraryPieceSpec_Sample2 = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_Sample2, {
    "myName": {get: function () {
        return "Sample2";
    }},
    "composer": {get: function () {
        return "PJD";
    }},
    "measures": {get: function () {
        var measure, measures = [];

        measure = new Measure();
        measure.addBeats([
            new Beat(9,3),
            new Beat(11,3)
        ]);
        measures.push(measure);

        return measures;
    }}
});

_.extend(LibraryPieceSpec_Sample2, {
    applyMetronomeSetting: function(setting) {
        check(setting, MetronomeSetting);
        setting.classicTicksPerMinute = 120;
        setting.classicTicksPerBeat = 1;
        setting.isLoop = true;
    }
});