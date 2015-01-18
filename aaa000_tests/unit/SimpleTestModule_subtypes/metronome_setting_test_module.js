MetronomeSettingTestModule = Object.create(AbstractSimpleTestModule);

_.extend(MetronomeSettingTestModule, {
    test_0: function () {
        var p1 = new LibraryPiece('n1', 'c1');

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {isValid = false}
        console.log("ASSERT: a", isValid);
    },
    test_1a: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 0;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {isValid = false}
        console.log("ASSERT: a", isValid);
    },
    test_1b: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 0;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting begin-beat-index must not exceed number of beats in begin-measure");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_1c: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting begin-beat-index must not exceed number of beats in begin-measure");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_1d: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting begin-measure-index must not exceed number of measures for piece");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_1e: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting begin-measure-index must not exceed number of measures for piece");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_1f: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting end-beat-index must not exceed number of beats in end-measure");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_1g: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 0;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Metronome-Setting end-measure-index must not exceed number of measures for piece");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_2a: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3),
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(11, 3),
            new Beat(11, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 0;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Begin-beat-index must be <= end-beat-index in same measure");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_2b: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3),
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(11, 3),
            new Beat(11, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var isValid = true;
        try {p1.metronome.validate()}
        catch (e) {
            isValid = false;
            console.log("ASSERT: a", e.constructor == MetronomeSetting_Exception);
            console.log("ASSERT: b", e.displayMessage == "Begin-measure-index must be <= to end-measure-index");
        }
        console.log("ASSERT: c", !isValid);
    },
    test_3a: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3),
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(11, 3),
            new Beat(11, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        p1.metronome.ticks.pop();
        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 24+24+33+33 == ticks.length);
    },
    test_3b: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8, 3),
            new Beat(8, 3)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(11, 3),
            new Beat(11, 3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;

        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        p1.metronome.ticks.pop();
        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 24+24+33+33 == ticks.length);
    }
});



