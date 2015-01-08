MetronomeTestModule = Object.create(AbstractSimpleTestModule);

_.extend(MetronomeTestModule, {
    test_0: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1;
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        _.range(1, 241).forEach(function(each) {
            m1 = new Measure();
            m1.addBeats([new Beat(1,1)]);
            p1.addMeasures([m1]);
        });

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        console.log("ASSERT: a", 240+1 == p1.metronome.ticks.length);
    },
    test_1: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8,3),
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        console.log("ASSERT: a", 24 == p1.measures[0].beats[0].tickAmount);
        console.log("ASSERT: b", 33 == p1.measures[0].beats[1].tickAmount);
    },
    test_2: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(1,3),
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 3;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks0 = p1.metronome.beats[0].ticks;
        var ticks1 = p1.metronome.beats[1].ticks;

        console.log("ASSERT: a", 3 == ticks0.length);
        console.log("ASSERT: b", 24 == ticks1.length);
        ticks0.forEach(function(each) {
            console.log("ASSERT: c", 1 == each.waitSeconds);
        });
        ticks1.forEach(function(each) {
            console.log("ASSERT: d", 3/24 == each.waitSeconds);
        });

        var ticks0Time = ticks0.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        var ticks1Time = ticks1.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: e", ticks0Time == ticks1Time);
    },
    test_3: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 24 == ticks.length);
        console.log("ASSERT: a2", 24+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test_4: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 33 == ticks.length);
        console.log("ASSERT: a2", 33+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test_5: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 10;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 33 == ticks.length);
        console.log("ASSERT: a2", 33+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 6.0);
    },
    test_6: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(4,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 120;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 12 == ticks.length);
        console.log("ASSERT: a2", 12+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 0.5);
    },
    test_7: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(5,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 120;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 15 == ticks.length);
        console.log("ASSERT: a2", 15+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 0.5);
    },
    test_8: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 10;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 45+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test_9: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3),
            new Beat(4,3),
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 81+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test_10: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3),
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(8,3),
            new Beat(10,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 99+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test_11: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(1,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 3+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test_12: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 12+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 3.0);
    },
    test_13: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4),
            new Beat(7,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 40+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 6.0);
    },
    test_14a: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4),
            new Beat(7,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 40+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 6.0);
    },
    test_14b: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4),
            new Beat(7,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 28+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 3.0);
    },
    test_15a: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3, 4),
            new Beat(7, 4),
            new Beat(3, 4),
            new Beat(7, 4)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(3, 4),
            new Beat(7, 4),
            new Beat(3, 4),
            new Beat(7, 4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 3;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 160+1 == ticks.length);
    },
    test_15b: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3, 4),
            new Beat(7, 4),
            new Beat(3, 4),
            new Beat(7, 4)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(3, 4),
            new Beat(7, 4),
            new Beat(3, 4),
            new Beat(7, 4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 1;
        setting.beginBeatIndex = 1;
        setting.endMeasureIndex = 1;
        setting.endBeatIndex = 3;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 68+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 9.0);
    },
    test_16: function () {
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(1, 1),
            new Beat(1, 1)
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(1, 1),
            new Beat(1, 1)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;

        setting.isUseEntirePiece = false;
        setting.beginMeasureIndex = 0;
        setting.beginBeatIndex = 0;
        setting.endMeasureIndex = 0;
        setting.endBeatIndex = 0;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1', 'c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        p1.metronome.ticks.pop();
        var ticks = p1.metronome.ticks;
        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: a", Math.round(ticksTime*100)/100 == 1.0);
        console.log("ASSERT: b", _.first(ticks).beat.measure == p1.measures[0]);
        console.log("ASSERT: c", _.first(ticks).beat == p1.measures[0].beats[0]);
        console.log("ASSERT: d", _.last(ticks).beat.measure == p1.measures[0]);
        console.log("ASSERT: e", _.last(ticks).beat == p1.measures[0].beats[0]);
    }
});
