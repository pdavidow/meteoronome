LibraryPieceSpec_Sample1 = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_Sample1, {
    "myName": {get: function () {
        return "Sample1";
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

_.extend(LibraryPieceSpec_Sample1, {
    applyMetronomeSetting: function(setting) {
        check(setting, MetronomeSetting);
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isLoop = false;
        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 1;
    }
});