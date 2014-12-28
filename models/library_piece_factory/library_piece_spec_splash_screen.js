LibraryPieceSpec_SplashScreen = Object.create(LibraryPieceFactorySpec);

Object.defineProperties(LibraryPieceSpec_SplashScreen, {
    "myName": {get: function () {
        return "Splash Screen";
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
            new Beat(7,3)
        ]);
        measures.push(measure);

        return measures;
    }}
});